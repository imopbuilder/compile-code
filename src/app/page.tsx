import Header from '@/components/global/header';
import { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main className='flex min-h-screen flex-col items-center justify-between p-24'>
				<section>
					<div>
						<p>Hello world</p>
					</div>
				</section>
			</main>
		</Fragment>
	);
}
