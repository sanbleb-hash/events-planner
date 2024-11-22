import { z } from 'zod';

export const eventSchema = z.object({
	title: z.string(),
	date: z.string(),
	time: z
		.string()
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format' }),
	organizer: z.string(),
	priceType: z.string(),
	category: z.string(),
	venue: z.string(),
	address: z.string(),
	city: z.string(),
	price: z.string(),
	country: z.string(),
	description: z.string(),
	imageUrl: z.string(),
});
