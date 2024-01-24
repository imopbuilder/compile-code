'use client';

import { useEditor } from '@/client/store/editor';
import { useEditorOptions } from '@/client/store/editor-options';
import { api } from '@/client/trpc';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { languageOptions } from '@/constants/app';
import Editor from '@monaco-editor/react';
import { CSSProperties } from 'react';
import { toast } from 'sonner';

export function CodeEditor() {
	const language = useEditorOptions((state) => state.language);
	const theme = useEditorOptions((state) => state.theme);
	const code = useEditor((state) => state.code);
	const setcode = useEditor((state) => state.setcode);
	const backgroundColor = useEditor((state) => state.backgroundColor);

	return (
		<div style={{ backgroundColor }} className='h-full py-5 rounded-lg border'>
			<Editor
				height='100%'
				width='100%'
				loading={<CodeEditorLoading />}
				defaultLanguage='javascript'
				language={languageOptions.find((val) => val.id === language)?.value}
				theme={theme}
				defaultValue={`console.log('Hello world')`}
				value={code}
				onChange={(val) => setcode(val as string)}
			/>
		</div>
	);
}

function CodeEditorLoading() {
	return (
		<div className='size-28'>
			{[1, 2].map((val) => (
				<div key={val} className='size-28 absolute loader-wrapper'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						xmlnsXlink='http://www.w3.org/1999/xlink'
						version='1.1'
						x='0px'
						y='0px'
						viewBox='0 0 100 100'
						style={{ enableBackground: 'new 0 0 100 100' } as CSSProperties}
						xmlSpace='preserve'
						className='fill-muted-foreground animate-atom-loader'
					>
						<title>loading</title>
						<path d='M85.5,42c-0.2-0.8-0.5-1.7-0.8-2.5c-0.3-0.9-0.7-1.6-1-2.3c-0.3-0.7-0.6-1.3-1-1.9c0.3,0.5,0.5,1.1,0.8,1.7  c0.2,0.7,0.6,1.5,0.8,2.3s0.5,1.7,0.8,2.5c0.8,3.5,1.3,7.5,0.8,12c-0.4,4.3-1.8,9-4.2,13.4c-2.4,4.2-5.9,8.2-10.5,11.2  c-1.1,0.7-2.2,1.5-3.4,2c-0.5,0.2-1.2,0.6-1.8,0.8s-1.3,0.5-1.9,0.8c-2.6,1-5.3,1.7-8.1,1.8l-1.1,0.1L53.8,84c-0.7,0-1.4,0-2.1,0  c-1.4-0.1-2.9-0.1-4.2-0.5c-1.4-0.1-2.8-0.6-4.1-0.8c-1.4-0.5-2.7-0.9-3.9-1.5c-1.2-0.6-2.4-1.2-3.7-1.9c-0.6-0.3-1.2-0.7-1.7-1.1  l-0.8-0.6c-0.3-0.1-0.6-0.4-0.8-0.6l-0.8-0.6L31.3,76l-0.2-0.2L31,75.7l-0.1-0.1l0,0l-1.5-1.5c-1.2-1-1.9-2.1-2.7-3.1  c-0.4-0.4-0.7-1.1-1.1-1.7l-1.1-1.7c-0.3-0.6-0.6-1.2-0.9-1.8c-0.2-0.5-0.6-1.2-0.8-1.8c-0.4-1.2-1-2.4-1.2-3.7  c-0.2-0.6-0.4-1.2-0.5-1.9c-0.1-0.6-0.2-1.2-0.3-1.8c-0.3-1.2-0.3-2.4-0.4-3.7c-0.1-1.2,0-2.5,0.1-3.7c0.2-1.2,0.3-2.4,0.6-3.5  c0.1-0.6,0.3-1.1,0.4-1.7l0.1-0.8l0.3-0.8c1.5-4.3,3.8-8,6.5-11c0.8-0.8,1.4-1.5,2.1-2.1c0.9-0.9,1.4-1.3,2.2-1.8  c1.4-1.2,2.9-2,4.3-2.8c2.8-1.5,5.5-2.3,7.7-2.8s4-0.7,5.2-0.6c0.6-0.1,1.1,0,1.4,0s0.4,0,0.4,0h0.1c2.7,0.1,5-2.2,5-5  c0.1-2.7-2.2-5-5-5c-0.2,0-0.2,0-0.3,0c0,0-0.2,0.1-0.6,0.1c-0.4,0-1,0-1.8,0.1c-1.6,0.1-4,0.4-6.9,1.2c-2.9,0.8-6.4,2-9.9,4.1  c-1.8,1-3.6,2.3-5.4,3.8C26,21.4,25,22.2,24.4,23c-0.2,0.2-0.4,0.4-0.6,0.6c-0.2,0.2-0.5,0.4-0.6,0.7c-0.5,0.4-0.8,0.9-1.3,1.4  c-3.2,3.9-5.9,8.8-7.5,14.3l-0.3,1l-0.2,1.1c-0.1,0.7-0.3,1.4-0.4,2.1c-0.3,1.5-0.4,2.9-0.5,4.5c0,1.5-0.1,3,0.1,4.5  c0.2,1.5,0.2,3,0.6,4.6c0.1,0.7,0.3,1.5,0.4,2.3c0.2,0.8,0.5,1.5,0.7,2.3c0.4,1.6,1.1,3,1.7,4.4c0.3,0.7,0.7,1.4,1.1,2.1  c0.4,0.8,0.8,1.4,1.2,2.1c0.5,0.7,0.9,1.4,1.4,2s0.9,1.3,1.5,1.9c1.1,1.3,2.2,2.7,3.3,3.5l1.7,1.6c0,0,0.1,0.1,0.1,0.1c0,0,0,0,0,0  c0,0,0,0,0,0l0.1,0.1l0.1,0.1h0.2l0.5,0.4l1,0.7c0.4,0.2,0.6,0.5,1,0.7l1.1,0.6c0.8,0.4,1.4,0.9,2.1,1.2c1.4,0.7,2.9,1.5,4.4,2  c1.5,0.7,3.1,1,4.6,1.5c1.5,0.3,3.1,0.7,4.7,0.8c1.6,0.2,3.1,0.2,4.7,0.2c0.8,0,1.6-0.1,2.4-0.1l1.2-0.1l1.1-0.1  c3.1-0.4,6.1-1.3,8.9-2.4c0.8-0.3,1.4-0.6,2.1-0.9s1.3-0.7,2-1.1c1.3-0.7,2.6-1.7,3.7-2.5c0.5-0.4,1-0.9,1.6-1.3l0.8-0.6l0.2-0.2  c0,0,0.1-0.1,0.1-0.1c0.1-0.1,0,0,0,0v0.1l0.1-0.1l0.4-0.4c0.5-0.5,1-1,1.5-1.5c0.3-0.3,0.5-0.5,0.8-0.8l0.7-0.8  c0.9-1.1,1.8-2.2,2.5-3.3c0.4-0.6,0.7-1.1,1.1-1.7c0.3-0.7,0.6-1.2,0.9-1.8c2.4-4.9,3.5-9.8,3.7-14.4C87.3,49.7,86.6,45.5,85.5,42z' />
					</svg>
				</div>
			))}
		</div>
	);
}

