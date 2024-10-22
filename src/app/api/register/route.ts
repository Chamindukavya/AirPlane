// src/app/api/auth/register/route.ts

import mysql from 'mysql2/promise';
import { GetDBSettings } from '../../../sharedCode/common';
import bcrypt from 'bcrypt';
import { RowDataPacket } from 'mysql2';

// Get the MySQL connection parameters
const connectionParams = GetDBSettings();

export async function POST(req: Request) {
  const { name, email, password,date_of_birth } = await req.json();

  if (!name || !email || !password) {
    return new Response(
      JSON.stringify({ message: 'All fields are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    // Establish a connection to the database
    const connection = await mysql.createConnection(connectionParams);

    // Check if the user already exists
    const [rows] = await connection.query<RowDataPacket[]>(
      'SELECT email FROM user WHERE email = ?',
      [email]
    );
    if (rows.length > 0) {
      await connection.end();
      return new Response(
        JSON.stringify({ message: 'User already exists' }),
        { status: 409, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const query = `
      INSERT INTO user (user_name, email, password,date_of_birth)
      VALUES (?, ?, ?,?)
    `;
    await connection.query(query, [name, email, hashedPassword,date_of_birth]);

    // Close the database connection
    await connection.end();

    return new Response(
      JSON.stringify({ message: 'User registered successfully' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: 'Server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
