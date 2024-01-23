'use client'; // Error components must be Client Components

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { The_Girl_Next_Door } from 'next/font/google';
import { useEffect } from 'react';

const theGirlNextDoor = The_Girl_Next_Door({
	subsets: ['latin'],
	weight: '400',
});
export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className="grid justify-items-center px-2 pt-6 mt-6 gap-8">
			<Separator />
			<Label
				className={cn(
					theGirlNextDoor.className,
					'grid justify-items-center text-orange-400 text-lg md:text-2xl'
				)}>
				Oh no!
			</Label>
			<Label className="text-base md:text-lg">
				Something bad happened. Try doing that again.
			</Label>
			<Label className="text-base md:text-lg pl-3 pb-0">
				Thank you for visiting
			</Label>
			<Label
				className={cn(
					theGirlNextDoor.className,
					'text-lg md:text-2xl text-orange-400 justify-self-center pl-2 h-6'
				)}>
				{process.env.NEXT_PUBLIC_SITE_TITLE}
			</Label>
			<Separator />
		</main>
	);
}
