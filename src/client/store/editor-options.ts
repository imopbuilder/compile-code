import { DEFAULT_THEME } from '@/constants/app';
import { create } from 'zustand';

type State = {
	language: number;
	theme: string;
};

type Action = {
	setlanguage: (language: State['language']) => void;
	settheme: (theme: State['theme']) => void;
};

export const useEditorOptions = create<State & Action>((set) => ({
	language: 63,
	theme: DEFAULT_THEME.id,
	setlanguage: (language) => set((state) => ({ language })),
	settheme: (theme) => set((state) => ({ theme })),
}));
