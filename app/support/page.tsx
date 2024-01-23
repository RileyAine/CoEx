'use client';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { supportFormSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Support({ searchParams }: { searchParams: any }) {
	const router = useRouter();
	const { toast } = useToast();
	let name: string | null = null;
	if (searchParams.firstName && searchParams.lastName) {
		name = searchParams.firstName + ' ' + searchParams.lastName;
	}
	const form = useForm<z.infer<typeof supportFormSchema>>({
		resolver: zodResolver(supportFormSchema),
		defaultValues: {
			name: name ?? '',
			email: searchParams.email ?? '',
			message: '',
		},
	});
	function onSubmit(values: z.infer<typeof supportFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			// Send email!
			fetch('/api/contact', {
				method: 'POST',
				headers: {
					Accept: 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(values),
			})
				.then((onfullfilled) => {
					if (onfullfilled.ok) {
						router.push('/?method=messageSent');
					}
				})
				.catch((onrejected) => {
					toast({
						title: 'Oops!',
						description: onrejected.message,
						variant: 'destructive',
					});
				});
		} catch (error: any) {
			toast({
				title: 'Something went wrong!',
				description: error.message,
				variant: 'destructive',
			});
		}
		form.reset();
	}

	return (
		<main className="grid px-2 py-6 text-orange-100 justify-items-center ">
			<div className="grid gap-4 w-full md:w-5/6 lg:w-4/6 xl:w-3/6 2xl:w-2/6">
				<Label className="text-2xl justify-self-center">
					Question or Comment?
				</Label>
				<Label className="justify-self-center">
					Send a message to the support team!
				</Label>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem className="grid gap-0">
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											className="border-yellow-800"
											placeholder="Your name"
											type="text"
											id="name"
											required
											autoFocus={name ? false : true}
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}></FormField>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="grid gap-0">
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="border-yellow-800"
											placeholder="Your email goes here."
											type="email"
											id="email"
											required
											{...field}
										/>
									</FormControl>
								</FormItem>
							)}></FormField>
						<FormField
							control={form.control}
							name="message"
							render={({ field }) => (
								<FormItem className="grid gap-0">
									<FormLabel>Your Message</FormLabel>
									<FormControl>
										<Textarea
											className="border-yellow-800"
											placeholder="Type your message here."
											id="message"
											required
											autoFocus={name ? true : false}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Your message will be sent to the support team.
									</FormDescription>
								</FormItem>
							)}></FormField>

						<section className="justify-self-center">
							<Button
								className="bg-yellow-800 mx-2"
								type="submit">
								{'Send Message'}
							</Button>
						</section>
					</form>
				</Form>
			</div>
		</main>
	);
}
