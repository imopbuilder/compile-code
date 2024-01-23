'use client';

import { useEditor } from '@/client/store/editor';
import { useEditorOptions } from '@/client/store/editor-options';
import { Textarea } from '@/components/ui/textarea';
import { languageOptions } from '@/constants/app';
import Editor from '@monaco-editor/react';

export function CodeEditor() {
	const language = useEditorOptions((state) => state.language);
	const theme = useEditorOptions((state) => state.theme);
	const code = useEditor((state) => state.code);
	const setcode = useEditor((state) => state.setcode);

	return (
		<Editor
			height='100%'
			width='100%'
			defaultLanguage='javascript'
			language={languageOptions.find((val) => val.id === language)?.value}
			defaultValue='// some comment'
			value={code}
			onChange={(val) => setcode(val as string)}
		/>
	);
}

export function CodeOutput() {
	return (
		<div className='bg-muted rounded-lg my-2 p-3 text-sm min-h-56 text-muted-foreground'>
			<p>output panel</p>
		</div>
	);
}

export function CustomInput() {
	const customInput = useEditor((state) => state.customInput);
	const setcustominput = useEditor((state) => state.setcustominput);

	return (
		<div className='pt-1'>
			<Textarea className='rounded-lg' placeholder='Custom input...' value={customInput} onChange={(e) => setcustominput(e.target.value)} />
		</div>
	);
}
