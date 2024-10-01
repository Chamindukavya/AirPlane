import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

let connectionParams = GetDBSettings();

export async function POST(request: NextRequest) {
  let connection: mysql.Connection | null = null;

  try {
    const { flight_id, user_id, no_tickets, passengerDetails } = await request.json();


    // Establish a new connection using connection parameters
    connection = await mysql.createConnection(connectionParams);

    // Start a transaction
    await connection.beginTransaction();

    // Insert booking data
    const [result]: any = await connection.execute(
      `
      INSERT INTO students.bookings (flight_id, user_id, no_tickets)
      VALUES (?, ?, ?)
      `,
      [flight_id, user_id, no_tickets]
    );

    // Fetch the booking_id of the newly added booking
    const booking_id = result.insertId;
    console.log('booking_id: ', booking_id);

    // Insert passenger details
    const insert_query_passenger = `
      INSERT INTO students.passenger (booking_id, dob, age, name, seat_id, passport_num, class)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const insert_query_ticket = `
      INSERT INTO students.ticket (passenger_id, flight_id)
      VALUES (?, ?)
    `;

    for (const passenger of passengerDetails) {
      const [result2]: any = await connection.execute(insert_query_passenger, [
        booking_id,
        passenger.dob,
        passenger.age,
        passenger.name,
        passenger.seatId,
        passenger.passportNum,
        passenger.class1,
      ]);

      const passenger_id = result2.insertId;
      await connection.execute(insert_query_ticket, [passenger_id, flight_id]);
    }

    // Update no_bookings column in the user table
    await connection.execute(
      `
      UPDATE students.user
      SET no_bookings = no_bookings + ?
      WHERE user_id = ?
      `,
      [no_tickets, user_id]
    );


    const [result1]: any = await connection.execute(
      `
      select no_bookings from students.user where user_id = ?
      `,
      [user_id]
    );

    let bookings =  result1[0].no_bookings;

    if (bookings >= 5) {
      await connection.execute(
        `
        UPDATE students.user
        SET passenger_state = ?
        WHERE user_id = ?
        `,
        ["frequent", user_id]
      );
  
    } 
    if (bookings >= 10) {
      await connection.execute(
        `
        UPDATE students.user
        SET passenger_state = ?
        WHERE user_id = ?
        `,
        ["golden", user_id]
      );
  
    }

    // Commit the transaction
    await connection.commit();

    return NextResponse.json({ message: 'Data added successfully', booking_id });
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);

    // If an error occurs, roll back the transaction
    if (connection) {
      await connection.rollback();
    }

    return NextResponse.json(
      {
        error: (err as Error).message,
        returnedStatus: 500,
      },
      { status: 500 }
    );
  } finally {
    // Ensure the connection is closed
    if (connection) {
      await connection.end();
    }
  }
}
