// app/api/airports/route.ts
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '@/sharedCode/common';

const connectionParams = GetDBSettings();

export async function GET() {
  try {
    const connection = await mysql.createConnection(connectionParams);

    const [rows] = await connection.query('SELECT airport_code, airport_name FROM airports');

    await connection.end();

    return NextResponse.json(rows);
  } catch (err) {
    console.error('ERROR: API - ', (err as Error).message);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}