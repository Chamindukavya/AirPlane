import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    const { ticket_id } = await request.json(); // Get the ticket_id from the request body
  

    const connection = await mysql.createConnection(connectionParams);

    // Update the status of the ticket with the given ticket_id
    await connection.execute(
        'CALL UpdateTicketStatus(?)'
        , 
      [ticket_id]
    );

    await connection.end();

    return NextResponse.json({ message: 'Status updated successfully' });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}