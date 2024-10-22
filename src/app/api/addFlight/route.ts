// Next.js API route for scheduling a flight
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function POST(request : NextRequest) {
    try{
  const { Flight_ID, Flight_schedule_id, start_time, end_time, aircraft_id } = await  request.json();
  const connection = await mysql.createConnection(connectionParams);
  // Check if the airplane is already assigned to a flight at the same time
  const [results] : any[]= await connection.execute(
    'SELECT * FROM flight WHERE Flight_ID = ? AND aircraft_id = ?',
    [Flight_ID , aircraft_id]
  );
  console.log(results);
  if (results.length > 0) {
    return NextResponse.json({ message: 'Airplane is already scheduled for another flight at this time.' });
  }
  
  // Schedule the flight
  await connection.query(
    'INSERT INTO flight ( Flight_ID, Flight_schedule_id, start_time, end_time, aircraft_id) VALUES (?, ?, ?,?,?)',
    [ Flight_ID, Flight_schedule_id, start_time, end_time, aircraft_id]
  );
  
  connection.end();
  return NextResponse.json({ message: 'Flight scheduled successfully' });
}
catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
