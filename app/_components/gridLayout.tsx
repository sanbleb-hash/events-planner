'use client';

import React, { useEffect, useState, useCallback } from 'react';
import EventCard from './card';
import { DocumentData } from 'firebase/firestore';

type Props = {
	eventslist: DocumentData[];
};

const SMALL_SCREEN = 640;
const MEDIUM_SCREEN = 950;

const GridLayout: React.FC<Props> = ({ eventslist }) => {
	const [visibleEvents, setVisibleEvents] = useState<DocumentData[]>([]);
	const [visibleCount, setVisibleCount] = useState<number>(4);

	// Helper function to determine the number of events to display based on screen width
	const determineEventsTotal = useCallback((width: number): number => {
		if (width <= SMALL_SCREEN) return 3; // Small screens
		if (width <= MEDIUM_SCREEN) return 4; // Medium screens
		return 8; // Large screens
	}, []);

	// Adjust visible count on window resize
	useEffect(() => {
		const handleResize = () => {
			setVisibleCount(determineEventsTotal(window.innerWidth));
		};

		handleResize(); // Initial calculation on mount
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [determineEventsTotal]);

	// Update visible events whenever the visible count changes
	useEffect(() => {
		setVisibleEvents(eventslist.slice(0, visibleCount));
	}, [visibleCount, eventslist]);

	return (
		<div className='pt-10 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 items-center md:items-start justify-center'>
			{visibleEvents.map((event) => (
				<EventCard
					key={event.id}
					id={event.id}
					imgUrl={event.imageUrl}
					title={event.title}
					date={event.date}
					location={event.city}
					venue={event.address}
					charges={event.price}
					priceType={event.priceType}
					attendes={event.attendants?.length || 0}
				/>
			))}
		</div>
	);
};

export default GridLayout;
