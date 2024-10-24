import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function DELETE(request: NextRequest) {
  try {
    const { flight_id } = await request.json();
    console.log('flight_id', flight_id);
    const connection = await mysql.createConnection(connectionParams);

    await connection.execute(
      `
      DELETE FROM flight WHERE flight_id = ?;
      `,
      [flight_id]
    );
    connection.end();
    
    return NextResponse.json({ message: 'Data deleted successfully' });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
