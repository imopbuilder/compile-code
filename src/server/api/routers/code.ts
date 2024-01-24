import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';
import { z } from 'zod';

export const codeRouter = createTRPCRouter({
	compileCode: publicProcedure
		.input(
			z.object({
				subjectName: z.string(),
				totalClasses: z.number(),
				attendedClasses: z.number(),
				color: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			return 'code compiled';
		}),
});
