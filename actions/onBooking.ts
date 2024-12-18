import { auth, db } from '@/db/firebase';
import { bookingSchema } from '@/schemas/bookingSchema';

import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

export const onBooking = async (
	data: z.infer<typeof bookingSchema>,
	eventId: string
) => {
	const eventRef = doc(db, 'events', eventId);

	try {
		const event = await getDoc(eventRef);
		const { currentUser } = auth;

		if (event.exists()) {
			const eventData = event.data();

			if (eventData.creatorId !== currentUser?.uid) {
				throw new Error('not authorised');
			}

			// Use Firestore's arrayUnion to safely add new data to an array
			await updateDoc(eventRef, {
				attendants: arrayUnion(data),
			});

			return 'success';
		} else {
			throw new Error('Event does not exist');
		}
	} catch (error) {
		console.error('Failed to book:', error);
		throw new Error('Something went wrong, booking failed');
	}
};
