import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    // Parse the request body to get the data
    const { std_id, std_name, std_dob, std_address } = await request.json();

    // Connect to the database
    const connection = await mysql.createConnection(connectionParams);

    // Create the SQL query to insert data
    const insert_query = `
      INSERT INTO airlineproject.std_profile (std_id, std_name, std_dob, std_address)
      VALUES (?, ?, ?, ?)
    `;

    // Execute the query with the data
    const [results] = await connection.execute(insert_query, [std_id, std_name, std_dob, std_address]);

    // Close the connection when done
    connection.end();

    // Return a success message
    return NextResponse.json({ message: 'Data added successfully', results });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
