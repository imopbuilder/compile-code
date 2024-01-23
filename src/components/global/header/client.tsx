'use client';

import { useEditor } from '@/client/store/editor';
import { useEditorOptions } from '@/client/store/editor-options';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DEFAULT_THEME, languageOptions } from '@/constants/app';
import { cn } from '@/lib/utils/cn';
import { loader } from '@monaco-editor/react';
import { Check, ChevronsUpDown } from 'lucide-react';
import monacoThemes from 'monaco-themes/themes/themelist.json';
import { useLayoutEffect, useState } from 'react';
import { EllipsisText } from '../ellipsis-text';

// Combobox for editor-language
export function LanguageSelect() {
	const [open, setOpen] = useState(false);
	const value = useEditorOptions((state) => state.language); // language
	const setvalue = useEditorOptions((state) => state.setlanguage); // setlanguage

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant='outline' role='combobox' aria-expanded={open} className='justify-between text-xs font-normal'>
					<EllipsisText text={value ? (languageOptions.find((language) => language.id === value)?.label as string) : 'Select language...'} />
					<ChevronsUpDown className='ml-8 h-3.5 w-3.5 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[var(--radix-popover-trigger-width)] p-0 rounded-md' sideOffset={8}>
				<Command
					filter={(id, search) => {
						const val = languageOptions
							.find((language) => language.id === Number(id))
							?.label.toLowerCase()
							.includes(search.toLowerCase());
						if (val) return 1;
						return 0;
					}}
				>
					<CommandInput className='' placeholder='Search language...' />
					<CommandEmpty>No language found.</CommandEmpty>
					<CommandGroup className='overflow-y-scroll w-full h-80 p-2'>
						{languageOptions.map((language) => (
							<CommandItem
								key={language.id}
								className={`text-xs p-2.5 rounded-lg ${value === language.id ? 'text-foreground' : 'text-muted-foreground'}`}
								value={language.id.toString()}
								onSelect={(currentValue) => {
									setvalue(Number(currentValue) === value ? 63 : Number(currentValue));
									setOpen(false);
								}}
							>
								<Check className={cn('mr-2 h-4 w-4', value === language.id ? 'opacity-100' : 'opacity-0')} />
								{language.label}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}

// Select for editor-theme
export function ThemeSelect() {
	const value = useEditorOptions((state) => state.theme); // theme
	const setvalue = useEditorOptions((state) => state.settheme); // settheme
	const setbackgroundcolor = useEditor((state) => state.setbackgroundcolor);

	async function handleValueChange(val: string) {
		setvalue(val);

		// define theme and set theme
		await Promise.all([
			loader.init(),
			import(`monaco-themes/themes/${Object.entries(monacoThemes).find(([themeId]) => themeId === val)![1]}.json`),
		]).then(([monaco, themeData]) => {
			monaco.editor.defineTheme(val, themeData);
			monaco.editor.setTheme(val);
			setbackgroundcolor(themeData.colors['editor.background']);
		});
	}

	useLayoutEffect(() => {
		async function defaultTheme() {
			await Promise.all([loader.init(), import(`monaco-themes/themes/${DEFAULT_THEME.label}.json`)]).then(([monaco, themeData]) => {
				monaco.editor.defineTheme(DEFAULT_THEME.id, themeData);
				monaco.editor.setTheme(DEFAULT_THEME.id);
			});
		}
		defaultTheme();
	}, []);

	return (
		<Select defaultValue={value} onValueChange={handleValueChange}>
			<SelectTrigger className='gap-8 px-4 text-xs bg-background hover:bg-accent hover:text-accent-foreground'>
				<SelectValue placeholder='Select theme'>
					<EllipsisText text={Object.entries(monacoThemes).find(([themeId]) => themeId === value)![1]} />
				</SelectValue>
			</SelectTrigger>
			<SelectContent sideOffset={4}>
				<SelectGroup className='p-1.5'>
					{Object.entries(monacoThemes).map(([themeId, themeLabel]) => (
						<SelectItem
							key={themeId}
							className={cn('text-xs py-2.5 rounded-lg', value === themeId ? 'text-foreground' : 'text-muted-foreground')}
							value={themeId}
						>
							{themeLabel}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
