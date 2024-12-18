import { auth, db } from '@/db/firebase';
import { bookingSchema } from '@/schemas/bookingSchema';
import { eventSchema } from '@/schemas/eventSchema';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

export const onBooking = async (
	data: z.infer<typeof bookingSchema>,
	eventId: string
) => {
	const eventRef = doc(db, 'events', eventId);
	const event = await getDoc(eventRef);

	try {
		if (event.exists()) {
			const eventDataRef = event.data();

			await updateDoc(eventRef, eventDataRef?.attendants.push(data));
		}
	} catch (error) {
		console.log('failed to book');
		throw new Error('Something went wrong ,booking failed');
	}
};
