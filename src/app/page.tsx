import Header from '@/components/global/header';
import { CodeEditor, CodeOutput, CompileCodeBtn, CustomInput } from '@/components/pages/home/client';
import { Fragment } from 'react';

export default function Home() {
	return (
		<Fragment>
			<Header />
			<main>
				<section className=''>
					<div className='flex items-stretch justify-center mx-5 min-h-hvh gap-5'>
						<div className='w-[70%]'>
							<div className='py-5 h-full'>
								<CodeEditor />
							</div>
						</div>
						<div className='w-[30%] my-5'>
							<h3 className='scroll-m-20 text-xl font-semibold tracking-tight'>Output</h3>
							<CodeOutput />
							<CustomInput />
							<CompileCodeBtn />
						</div>
					</div>
				</section>
			</main>
		</Fragment>
	);
}
