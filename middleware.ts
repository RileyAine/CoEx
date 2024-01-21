// This file makes next-auth protect all routes that are
// specified in the config
export { default } from 'next-auth/middleware';

export const config = { matcher: ['/dashboard'] };
