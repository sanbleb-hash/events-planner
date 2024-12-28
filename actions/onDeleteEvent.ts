import { auth, db, storage } from '@/db/firebase';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';

export const onEventDelete = async (eventId: string): Promise<string> => {
	try {
		// Ensure the user is authenticated
		const { currentUser } = auth;
		if (!currentUser) {
			throw new Error('User is not authenticated');
		}

		// Reference to the event document
		const eventRef = doc(db, 'events', eventId);
		const eventSnapshot = await getDoc(eventRef);

		// Check if the event exists
		if (!eventSnapshot.exists()) {
			throw new Error('Event does not exist');
		}

		const eventData = eventSnapshot.data();

		// Check if the current user is the creator of the event
		if (eventData?.creatorId !== currentUser.uid) {
			throw new Error('Not authorized to delete this event');
		}

		// Reference to the event's image in storage
		const imgUrl = eventData.imageUrl;
		const imageLocation = imgUrl?.split('images/');

		const imageRef = ref(storage, `images/${imageLocation[1]}`);

		// Delete the image and the event
		// await deleteObject(imageRef);
		await deleteDoc(eventRef);

		return 'Event deleted successfully';
	} catch (error) {
		console.error('Failed to delete event:', error);
		throw new Error(
			error instanceof Error ? error.message : 'Event deletion failed'
		);
	}
};
