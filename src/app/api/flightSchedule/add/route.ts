import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    const { date, origin_airport, destination_airport, price_economy, price_business,price_platinum } = await request.json();
    const connection = await mysql.createConnection(connectionParams);

    const insert_query = `
      INSERT INTO admin_flightschedule_view (date, origin_airport, destination_airport, price_economy, price_business,price_platinum)
      VALUES (?, ?, ?, ?, ?,?)
    `;

    const [results] = await connection.execute(insert_query, [date, origin_airport, destination_airport, price_economy, price_business,price_platinum]);

    connection.end();
    
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
