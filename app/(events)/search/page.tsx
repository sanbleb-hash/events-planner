import { searchEvents } from '@/actions/getEvents';
import BackButton from '@/app/_components/backButton';
import EventCard from '@/app/_components/card';
import SectionWrapper from '@/app/_components/sectionWrapper';
import React from 'react';

type SearchPageProps = {
	searchParams: { q?: string; locationQ?: string };
};

// type TypeSearchParams = { q?: string; locationQ?: string };

const SearchPage = async ({ searchParams }: SearchPageProps) => {
	// Extract and sanitize search parameters
	const { q: searchTerm = '', locationQ: locationSearchTerm = '' } =
		searchParams;

	// Fetch events based on search terms
	const events = await searchEvents({
		q: searchTerm,
		locationQ: locationSearchTerm,
	});

	return (
		<SectionWrapper>
			<header className='flex justify-between items-center'>
				<BackButton />
				<h1 className='text-4xl lg:text-6xl font-semibold capitalize text-gray-500 pb-5'>
					Search results for:
					<span className='italic'>{searchTerm || 'all'}</span>
				</h1>
			</header>

			<div className='pt-10'>
				{events?.length > 0 ? (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
						{events?.map((event) => (
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
						No events found for <span className='italic'>{searchTerm}</span>.
					</p>
				)}
			</div>
		</SectionWrapper>
	);
};

export default SearchPage;
