import { auth, db } from '@/db/firebase';

import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';

export const onEventDelete = async (eventId: string) => {
	const { currentUser } = auth;
	const eventRef = doc(db, 'events', eventId);

	try {
		const event = await getDoc(eventRef);

		if (event.exists()) {
			const eventData = event.data();

			// Ensure the current user is the event creator
			if (eventData.creatorId !== currentUser?.uid) {
				throw new Error('Not authorized');
			}

			// delete the event
			await deleteDoc(eventRef);

			return 'success';
		} else {
			throw new Error('Event does not exist');
		}
	} catch (error) {
		console.error('Failed to remove event:', error);
		throw new Error('Something went wrong, event removal failed');
	}
};
