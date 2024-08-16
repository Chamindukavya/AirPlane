import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number; // Ensure id is a number
      email: string;
      name?: string | null;
      image?: string | null;
     
    } & DefaultSession['user'];
  }

  interface Token {
    id: number; // Ensure id is a number
    email: string;
  
  }
}