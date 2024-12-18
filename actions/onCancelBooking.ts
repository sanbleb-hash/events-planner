import { auth, db } from '@/db/firebase';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const onCancelBooking = async (email: string, eventId: string) => {
	const eventRef = doc(db, 'events', eventId);

	try {
		const event = await getDoc(eventRef);
		const { currentUser } = auth;

		if (event.exists()) {
			const eventData = event.data();

			// Ensure the current user is the event creator
			if (eventData.creatorId !== currentUser?.uid) {
				throw new Error('Not authorized');
			}

			// Filter out the attendant with the specified email
			const updatedAttendants = eventData.attendants.filter(
				(attendant: { email: string }) => attendant.email !== email
			);

			// Update the attendants array in Firestore
			await updateDoc(eventRef, {
				attendants: updatedAttendants,
			});

			return 'success';
		} else {
			throw new Error('Event does not exist');
		}
	} catch (error) {
		console.error('Failed to remove attendant:', error);
		throw new Error('Something went wrong, removal failed');
	}
};
