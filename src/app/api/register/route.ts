// src/app/api/auth/register/route.ts

import mysql from 'mysql2/promise';
import { GetDBSettings } from '../../../sharedCode/common';
import bcrypt from 'bcrypt';

// Get the MySQL connection parameters
const connectionParams = GetDBSettings();

export async function POST(req: Request) {
  const { name, email, password, dob } = await req.json();

  if (!name || !email || !password || !dob) {
    return new Response(
      JSON.stringify({ message: 'All fields are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Establish a connection to the database
    const connection = await mysql.createConnection(connectionParams);

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Call the stored procedure to register the user
    const query = `
      CALL register_user(?, ?, ?, ?)
    `;
    
    await connection.query(query, [name, email, hashedPassword, dob]);

    // Close the database connection
    await connection.end();

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    if ((error as { code: string }).code === '45000') {
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
