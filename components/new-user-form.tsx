'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { newUserSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { SignInResponse, signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

export default function NewUserForm() {
	const router = useRouter();
	const { toast } = useToast();
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const form = useForm<z.infer<typeof newUserSchema>>({
		resolver: zodResolver(newUserSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof newUserSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			signIn('credentials', {
				email: values.email,
				password: values.password,
				firstName: values.firstName,
				lastName: values.lastName,
				type: 'new-user',
				redirect: false,
			}).then((onfullfilled: SignInResponse | undefined) => {
				if (onfullfilled) {
					if (onfullfilled.ok) {
						router.push('/dashboard');
					} else {
						toast({
							title: 'Something went wrong!',
							description: onfullfilled.error,
							variant: 'destructive',
						});
					}
				}
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
		<Card className="bg-yellow-950 border-2 border-yellow-800">
			<CardHeader>
				<CardTitle className="grid justify-center">
					<Label>{'Sign Up!'}</Label>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4">
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem className="bg-yellow-950">
									<FormControl>
										<Input
											className="border-yellow-800"
											placeholder="First Name"
											type="text"
											id="firstName"
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}></FormField>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem className="bg-yellow-950">
									<FormControl>
										<Input
											className="border-yellow-800"
											placeholder="Last Name"
											type="text"
											id="lastName"
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}></FormField>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="bg-yellow-950">
									<FormControl>
										<Input
											className="border-yellow-800"
											placeholder="Email"
											type="email"
											id="email"
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}></FormField>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="grid bg-yellow-950">
									<FormControl>
										<Input
											className="border-yellow-800"
											placeholder="Password"
											type={isPasswordShown ? 'text' : 'password'}
											id="password"
											required
											{...field}
										/>
									</FormControl>
									{isPasswordShown ? (
										<EyeOpenIcon
											className="grid absolute justify-self-end mr-2 mt-4"
											height="20"
											width="20"
											onClick={() => {
												setIsPasswordShown(false);
											}}
										/>
									) : (
										<EyeNoneIcon
											className="grid absolute justify-self-end mr-2 mt-4"
											height="20"
											width="20"
											onClick={() => {
												setIsPasswordShown(true);
											}}
										/>
									)}
									<FormMessage />
								</FormItem>
							)}></FormField>
						<section className="justify-self-center">
							<Button
								className="bg-yellow-800 mx-2"
								type="submit">
								{'Create Account'}
							</Button>
						</section>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
