import Link from 'next/link';
import { Button } from './ui/button';
import {
	DesktopIcon,
	EnvelopeOpenIcon,
	ExitIcon,
	HamburgerMenuIcon,
	PersonIcon,
} from '@radix-ui/react-icons';
import { signOut, useSession } from 'next-auth/react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from './ui/use-toast';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip';

export default function UserMenu() {
	const { toast } = useToast();
	const { status, data } = useSession();
	const user = data?.user as UserModel;

	function handleLogout() {
		signOut({ callbackUrl: '/?method=signOut' });
	}

	if (status === 'authenticated') {
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						className="bg-yellow-900 mx-2 px-2 border-yellow-800"
						type="button">
						<HamburgerMenuIcon
							width="20"
							height="20"
						/>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					className="bg-yellow-950 border-yellow-800">
					<DropdownMenuGroup>
						<Link href="/dashboard">
							<DropdownMenuItem>
								Dashboard
								<DropdownMenuShortcut>
									<DesktopIcon />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						</Link>
						<Link
							href={{
								pathname: '/support',
								query: {
									email: user?.email,
									firstName: user?.firstName,
									lastName: user?.lastName,
								},
							}}>
							<DropdownMenuItem>
								Support
								<DropdownMenuShortcut>
									<EnvelopeOpenIcon />
								</DropdownMenuShortcut>
							</DropdownMenuItem>
						</Link>
						<DropdownMenuItem onClick={() => handleLogout()}>
							Logout
							<DropdownMenuShortcut>
								<ExitIcon />
							</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
	} else {
		return (
			<Link
				href="/login"
				className="absolute right-2">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								className="bg-yellow-950 mx-2 px-2 border-2 border-yellow-800"
								type="button">
								<PersonIcon
									width="20"
									height="20"></PersonIcon>
							</Button>
						</TooltipTrigger>
						<TooltipContent className="bg-black">
							Login or create a user!
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</Link>
		);
	}
}
