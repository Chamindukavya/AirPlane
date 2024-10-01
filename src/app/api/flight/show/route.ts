// File: /app/api/flightschedule/route.ts
import { NextResponse, NextRequest } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';
import { getServerSession } from "next-auth";
import { authOptions } from '@/app/lib/auth';


let connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  try {
    const connection = await mysql.createConnection(connectionParams);

    const select_query = `
      select * from flight inner join flightschedule using(flightSchedule_id);

    `;

    const [rows] = await connection.execute<any[]>(select_query);

   
    console.log("passenger state:", session?.user?.passenger_state);  
    if (session?.user?.passenger_state === 'frequent') {
      (rows as any[]).forEach((row: any) => {
      
        row.price_economy = row.price_economy - row.price_economy * 0.09;
        console.log('price_economy:', row.price_economy);
        
      });
    }
    if (session?.user?.passenger_state === 'golden') {
      (rows as any[]).forEach((row: any) => {
      
        row.price_economy = row.price_economy - row.price_economy * 0.12;
        console.log('price_economy:', row.price_economy);
        
      });
    }
    

   

    connection.end();
    

    return NextResponse.json(rows);
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message);

    const response = {
      error: (err as Error).message,
      returnedStatus: 500,
    };

    return NextResponse.json(response, { status: 500 });
  }
}
