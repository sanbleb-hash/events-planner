'use client';

import React, { useEffect, useState } from 'react';
import Header from './_components/header';
import TitleHeader from './_components/titleHeader';
import SectionWrapper from './_components/sectionWrapper';
import { eventslist } from '@/libs/eventsList';
import EventCard from './_components/card';
import CategorySection from './_components/categorysection';
import Categories from './_components/categories';

const Home = () => {
	// State to store the window width and events display count
	const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
	const [eventsTotal, setEventsTotal] = useState<number>(4);

	useEffect(() => {
		// Function to update state with new window size
		const handleResize = () => {
			const width = window.innerWidth;
			setInnerWidth(width);

			// Update the eventsTotal based on window width
			if (width <= 640) {
				setEventsTotal(4); // Small screens
			} else if (width <= 950) {
				setEventsTotal(6); // Medium screens
			} else if (width <= 1280) {
				setEventsTotal(8); // Large screens
			} else {
				setEventsTotal(10); // Extra large screens
			}
		};

		// Add resize event listener
		window.addEventListener('resize', handleResize);

		handleResize();

		// Cleanup on component unmount
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<>
			<div className=' pt-14 min-h-screen w-[90dvw] lg:w-[80dvw] bg-slate-50 mx-auto'>
				<Categories />
				<header className='mt-[4rem] pb-10 '>
					<Header />
				</header>
				<SectionWrapper>
					<TitleHeader url='/events/explore?location=westen-cape' />
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:items-start justify-center'>
						{eventslist.slice(0, eventsTotal).map((event) => (
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
				</SectionWrapper>
				<CategorySection
					title=' Professional events'
					url='/events/explore?cat=professional'
					categoryId='Technology'
				/>
			</div>
		</>
	);
};

export default Home;
