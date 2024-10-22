import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GetDBSettings } from '@/sharedCode/common';
import bcrypt from 'bcrypt';

const dbSettings = GetDBSettings();

interface User {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
  is_admin: string;
  no_bookings: string;
  dob: Date;
  passenger_state: string;

}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/Login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const connection = await mysql.createConnection({
          host: dbSettings.host,
          user: dbSettings.user,
          password: dbSettings.password,
          database: dbSettings.database,
        });

        try {
          const [rows] = await connection.execute<RowDataPacket[]>(
            'SELECT user_id, user_name, email, password, date_of_birth, age,user_state, total_no_bookings, role_name  FROM user WHERE email = ?',
            [credentials?.email]
          );

          const users = rows as User[];
         

          const user = users[0];
          if (user && credentials?.password && await bcrypt.compare(credentials.password, user.password)) {
            console.log('User found:', user);
            return {
              id: user.user_id,
              email: user.email,
              name: user.user_name,
              is_admin: user.is_admin, // Include is_admin
              no_bookings: user.no_bookings,
              dob: user.dob,
              passenger_state: user.passenger_state
            };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error authorizing user:', error);
          return null;
        } finally {
          await connection.end();
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.is_admin = user.is_admin; // Store is_admin in the token
        token.no_bookings = user.no_bookings;
        token.dob = user.dob;
        token.passenger_state = user.passenger_state;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.is_admin = token.is_admin as string; // Pass is_admin to the session
        session.user.no_bookings = token.no_bookings as string;
        session.user.dob = token.dob as Date;
        session.user.passenger_state = token.passenger_state as string;
      }
      return session;
    },
  },
};
