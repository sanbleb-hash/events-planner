import { db } from '@/db/firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getEventById(id: string) {
	if (!id) {
		('no id provided to proceed');
	}

	const eventRef = doc(db, 'events', id);
	const event = await getDoc(eventRef);
	if (event.exists()) {
		return event.data();
	}
}
