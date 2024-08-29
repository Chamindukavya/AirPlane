import { NextResponse, NextRequest } from 'next/server'
import mysql from 'mysql2/promise'
import { GetDBSettings, IDBSettings } from '@/sharedCode/common'

let connectionParams = GetDBSettings()


export async function GET(request: Request) {
  try {
    
    const connection = await mysql.createConnection(connectionParams)
    let get_exp_query = ''

<<<<<<< HEAD
    get_exp_query = 'SELECT * FROM airlineproject.std_profile'

    // we can use this array to pass parameters to the SQL query

=======
    get_exp_query = 'SELECT * FROM students.std_profile'
>>>>>>> 9375445eccc2cc5116cfe5d0949bfec2be8a552c
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
