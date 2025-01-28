'use client';

import React, { useEffect, useState } from 'react';
import EventCard from './card';
import { DocumentData } from 'firebase/firestore';

type Props = {
	eventslist: DocumentData[];
};
const SMALL_SCREEN = 640;
const MEDIUM_SCREEN = 950;

const GridLayout = ({ eventslist }: Props) => {
	const [visibleEvents, setVisibleEvents] = useState<DocumentData[]>([]);
	const [visibleCount, setVisibleCount] = useState<number>(4);

	const determineEventsTotal = (width: number): number => {
		if (width <= SMALL_SCREEN) return 3; // Small screens
		if (width > SMALL_SCREEN && width <= MEDIUM_SCREEN) return 4; // Medium screens
		return 8; // Large screens
	};

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;

			setVisibleCount(determineEventsTotal(width));
		};

		handleResize(); // Initial calculation on mount
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);
	visibleCount;
	useEffect(() => {
		if (eventslist.length) {
			const total = eventslist.slice(0, visibleCount);
			setVisibleEvents(total);
		}
	}, [visibleCount]);

	return (
		<div className=' pt-10 w-full  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3  items-center md:items-start justify-center   '>
			{visibleEvents?.map((event) => (
				<EventCard
					key={event.id}
					id={event.id}
					imgUrl={event.imageUrl}
					title={event.title}
					date={event.date}
					time={event.time}
					location={event.city}
					venue={event.address}
					charges={event.price}
					priceType={event.priceType}
					attendes={event.attendants.length}
				/>
			))}
		</div>
	);
};

export default GridLayout;
