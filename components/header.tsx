'use client';
import { SessionProvider } from 'next-auth/react';
import UserMenu from './user-menu';
import { Label } from './ui/label';
import { cn } from '@/lib/utils';
import { The_Girl_Next_Door } from 'next/font/google';
import Link from 'next/link';

const theGirlNextDoor = The_Girl_Next_Door({
	subsets: ['latin'],
	weight: '400',
});

export default function Header() {
	return (
		<header className="grid grid-cols-4 py-2 mb-4 border-b-2 bg-background">
			<Label
				className={cn(
					theGirlNextDoor.className,
					'grid text-2xl text-orange-300 justify-self-start self-center px-2 pt-1 cursor-pointer col-span-3'
				)}>
				<Link href="/">{process.env.NEXT_PUBLIC_SITE_TITLE}</Link>
			</Label>
			<article className="grid justify-items-end">
				<SessionProvider>
					<UserMenu />
				</SessionProvider>
			</article>
		</header>
	);
}
