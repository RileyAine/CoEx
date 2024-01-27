import { auth } from '@/auth';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { The_Girl_Next_Door } from 'next/font/google';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const theGirlNextDoor = The_Girl_Next_Door({
	subsets: ['latin'],
	weight: '400',
});

export default async function Dashboard() {
	const session = await auth();
	let user = null;
	if (session && session.user) {
		user = session.user as UserModel;
	}
	return (
		<main className="grid justify-items-center px-4 gap-8">
			{user && (
				<Card className="bg-yellow-950 border-yellow-800 text-2xl border-2 w-full md:w-5/6 lg:w-4/6 xl:w-3/6 2xl:w-2/6">
					<CardHeader>
						<CardTitle>
							<Label className="text-lg md:text-2xl">
								Hello {user.firstName}!
							</Label>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<Label className="text-base md:text-xl pl-3 pb-0">
							Thank you for visiting
						</Label>
						<Label
							className={cn(
								theGirlNextDoor.className,
								'text-lg md:text-2xl text-orange-400 justify-self-center pl-2 h-6'
							)}>
							{process.env.NEXT_PUBLIC_SITE_TITLE}
						</Label>
						<Label className="text-base md:text-lg">
							. The development team is hard at work on the features that will
							make this a stellar tool for you to help organize your community
							and make it a little more efficient!
						</Label>
						<br />
						<Label className="text-base md:text-lg pl-3">
							If you want, you can send us a question or comment from the
							support page right{' '}
							<Link
								href={{
									pathname: '/support',
									query: {
										email: user?.email,
										firstName: user?.firstName,
										lastName: user?.lastName,
									},
								}}>
								<Button
									variant={'link'}
									className="text-lg m-0 p-0">
									here
								</Button>
							</Link>
							!
						</Label>
					</CardContent>
					<CardFooter className="grid justify-items-end">
						<Label className="text-base md:text-xl pb-2">Thanks again!</Label>
						<Label className="text-base md:text-xl pt-2">Support:)</Label>
					</CardFooter>
					<Label className="grid text-xs md:text-sm justify-items-center py-2 justify-self-start">
						p.s. your data will be erased from the database.
					</Label>
				</Card>
			)}
		</main>
	);
}
