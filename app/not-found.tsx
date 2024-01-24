import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { The_Girl_Next_Door } from 'next/font/google';
import { Separator } from '@/components/ui/separator';

const theGirlNextDoor = The_Girl_Next_Door({
	subsets: ['latin'],
	weight: '400',
});
export default async function NotFound(searchParams: any) {
	let error = searchParams?.error ?? null;

	return (
		<main className="grid justify-items-center px-2 pt-6 mt-6 gap-8">
			<Separator />
			<Label
				className={cn(
					theGirlNextDoor.className,
					'grid justify-items-center text-orange-400 text-lg md:text-2xl'
				)}>
				Not Found
			</Label>
			<Label className="text-base md:text-lg">
				The requested resource could not be found!
			</Label>
			{error && (
				<Label className="text-base md:text-lg">
					Possibly helpful: {error}
				</Label>
			)}
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
