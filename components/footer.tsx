import Link from 'next/link';
import { Label } from './ui/label';
import { Button } from './ui/button';

export default function Footer() {
	return (
		<main>
			<Label className="absolute bottom-5 py-4 my-2 text-sm">
				© 2024 {process.env.NEXT_PUBLIC_SITE_TITLE}. All rights reserved.
			</Label>
		</main>
	);
}
