import { auth, db } from '@/db/firebase';
import { eventSchema } from '@/schemas/eventSchema';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { z } from 'zod';

export const createEvent = async (
	data: z.infer<typeof eventSchema>,
	userId: string
) => {
	const user = auth.currentUser; // Make sure auth.currentUser is properly initialized

	if (!user) {
		throw new Error('User is not authenticated.');
	}
	if (user?.uid !== user.uid) {
		throw new Error('User is not authenticated.');
	}
	try {
		const dataRef = collection(db, 'events');
		const event = await addDoc(dataRef, {
			...data,
			attendants: [],
			creatorId: user.uid,
			createdAt: serverTimestamp(),
		});
		return event;
	} catch (error) {
		console.log('error creating event', error);
		throw new Error('error creating event, try again ');
	}
};
