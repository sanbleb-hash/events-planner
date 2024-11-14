'use client';

import React from 'react';
import Header from './_components/header';
import TitleHeader from './_components/titleHeader';
import { Event } from '@/types/event';
import SectionWrapper from './_components/sectionWrapper';
import { eventslist } from '@/libs/eventsList';
import GridLayout from './_components/gridLayout';
import CategorySection from './_components/categorysection';
import Categories from './_components/categories';

const Home = () => {
	return (
		<div className='pt-14 min-h-screen w-[90dvw] lg:w-[80dvw] bg-slate-50 mx-auto'>
			<Categories />

			<header className='mt-16 pb-10'>
				<Header />
			</header>

			<SectionWrapper>
				<TitleHeader url='/events/explore?location=westen-cape' />
				<GridLayout eventslist={eventslist} />
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
