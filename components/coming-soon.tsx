import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Parisienne, The_Girl_Next_Door } from 'next/font/google';
import { Button } from './ui/button';
import Link from 'next/link';

const parisienne = Parisienne({
	subsets: ['latin'],
	weight: '400',
});
const theGirlNextDoor = The_Girl_Next_Door({
	subsets: ['latin'],
	weight: '400',
});

export default function ComingSoon() {
	return (
		<main className="grid">
			<Card className="bg-yellow-950 border-2 border-yellow-800">
				<CardHeader>
					<CardTitle>Welcome to...</CardTitle>
				</CardHeader>
				<CardContent className="grid">
					<Label
						className={cn(
							parisienne.className,
							'text-9xl text-orange-300 justify-self-center'
						)}>
						CoEx
					</Label>
					<Label
						className={cn(
							theGirlNextDoor.className,
							'text-3xl text-orange-400 justify-self-center'
						)}>
						{process.env.NEXT_PUBLIC_SITE_TITLE}
					</Label>
				</CardContent>
				<CardFooter className="grid justify-items-end">
					<Label>...Coming Soon</Label>
				</CardFooter>
			</Card>

			<Label className="justify-self-center text-sm">
				Want to send us a{' '}
				<Link href="/support">
					<Button
						variant={'link'}
						className="text-sm m-0 p-0">
						message
					</Button>
				</Link>
				?
			</Label>
		</main>
	);
}
