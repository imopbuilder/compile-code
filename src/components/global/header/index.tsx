import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ThemeToggle } from '../theme-toggle';

export default function Header() {
	return (
		<header className='border-b'>
			<div className='mx-5 h-16 flex items-center justify-between'>
				<nav className='flex items-center justify-center sm:gap-4 gap-3'>
					{/* <EditorOptions /> */}
					<ThemeToggle />
				</nav>
				<div className='flex items-center justify-center'>
					<Button size='lg' asChild>
						<Link href={'/'}>Attandence app</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
