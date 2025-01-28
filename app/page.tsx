import React from 'react';
import Header from './_components/header';
import TitleHeader from './_components/titleHeader';

import SectionWrapper from './_components/sectionWrapper';

import GridLayout from './_components/gridLayout';
import CategorySection from './_components/categorysection';
import Categories from './_components/categories';
import { fetchEvents } from '@/actions/getEvents';

const Home = async () => {
	const events = await fetchEvents();

	return (
		<div className='pt-14 min-h-screen w-[90dvw] lg:w-[80dvw] bg-slate-50 mx-auto'>
			<Categories />

			<header className='mt-16 pb-10'>
				<Header />
			</header>

			<SectionWrapper>
				<TitleHeader url='/events/explore?location=westen-cape' />
				<section className=' w-full overflow-hidden '>
					<GridLayout eventslist={events} />
				</section>
			</SectionWrapper>

			<CategorySection
				title='Professional events'
				url='/events/explore?cat=professional'
				categoryId='Technology'
			/>
		</div>
	);
};

export default Home;
