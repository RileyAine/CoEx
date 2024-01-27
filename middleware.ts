// This file makes next-auth protect all routes that are
// specified in the config
export { default } from 'next-auth/middleware';
import { withAuth } from 'next-auth/middleware';
// to add ALL dashboard paths:
// matcher: "/dashboard/:path*"
export const config = { matcher: ['/dashboard'] };
/* export default withAuth({
	// Matches the pages config in `[...nextauth]`
	pages: {
		signIn: '/login',
		error: '/', // Error code passed in query string as ?error=
	},
	secret: process.env.NEXTAUTH_SECRET,
});
 */
