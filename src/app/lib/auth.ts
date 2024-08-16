import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { GetDBSettings } from '@/sharedCode/common';
import bcrypt from 'bcrypt';
const dbSettings = GetDBSettings();

interface User {
  user_id: string; // Match the user_id column name from your table
  user_name: string;
  email: string;
  password: string;
 
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
            // Query the user with the provided email
          const [rows] = await connection.execute<RowDataPacket[]>(
            'SELECT user_id, user_name, email, password FROM user WHERE email = ?',
            [credentials?.email]
          );

          // Cast rows to User[] type
          const users = rows as User[];
          const user = users[0];

          if (user && credentials?.password && await bcrypt.compare(credentials.password, user.password)) {
            // Return user object with id and email
           
            return { id: user.user_id, email: user.email, name: user.user_name};
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
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;

      }
      return session;
    },
  },
};