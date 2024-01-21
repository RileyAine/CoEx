'use client';
import ComingSoon from '../components/coming-soon';
import { useToast } from '@/components/ui/use-toast';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';

export default function Home({ searchParams }: { searchParams: any }) {
	const { toast } = useToast();
	let method: any = null;
	if (searchParams.method) {
		method = searchParams.method;
	}

	function displayToast(title: string, message: string) {
		toast({
			title: title,
			description: message,
		});
	}

	useEffect(() => {
		if (method && method === 'signOut') {
			displayToast('Logged Out!', 'You have been successfully logged out!');
		}
	}, []);

	return (
		<main className="grid justify-center gap-8">
			<ComingSoon />
			<Toaster></Toaster>
		</main>
	);
}
