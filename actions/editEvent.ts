import { auth, db } from '@/db/firebase';
import { eventSchema } from '@/schemas/eventSchema';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { z } from 'zod';

export const editEvent = async (
	data: z.infer<typeof eventSchema>,
	eventId: string
) => {
	const user = auth;
	const eventRef = doc(db, 'events', eventId);
	const event = await getDoc(eventRef);

	if (event.exists()) {
		if (user?.currentUser?.uid !== event.data()?.creatorId) {
			throw new Error('Not authorized to do this operation');
		}

		// If authorized, update the event
		const updatedEvent = await updateDoc(eventRef, data);
		return eventRef.id; // Return the updated event reference or data as needed
	}

	throw new Error('Event does not exist');
};
