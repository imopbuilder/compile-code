'use client';

import { useEditorOptions } from '@/client/store/editor-options';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { languageOptions } from '@/constants/app';
import { cn } from '@/lib/utils/cn';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';
import { EllipsisText } from '../ellipsis-text';

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
