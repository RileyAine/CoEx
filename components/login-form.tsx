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
import { loginSchema } from '@/lib/form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Label } from '@radix-ui/react-label';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useToast } from './ui/use-toast';

export default function LoginForm() {
	const { toast } = useToast();
	const [isPasswordShown, setIsPasswordShown] = useState(false);

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof loginSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		try {
			signIn('credentials', {
				email: values.email,
				password: values.password,
				type: 'login',
				callbackUrl: '/dashboard',
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
					<Label>{'Log In'}</Label>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="grid gap-4">
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
								{'Log In'}
							</Button>
						</section>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
