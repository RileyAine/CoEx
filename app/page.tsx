import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Parisienne, The_Girl_Next_Door } from 'next/font/google';

const parisienne = Parisienne({
	subsets: ['latin'],
	weight: '400',
});
const theGirlNextDoor = The_Girl_Next_Door({
	subsets: ['latin'],
	weight: '400',
});

export default function Home() {
	return (
		<main className="grid justify-center p-10">
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
						cooperative existence
					</Label>
				</CardContent>
				<CardFooter className="grid justify-items-end">
					<Label>...Coming Soon</Label>
				</CardFooter>
			</Card>
		</main>
	);
}
