import { Label } from './ui/label';

export default function Footer() {
	return (
		<Label className="absolute bottom-5 text-sm pt-4">
			© 2024 {process.env.NEXT_PUBLIC_SITE_TITLE}. All rights reserved.
		</Label>
	);
}
