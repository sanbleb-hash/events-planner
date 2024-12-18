import { z } from 'zod';

export const bookingSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email address' }),
	name: z.string().min(1, { message: 'Name is required' }),
	phoneNumber: z
		.string()
		.nullable()
		.optional()
		.refine((value) => !value || /^[0-9]{3} [0-9]{3} [0-9]{4}$/.test(value), {
			message: 'Phone number must follow the format: 078 123 1234',
		}),
});
