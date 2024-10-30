import { authOptions } from '@/app/lib/auth';
import NextAuth from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const authHandler = NextAuth(authOptions);
  return authHandler(req, res);
};

export { handler as GET, handler as POST };
