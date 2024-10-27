import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "@/sharedCode/common";
let connectionParams = GetDBSettings();
interface passengers {
  passenger_count: number;
  year: string;
  month: string;
}

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    // Fetch passengers under and over 18 years old
    const [passengers]: any[] = await connection.execute(
      `SELECT 
    MONTHNAME(flightschedule.date) AS month, 
    COUNT(passenger.passenger_id) AS desktop, 
    YEAR(flightschedule.date) AS mobile
FROM 
    flight 
    JOIN bookings USING(flight_id) 
    JOIN flightschedule USING(flightSchedule_id) 
    JOIN passenger USING(booking_id)
GROUP BY mobile, month
HAVING mobile = YEAR(CURDATE())
ORDER BY MIN(flightschedule.date);
`
    );

    console.log(passengers);
    console.log(passengers[0].mobile);
    return NextResponse.json({
      year: passengers[0].mobile,
      passenger: passengers,
    });
  } catch (err) {
    console.log("ERROR: API - ", (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
