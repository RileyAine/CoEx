'use client';

import LoginForm from '@/components/login-form';
import NewUserForm from '@/components/new-user-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

export default function LoginPage() {
	const componentSize = 'w-11/12 sm:w-4/6 md:w-3/6 lg:w-2/6  2xl:w-1/6';
	return (
		<main className="pt-8">
			<Tabs
				defaultValue="login"
				className="grid justify-items-center">
				<TabsList
					className={cn(
						componentSize,
						'bg-background border-t-2 border-x-2 border-yellow-800 h-11'
					)}>
					<TabsTrigger
						className="w-full h-full data-[state=active]:bg-yellow-950"
						value="login">
						Log In
					</TabsTrigger>
					<TabsTrigger
						className="w-full h-full data-[state=active]:bg-yellow-950"
						value="signup">
						Sign Up
					</TabsTrigger>
				</TabsList>
				<TabsContent
					value="login"
					className={cn(componentSize, 'py-0 my-0')}>
					<LoginForm />
				</TabsContent>
				<TabsContent
					value="signup"
					className={cn(componentSize, 'py-0 my-0')}>
					<NewUserForm />
				</TabsContent>
			</Tabs>
		</main>
	);
}
