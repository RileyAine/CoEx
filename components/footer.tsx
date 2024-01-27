import { Label } from './ui/label';

export default function Footer() {
	return (
		<footer className="border-t-2">
			<Label className="grid text-sm pt-2 pl-2">
				© 2024 {process.env.NEXT_PUBLIC_SITE_TITLE}. All rights reserved.
			</Label>
			<Label className="grid justify-self-end justify-end text-xs">
				{process.env.NEXT_PUBLIC_APP_VERSION}
			</Label>
		</footer>
	);
}
