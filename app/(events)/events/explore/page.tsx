'use client';

import {
	fetchEvents,
	fetchFilteredEvents,
	searchEvents,
} from '@/actions/getEvents';
import BackButton from '@/app/_components/backButton';
import EventCard from '@/app/_components/card';
import FilterEvents from '@/app/_components/filterEvents';
import SectionWrapper from '@/app/_components/sectionWrapper';
import { DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type SearchParamsProps = {
	searchParams: {
		location?: string | null;
		category?: string | null;
		priceType?: string | null;
	};
};

const ExplorePage = ({ searchParams }: SearchParamsProps) => {
	// State to manage events data
	const [events, setEvents] = useState<DocumentData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	// Destructure search parameters with default values
	const { location = '', category = '', priceType = '' } = searchParams;

	// Fetch events based on filters
	const getEvents = async () => {
		setLoading(true); // Start loading
		try {
			let fetchedEvents: DocumentData[] = [];

			if (category) {
				fetchedEvents = await fetchFilteredEvents({
					q: 'GET BY CATEGORY',
					category,
				});
			} else if (priceType) {
				fetchedEvents = await fetchFilteredEvents({
					q: 'GET BY PRICETYPE',
					priceType,
				});
			} else if (location) {
				const searchTerm = {
					q: '',
					locationQ: location,
				};
				// Example: Add location filter logic here
				fetchedEvents = await searchEvents(searchTerm);
			} else {
				fetchedEvents = await fetchEvents();
			}

			setEvents(fetchedEvents); // Update state with fetched events
		} catch (error) {
			console.error('Error fetching events:', error);
		} finally {
			setLoading(false); // Stop loading
		}
	};

	// Render header title based on filters
	const renderTitle = () => {
		if (category) return `${category} Events`;
		if (location) return `${location} Events`;
		if (priceType) return `${priceType} Events`;
		return 'All Events';
	};

	// Fetch events whenever the filters change
	useEffect(() => {
		getEvents();
	}, [category, location, priceType]);

	return (
		<SectionWrapper>
			<header className='w-full flex justify-between items-center bg-slate-200 p-2 rounded-lg'>
				<div>
					<BackButton />
				</div>
				<h1 className='text-center text-2xl md:text-4xl lg:text-6xl font-semibold capitalize text-gray-500 pb-5'>
					{renderTitle()}
				</h1>
				<FilterEvents />
			</header>

			<section className='py-12'>
				{loading ? (
					<p className='text-center text-gray-500'>Loading events...</p>
				) : events.length > 0 ? (
					<div className='flex items-center justify-center lg:items-start lg:justify-normal gap-3 gap-y-10 flex-wrap'>
						{events.map((event) => (
							<EventCard
								key={event.id}
								id={event.id}
								imgUrl={event.imageUrl}
								title={event.title}
								date={event.date}
								time={event.time}
								venue={event.venue}
								charges={event.price}
								attendes={event.attendants?.length || 0}
								priceType={event.priceType}
							/>
						))}
					</div>
				) : (
					<p className='text-center text-gray-500 pt-20 lg:pt-40'>
						No events found for this{' '}
						{category ? 'category' : priceType ? 'price type' : 'location'}.
					</p>
				)}
			</section>
		</SectionWrapper>
	);
};

export default ExplorePage;
