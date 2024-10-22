import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  try {
    const { flight_id, user_id, no_tickets, passengerDetails } = await request.json();
    const connection = await mysql.createConnection(connectionParams);

    // Start a transaction
    await connection.beginTransaction();
    const [result]: any = await connection.execute(
      `
      INSERT INTO booking (flight_id, user_id, no_tickets)
      VALUES (?, ?, ?)
      `,
      [flight_id, user_id, no_tickets]
    );

    // Fetch the booking_id of the newly added booking
    const booking_id = result.insertId;
    console.log('booking_id: ', booking_id);

    // Insert passenger details
    const insert_query_passenger = `
      INSERT INTO passenger (booking_id, date_of_birth, age, name, seat_id, passport_num)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const insert_query_ticket = `
      INSERT INTO ticket (passenger_id, class, flight_id)
      VALUES (?, ?, ?)
    `;

    for (const passenger of passengerDetails) {
      const [result2]: any = await connection.execute(insert_query_passenger, [
        booking_id,
        passenger.dob,
        passenger.age,
        passenger.name,
        passenger.seatId,
        passenger.passportNum,
      ]);
      const passenger_id = result2.insertId;
      await connection.execute(insert_query_ticket, [passenger_id, 'Economy', flight_id]);
    }
    
    // Commit the transaction
    await connection.commit();

    connection.end();

    return NextResponse.json({ message: 'Data added successfully', booking_id });
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
