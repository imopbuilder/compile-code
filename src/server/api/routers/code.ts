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
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}

			return 'code compiled';
		}),
});
