import { z } from 'zod';

export const eventSchema = z.object({
	title: z
		.string()
		.min(1, { message: 'Title is required' })
		.max(255, { message: 'Title is too long' }),
	date: z.string().min(1, { message: 'Date is required' }),
	time: z
		.string()
		.regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: 'Invalid time format' }),
	organizer: z
		.string()
		.min(1, { message: 'Organizer is required' })
		.max(255, { message: 'Organizer name is too long' }),
	priceType: z.enum(['Free', 'Paid', 'Invite Only', 'Donation'], {
		message: 'Invalid price type',
	}),
	category: z.string().min(1, { message: 'Category is required' }),
	venue: z.string().min(1, { message: 'Venue is required' }),
	address: z.string().min(1, { message: 'Address is required' }),
	city: z.string().min(1, { message: 'City is required' }),
	price: z.string().refine(
		(val) => {
			// Ensures price is a number and is a valid positive number
			return !isNaN(Number(val)) && Number(val) >= 0;
		},
		{ message: 'Price must be a valid number' }
	),
	country: z.string().min(1, { message: 'Country is required' }),
	description: z.string().min(1, { message: 'Description is required' }),
	attendants: z
		.array(
			z.object({
				name: z.string().min(3),
				attendeeId: z.string().min(1),
				email: z.string().email({ message: 'Invalid email address' }),
			})
		)
		.optional(),
	imageUrl: z.string().url({ message: 'Invalid image URL format' }),
});
