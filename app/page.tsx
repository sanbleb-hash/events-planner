import React from 'react';
import Header from './_components/header';
import TitleHeader from './_components/titleHeader';

import SectionWrapper from './_components/sectionWrapper';

import GridLayout from './_components/gridLayout';
import CategorySection from './_components/categorysection';
import Categories from './_components/categories';

import { DocumentData, collection, getDocs } from 'firebase/firestore';
import { fetchEvents } from '@/actions/getEvents';
import { db } from '@/db/firebase';

const Home = async () => {
	const eventsSnap = collection(db, 'events');
	const eventsDocs = await getDocs(eventsSnap);
	let events: DocumentData[] = [];

	eventsDocs.forEach((doc) => {
		if (doc.exists()) {
			events.push({
				id: doc.id,
				...doc.data(),
			});
		}
	});

	return (
		<div className='pt-14 min-h-screen w-[90dvw] lg:w-[80dvw] bg-slate-50 mx-auto'>
			<Categories />

			<header className='mt-16 pb-10'>
				<Header />
			</header>

			<SectionWrapper>
				<TitleHeader url='/events/explore?location=westen-cape' />
				<GridLayout eventslist={events} />
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
