import { NextResponse, NextRequest } from 'next/server'
import mysql from 'mysql2/promise'
import { GetDBSettings, IDBSettings } from '@/sharedCode/common'

let connectionParams = GetDBSettings()


export async function GET(request: Request) {
  try {
    
    const connection = await mysql.createConnection(connectionParams)
    let get_exp_query = ''

    get_exp_query = 'SELECT * FROM std_profile'
    let values: any[] = []
    const [results] = await connection.execute(get_exp_query, values)
    connection.end()
    return NextResponse.json(results)
  } catch (err) {
    console.log('ERROR: API - ', (err as Error).message)

    const response = {
      error: (err as Error).message,

      returnedStatus: 200,
    }

    return NextResponse.json(response, { status: 200 })
  }
}
