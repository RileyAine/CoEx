'use client';
import ComingSoon from '../components/coming-soon';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function Home({ searchParams }: { searchParams: any }) {
	const { toast } = useToast();
	let method: any = null;
	let error: any = null;
	if (searchParams.method) {
		method = searchParams.method;
	}
	if (searchParams.error) {
		error = searchParams.error;
	}

	useEffect(() => {
		if (method) {
			if (method === 'signOut') {
				toast({
					title: 'Logged Out!',
					description: 'You have been successfully logged out!',
				});
			} else if (method === 'messageSent') {
				toast({
					title: 'Success!',
					description: 'Your message was sent successfully!',
				});
			}
		}
		if (error) {
			toast({
				title: 'Oops! Something went wrong!',
				description: 'Error: ' + error,
				variant: 'destructive',
			});
		}
	}, [error, method, toast]);

	return (
		<main className="grid justify-center gap-8">
			<ComingSoon />
			<Toaster></Toaster>
		</main>
	);
}
