import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    try {
      const connection = await mysql.createConnection(connectionParams);
 
      // Fetch the next immediate flight for the given flight_id
      const [airports] :any[] = await connection.execute( 
     `SELECT airport_code FROM airports`
      );
      console.log(airports);
      return NextResponse.json({
        airports: airports
      });
    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message);
    
        const response = {
          error: (err as Error).message,
          returnedStatus: 500,
        };
    
        return NextResponse.json(response, { status: 500 });
      }
  }
  

 