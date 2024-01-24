import { create } from 'zustand';

type State = {
	code: string;
	customInput: string;
	backgroundColor: string;
};

type Action = {
	setcode: (code: State['code']) => void;
	setcustominput: (input: State['customInput']) => void;
	setbackgroundcolor: (backgroundColor: State['backgroundColor']) => void;
};

export const useEditor = create<State & Action>((set) => ({
	code: `console.log('Hello world')`,
	customInput: '',
	backgroundColor: '#000000',
	setcode: (code) => set((state) => ({ code })),
	setcustominput: (input) => set((state) => ({ customInput: input })),
	setbackgroundcolor: (backgroundColor) => set((state) => ({ backgroundColor })),
}));
