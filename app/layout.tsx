import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ScrollArea } from '@/components/ui/scroll-area';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'CoEx',
	description: 'Communities sharing and cooperating together!',
	authors: { name: 'Riley;>Wilkes' },
	keywords: ['Community', 'Sharing', 'Farming', 'Collaborate', 'Together'],
	icons: '/icon/ce_icon.png',
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	// const session = await auth();
	//console.log(session);
	return (
		<html lang="en">
			<body className={cn(inter.className, ' grid dark')}>
				<main className="grid grid-rows-mobile-layout md:grid-rows-site-layout  overflow-hidden h-screen">
					<Header />
					<ScrollArea className="z-0 rounded overflow-auto">
						{children}
					</ScrollArea>
					<Footer />
				</main>
				<Toaster />
			</body>
		</html>
	);
}
