import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: number; // Ensure id is a number
      email: string;
      name?: string | null;
      image?: string | null;
      role_name: string; // Add is_admin field
      no_bookings: number;
      passenger_state: string;
    } & DefaultSession['user'];
  }

  interface Token {
    id: number; // Ensure id is a number
    role_name: string; // Add is_admin field
    email: string;
    no_bookings: number;
    passenger_state: string;
  }
}
