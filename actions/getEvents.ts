'use server';

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
	Query,
} from 'firebase/firestore';

type QueryType = {
	q?: 'GET SEARCH' | 'GET BY CATEGORY' | 'GET BY PRICETYPE' | 'GET ALL EVENTS';
	priceType?: string;
	category?: string;
	lastVisible?: QueryDocumentSnapshot<DocumentData> | null;
};

type SearchParams = {
	q: string;
	locationQ: string;
};

function capitalizeFirstLetter(str: string): string {
	if (!str) return str;
	return str.charAt(0).toUpperCase() + str.slice(1);
}

async function executeQuery(
	eventsQuery: any,
	events: DocumentData[]
): Promise<void> {
	const querySnapshot = await getDocs(eventsQuery);
	querySnapshot.forEach((doc) => {
		if (doc.exists()) {
			events.push({ id: doc.id, ...doc.data()! });
		}
	});
}

export const searchEvents = async (searchTerms: SearchParams) => {
	const { q, locationQ } = searchTerms;
	const eventsRef = collection(db, 'events');
	let events: DocumentData[] = [];

	try {
		// Queries to handle individual conditions
		const queries: Query<DocumentData>[] = [];

		if (q && q.length > 0) {
			queries.push(
				query(
					eventsRef,
					where('title', 'in', q),
					orderBy('createdAt', 'desc'),
					limit(10)
				)
			);
		}

		if (locationQ && locationQ.length > 0) {
			queries.push(
				query(
					eventsRef,
					where('address', 'in', locationQ),
					orderBy('createdAt', 'desc'),
					limit(10)
				),
				query(
					eventsRef,
					where('city', 'in', locationQ),
					orderBy('createdAt', 'desc'),
					limit(10)
				),
				query(
					eventsRef,
					where('country', 'in', locationQ),
					orderBy('createdAt', 'desc'),
					limit(10)
				)
			);
		}

		// Execute all queries and merge results
		const queryResults = await Promise.all(
			queries.map((query) => getDocs(query))
		);

		queryResults.forEach((snapshot) => {
			snapshot.forEach((doc) => {
				if (doc.exists()) {
					events.push({ id: doc.id, ...doc.data() });
				}
			});
		});

		// Remove duplicates if the same event matches multiple queries
		events = events.filter(
			(event, index, self) => index === self.findIndex((e) => e.id === event.id)
		);
	} catch (error) {
		console.error('Error fetching events:', error);
	}

	return events;
};

export async function fetchFilteredEvents({
	q,
	priceType,
	category,
	lastVisible,
}: QueryType): Promise<DocumentData[]> {
	const events: DocumentData[] = [];
	const eventsRef = collection(db, 'events');

	try {
		let eventsQuery;

		switch (q) {
			case 'GET BY CATEGORY': {
				if (!category)
					throw new Error('Missing category for "GET BY CATEGORY".');
				const capitalizedCategory = capitalizeFirstLetter(category);
				eventsQuery = query(
					eventsRef,
					where('category', '==', capitalizedCategory),
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);

				break;
			}
			case 'GET BY PRICETYPE': {
				if (!priceType)
					throw new Error('Missing price type for "GET BY PRICETYPE".');
				const capitalizedPriceType = capitalizeFirstLetter(priceType);
				eventsQuery = query(
					eventsRef,
					where('priceType', '==', capitalizedPriceType),
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);
				break;
			}
			case 'GET ALL EVENTS': {
				eventsQuery = query(
					eventsRef,
					orderBy('createdAt', 'desc'),
					startAfter(lastVisible || 0),
					limit(10)
				);
				break;
			}
			default:
				throw new Error('Invalid query type provided.');
		}

		if (eventsQuery) {
			await executeQuery(eventsQuery, events);
		}
	} catch (error) {
		console.error('Error fetching events:', error);
		// throw new Error('Failed to fetch filtered events.');
	}

	return events;
}

export const fetchEvents = async (): Promise<DocumentData[]> => {
	const events: DocumentData[] = [];
	const eventsRef = collection(db, 'events');

	try {
		const querySnapshot = await getDocs(eventsRef);
		querySnapshot.forEach((doc) => {
			if (doc.exists()) {
				events.push({ id: doc.id, ...doc.data() });
			}
		});
	} catch (error) {
		console.error('Error fetching events:', error);
		throw new Error('Failed to fetch events.');
	}

	return events;
};
