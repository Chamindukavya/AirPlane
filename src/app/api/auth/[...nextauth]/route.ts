import { authOptions } from '@/app/lib/auth';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}







/*import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import { GetDBSettings } from '../../../../sharedCode/common';

// Get the MySQL connection parameters
const connectionParams = GetDBSettings();

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        console.log('************', email, password);

        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        let connection;
        try {
          // Create a MySQL connection
          connection = await mysql.createConnection(connectionParams);

          // Find the user
          const [rows] = await connection.query(
            'SELECT * FROM students.user WHERE email = ?',
            [email]
          );

          // Check if user exists
          if (rows.length === 0) {
            throw new Error('No user found with the given email');
          }

          const user = rows[0];

          // Check the password
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new Error('Invalid password');
          }

          return { id: user.user_id, name: user.user_name, email: user.email };
        } catch (error) {
          console.error('Authorization error:', error);
          throw new Error('Authentication failed');
        } finally {
          if (connection) {
            await connection.end();
          }
        }
      }
    })
  ],
  pages: {
    signIn: '/Login' // Custom login page URL
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  },
};

export async function GET(req) {
  return NextAuth(req, authOptions);
}

export async function POST(req) {
  return NextAuth(req, authOptions);
}*/
