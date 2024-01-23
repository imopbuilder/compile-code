import { create } from 'zustand';

type State = {
	code: string;
	customInput: string | undefined;
};

type Action = {
	setcode: (code: State['code']) => void;
	setcustominput: (input: State['customInput']) => void;
};

export const useEditor = create<State & Action>((set) => ({
	code: '// Some comment',
	customInput: undefined,
	setcode: (code) => set((state) => ({ code })),
	setcustominput: (input) => set((state) => ({ customInput: input })),
}));
