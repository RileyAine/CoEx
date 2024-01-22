import { Label } from './ui/label';

export default function Footer() {
	return (
		<main>
			<Label className="absolute bottom-5 text-sm pt-4">
				© 2024 {process.env.NEXT_PUBLIC_SITE_TITLE}. All rights reserved.
			</Label>
			<Label className="absolute bottom-0 right-0 text-xs pt-4">
				{process.env.NEXT_PUBLIC_APP_VERSION}
			</Label>
		</main>
	);
}
