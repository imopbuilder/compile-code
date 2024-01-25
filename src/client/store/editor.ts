import { create } from 'zustand';

type State = {
	code: string;
	customInput: string;
	backgroundColor: string;
	processing: boolean;
	output: {
		stdout: string | null;
		stderr: string | null;
		message: string | null;
		status: {
			id: number;
			description: string;
		} | null;
		token: string | null;
		time: string | null;
		memory: number | null;
		compile_output: string | null;
	};
};

type Action = {
	setcode: (code: State['code']) => void;
	setcustominput: (input: State['customInput']) => void;
	setbackgroundcolor: (backgroundColor: State['backgroundColor']) => void;
	setprocessing: (porcessing: State['processing']) => void;
	setoutput: (output: State['output']) => void;
};

export const useEditor = create<State & Action>((set) => ({
	code: `console.log('Hello world')`,
	customInput: '',
	backgroundColor: '#000000',
	processing: false,
	output: {
		stdout: null,
		stderr: null,
		message: null,
		status: null,
		token: null,
		time: null,
		memory: null,
		compile_output: null,
	},

	setcode: (code) => set((state) => ({ code })),
	setcustominput: (input) => set((state) => ({ customInput: input })),
	setbackgroundcolor: (backgroundColor) => set((state) => ({ backgroundColor })),
	setprocessing: (processing) => set((state) => ({ processing })),
	setoutput: (output) => set((state) => ({ output })),
}));
