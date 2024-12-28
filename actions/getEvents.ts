import { db } from '@/db/firebase';
import {
	collection,
	query,
	where,
	orderBy,
	limit,
	startAfter,
	getDocs,
	DocumentData,
	QueryDocumentSnapshot,
} from 'firebase/firestore';

type QueryType = {
	q?: string;
	priceType?: string;
	category?: string;
	lastVisible?: QueryDocumentSnapshot<DocumentData> | null;
};

export async function fetchEvents({
	q,
	priceType,
	category,
	lastVisible,
}: QueryType): Promise<DocumentData[]> {
	let events: DocumentData[] = [];
	const eventsRef = collection(db, 'events');

	// Utility function to fetch and process documents
	const fetchAndProcess = async (eventsQuery: any) => {
		const querySnapshot = await getDocs(eventsQuery);
		querySnapshot.forEach((doc) => {
			if (doc.exists()) {
				events.push({
					id: doc.id,
					...doc.data()!,
				});
			}
		});
	};

	try {
		let eventsQuery;

		switch (q) {
			case 'GET SEARCH':
				eventsQuery = query(
					eventsRef,
					where('title', 'in', [q]),
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);
				await fetchAndProcess(eventsQuery);
				break;

			case 'GET BY CATEGORY':
				eventsQuery = query(
					eventsRef,
					where('category', '==', category),
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);
				await fetchAndProcess(eventsQuery);
				break;

			case 'GET BY PRICETYPE':
				eventsQuery = query(
					eventsRef,
					where('priceType', '==', priceType),
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);
				await fetchAndProcess(eventsQuery);
				break;

			case 'GET ALL EVENTS':
				eventsQuery = query(
					eventsRef,
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);
				await fetchAndProcess(eventsQuery);
				break;

			default:
				console.warn(`Unknown query type: ${q}`);
				break;
		}
	} catch (error) {
		console.error('Error fetching events:', error);
	}

	return events;
}
