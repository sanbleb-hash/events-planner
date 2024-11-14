import Categories from '@/app/_components/categories';
import GridLayout from '@/app/_components/gridLayout';
import SectionWrapper from '@/app/_components/sectionWrapper';

import { eventslist } from '@/libs/eventsList';
import React from 'react';
import { MdArrowCircleLeft } from 'react-icons/md';

type SearchParamsProps = {
	searchParams: {
		location: string | undefined | null;
		cat: string | undefined | null;
	};
};

const ExplorePage = ({ searchParams }: SearchParamsProps) => {
	const location = searchParams.location ?? '';
	const cat = searchParams.cat ?? '';

	const filteredByCategory = eventslist.filter((evt) => evt.category === cat);
	const filteredByLocation = eventslist.filter(
		(evt) => evt.country === location || evt.city === location
	);

	const events = cat
		? filteredByCategory
		: location
		? filteredByLocation
		: eventslist;

	return (
		<SectionWrapper>
			<h1 className='text-2xl lg:text-3xl text-gray-400 capitalize flex items-center gap-2'>
				<span className=' cursor-pointer'>
					<MdArrowCircleLeft />
				</span>
				{cat ? (
					cat + ' events'
				) : location ? (
					location + ' events'
				) : (
					<Categories />
				)}
			</h1>

			<div className=' pt-10 '>
				{events && events.length > 0 ? (
					<GridLayout eventslist={events} />
				) : (
					<p className='text-center text-gray-500 pt-20 lg:pt-40'>
						No events found for this {cat ? 'category' : 'location'}.
					</p>
				)}
			</div>
		</SectionWrapper>
	);
};

export default ExplorePage;
