import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';
import { LanguageSelect } from './client';

export default function Header() {
	return (
		<header className='border-b'>
			<div className='mx-5 h-16 flex items-center justify-between'>
				<nav className='flex items-center justify-center gap-3'>
					<LanguageSelect />
				</nav>
				<div className='flex items-center justify-center gap-3'>
					<ThemeToggle />
					<Button asChild>
						<Link href={'/'}>G</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
