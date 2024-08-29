import { option } from '@/lib/auth';
import NextAuth from 'next-auth';
const handler = NextAuth(option);

export { handler as GET, handler as POST };