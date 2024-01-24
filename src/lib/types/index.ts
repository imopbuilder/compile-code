import { z } from 'zod';

const processEnvSchema = z.object({
	RAPIDAPI_HOST: z.string(),
	RAPIDAPI_KEY: z.string(),
	SUBMISSIONS_URL: z.string(),
});
processEnvSchema.parse(process.env);

// global
declare global {
	namespace NodeJS {
		interface ProcessEnv extends z.infer<typeof processEnvSchema> {}
	}
}
