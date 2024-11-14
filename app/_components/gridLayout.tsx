'use client';

import React, { useEffect, useState } from 'react';
import EventCard from './card';
import { Event } from '@/types/event';

type Props = {
	eventslist: Event[];
};

const GridLayout = ({ eventslist }: Props) => {
	const [viewportWidth, setViewportWidth] = useState<number | null>(null);
	const [visibleEvents, setVisibleEvents] = useState<number>(4);

	const determineEventsTotal = (width: number) => {
		if (width <= 640) return 4; // Small screens
		if (width <= 950) return 6; // Medium screens
		if (width <= 1280) return 8; // Large screens
		return 10; // Extra large screens
	};

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setViewportWidth(width);
			setVisibleEvents(determineEventsTotal(width));
		};

		handleResize(); // Initial calculation on mount
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:items-start justify-center'>
			{eventslist.slice(0, visibleEvents).map((event) => (
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
					attendes={event.attends.length}
				/>
			))}
		</div>
	);
};

export default GridLayout;
