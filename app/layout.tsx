import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'CoEx',
	description: 'Communities sharing and cooperating together!',
	authors: { name: 'Riley;>' },
	keywords: ['Community', 'Sharing', 'Farming', 'Collaborate', 'Together'],
	icons: '/icon/ce_icon.png',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={cn(
					inter.className,
					'h-screen w-screen place-content-center dark'
				)}>
				{children}
			</body>
		</html>
	);
}
