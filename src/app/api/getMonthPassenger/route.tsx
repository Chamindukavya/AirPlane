import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import { GetDBSettings } from "@/sharedCode/common";

let connectionParams = GetDBSettings();

interface PassengerCount {
  month: string;
  passenger_count: number;
  year: string;
}

export async function GET(request: NextRequest) {
  try {
    const connection = await mysql.createConnection(connectionParams);

    // Call the stored procedure to fetch passenger counts
    const [passengerCounts]: any[] = await connection.execute(
      'CALL GetPassengerCountsByYear()'
    );

    console.log(passengerCounts);
    
    // If passengerCounts is not empty, extract the year from the first record
    const year = passengerCounts.length > 0 ? passengerCounts[0].year : null;

    return NextResponse.json({
      year: year,
      passenger: passengerCounts,
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
