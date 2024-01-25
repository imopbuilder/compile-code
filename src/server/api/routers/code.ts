import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import axios from 'axios';
import { z } from 'zod';

export const codeRouter = createTRPCRouter({
	compileCode: publicProcedure
		.input(
			z.object({
				language: z.number(),
				code: z.string(),
				input: z.string(),
			}),
		)
		.output(
			z.object({
				token: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const { language, code, input: customInput } = input;
			const options = {
				method: 'POST',
				url: process.env.SUBMISSIONS_URL,
				params: { base64_encoded: 'true', fields: '*' },
				headers: {
					'content-type': 'application/json',
					'Content-Type': 'application/json',
					'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
					'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
				},
				data: {
					language_id: language,
					source_code: btoa(code),
					stdin: btoa(customInput),
				},
			};

			try {
				const response = await axios.request(options);
				return { token: response.data.token };
			} catch (error) {
				throw new Error('Failed to compile and execute');
			}
		}),

	output: publicProcedure
		.input(
			z.object({
				token: z.string(),
			}),
		)
		.output(
			z.object({
				stdout: z.string().nullable(),
				stderr: z.string().nullable(),
				message: z.string().nullable(),
				status: z.object({
					id: z.number(),
					description: z.string(),
				}),
				token: z.string(),
				time: z.string().nullable(),
				memory: z.number().nullable(),
				compile_output: z.string().nullable(),
			}),
		)
		.mutation(async ({ input }) => {
			const { token } = input;

			const options = {
				method: 'GET',
				url: `${process.env.SUBMISSIONS_URL}/${token}`,
				params: { base64_encoded: 'true', fields: '*' },
				headers: {
					'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
					'X-RapidAPI-Host': process.env.RAPIDAPI_HOST,
				},
			};

			try {
				const response = await axios.request(options);

				return {
					stdout: response.data.stdout,
					stderr: response.data.stderr,
					message: response.data.message,
					status: response.data.status,
					token: response.data.token,
					time: response.data.time,
					memory: response.data.memory,
					compile_output: response.data.compile_output,
				};
			} catch (error) {
				throw new Error('Failed to process code');
			}
		}),
});

// {
// 	"stdout": "hello, Judge0\n",
// 	"time": "0.001",
// 	"memory": 376,
// 	"stderr": null,
// 	"token": "8531f293-1585-4d36-a34c-73726792e6c9",
// 	"compile_output": null,
// 	"message": null,
// 	"status": {
// 	  "id": 3,
// 	  "description": "Accepted"
// 	}
// }
