'use client';

import React, { useCallback, useEffect, useState } from 'react';
import SectionWrapper from './sectionWrapper';
import TitleHeader from './titleHeader';
import { eventslist } from '@/libs/eventsList';
import EventCard from './card';

type Event = {
	id: string;
	imageUrl: string;
	title: string;
	date: string;
	time: string;
	city: string;
	address: string;
	price: string;
	priceType: string;
	attends: [];
	category: string;
};

type Props = {
	url: string;
	title?: string;
	categoryId: string;
};

const CategorySection = ({ categoryId, url, title }: Props) => {
	const [categories, setCategories] = useState<Event[]>([]); // Use Event[] as the type

	const fetchEventsByCategory = useCallback(() => {
		const events = eventslist.filter((evt) => evt.category === categoryId);
		//@ts-ignore
		setCategories(events.slice(0, 4));
	}, [categoryId]);

	useEffect(() => {
		fetchEventsByCategory();
	}, [fetchEventsByCategory]);

	return (
		<SectionWrapper>
			<TitleHeader url={url} title={title} />
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:items-start justify-center'>
				{categories.length > 0 &&
					categories.map((event) => (
						<EventCard
							key={event.id}
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
		</SectionWrapper>
	);
};

export default CategorySection;
