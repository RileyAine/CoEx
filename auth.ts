import type {
	GetServerSidePropsContext,
	NextApiRequest,
	NextApiResponse,
} from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import { hashPassword, verifyPassword } from './lib/bcrypt';
import Credentials from 'next-auth/providers/credentials';
import { encode, decode } from 'next-auth/jwt';

interface User extends Record<never, string> {
	id: string;
	email: string;
	password: string;
	type: string;
	firstName: string;
	lastName: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		Credentials({
			credentials: {},
			async authorize(credentials) {
				const api_users: string = process.env.API_USERS ?? '';
				const { email, password, type } = credentials as User;
				let result = null;
				if (type === 'login') {
					result = await fetch(api_users + '/' + email, {
						method: 'GET',
						headers: { 'Content-Type': 'application/json' },
					});
				} else {
					const hashedPassword = await hashPassword(password);
					const { firstName, lastName } = credentials as User;
					const userBody = {
						email: email,
						firstName: firstName,
						lastName: lastName,
						password: hashedPassword,
					};
					result = await fetch(api_users, {
						method: 'POST',
						body: JSON.stringify(userBody),
						headers: { 'Content-Type': 'application/json' },
					});
				}
				const user: User = await result?.json();
				// Return null if user data could not be retrieved
				if (result?.status === 400 || !user) {
					throw Error('User data not found!');
				}
				// If password entered does not equal hashed password, return null
				const isPasswordValid = await verifyPassword(password, user.password);
				if (!isPasswordValid) {
					throw Error('Password does not match!');
				}
				// If no error and we have user data, return every property except password
				const { password: omittedPassword, ...userReturned } = { ...user };
				return userReturned;
			},
		}),
	],
	pages: {
		signIn: '/login',
	},
	session: {
		strategy: 'jwt',
		maxAge: 3600,
	},
	jwt: { encode, decode },
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token = JSON.parse(JSON.stringify(user));
			}
			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user = token;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
	...args:
		| [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
		| [NextApiRequest, NextApiResponse]
		| []
) {
	return getServerSession(...args, authOptions);
}