export function CodeOutput() {
	const output = useEditor((state) => state.output);

	// Change the theme depending of the error state

	return (
		<pre className='bg-muted rounded-lg my-2 p-3 text-sm min-h-56 text-muted-foreground'>{output.stdout ? atob(output.stdout) : 'Output panel'}</pre>
	);
}

export function CustomInput() {
	const customInput = useEditor((state) => state.customInput);
	const setcustominput = useEditor((state) => state.setcustominput);
	const processing = useEditor((state) => state.processing);

	return (
		<div className='pt-1'>
			<Textarea
				className='rounded-lg'
				placeholder='Custom input...'
				value={customInput}
				onChange={(e) => setcustominput(e.target.value)}
				disabled={processing}
			/>
		</div>
	);
}

export function CompileCodeBtn() {
	const code = useEditor((state) => state.code);
	const input = useEditor((state) => state.customInput);
	const processing = useEditor((state) => state.processing);
	const setprocessing = useEditor((state) => state.setprocessing);
	const setoutput = useEditor((state) => state.setoutput);
	const language = useEditorOptions((state) => state.language);

	const tokenMutation = api.code.output.useMutation({
		onSuccess: (data) => {
			const { status, token } = data;

			// code is processing
			if (status.id === 1 || status.id === 2) {
				setTimeout(() => {
					tokenMutation.mutate({ token });
				}, 2000);
				return;
			}

			// code compiled successfully
			setprocessing(false);
			setoutput(data);
			toast.success('Compiled successfully');
			return;
		},
		onError: () => toast.error('Failed to compile code!'),
		onSettled: () => {
			setprocessing(false);
		},
	});

	const mutation = api.code.compileCode.useMutation({
		onSuccess: (data) => {
			tokenMutation.mutate({
				token: data.token,
			});
		},
		onError: () => {
			setprocessing(false);
			toast.error('Failed to compile code!');
		},
	});

	function handleClick() {
		setprocessing(true);
		mutation.mutate({ language, code, input });
	}

	return (
		<div className='flex items-center justify-end'>
			<Button type='button' className='mt-3 ml-auto w-auto' onClick={handleClick} disabled={processing}>
				{processing ? 'Processing...' : 'Compile and Execute'}
			</Button>
		</div>
	);
}

export function OutputDetails() {
	const output = useEditor((state) => state.output);
	const processing = useEditor((state) => state.processing);

	if (!output.status || !output.memory || !output.time) return null;

	if (processing)
		return (
			<div className='text-sm text-muted-foreground mt-3 space-y-1'>
				<div className='flex items-center justify-start gap-3'>
					Status: <Skeleton className='h-4 w-20' />
				</div>
				<div className='flex items-center justify-start gap-3'>
					Memory: <Skeleton className='h-4 w-20' />
				</div>
				<div className='flex items-center justify-start gap-3'>
					Time: <Skeleton className='h-4 w-20' />
				</div>
			</div>
		);

	return (
		<div className='text-sm text-muted-foreground mt-3 space-y-1'>
			<p>
				Status: <span className='font-medium'>{output.status.description}</span>
			</p>
			<p>
				Memory: <span className='font-medium'>{output.memory}</span>
			</p>
			<p>
				Time: <span className='font-medium'>{output.time}</span>
			</p>
		</div>
	);
}
