import BackButton from '@/app/_components/backButton';
import GridLayout from '@/app/_components/gridLayout';
import SectionWrapper from '@/app/_components/sectionWrapper';
import { eventslist } from '@/libs/eventsList';
import React from 'react';

type SearchPageProps = {
	searchParams: { q?: string; loc_q?: string };
};

const SearchPage: React.FC<SearchPageProps> = ({ searchParams }) => {
	const searchTerm = searchParams.q || searchParams.loc_q || '';

	// Ensure all properties are compared correctly
	const events = eventslist.filter((event) =>
		[event.title, event.city, event.country, event.address].some((field) =>
			field?.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<SectionWrapper>
			<h1 className='text-center text-4xl lg:text-6xl font-semibold capitalize text-gray-500 pb-5'>
				<BackButton />
				Search results for: <span className='italic'>{searchTerm}</span>
			</h1>

			<div className='pt-10'>
				{events.length > 0 ? (
					<GridLayout eventslist={events} />
				) : (
					<p className='text-center text-gray-500 pt-20 lg:pt-40'>
						No events found for "<span className='italic'>{searchTerm}</span>".
					</p>
				)}
			</div>
		</SectionWrapper>
	);
};

export default SearchPage;
