import { eventslist } from '@/libs/eventsList';
import Link from 'next/link';
import React from 'react';

type Props = {};

const Footer = (props: Props) => {
	const date = new Date();
	const thisYear = date.getFullYear();
	return (
		<footer className='min-h-[15rem] bg-rose-200 p-10 h-auto flex flex-col justify-between'>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 items-center justify-start flex-wrap gap-2'>
				{eventslist.map((eventCat) => (
					<Link
						href={`/events/explore?cat=${eventCat.title}`}
						className=' text-xs md:text-sm text-muted-foreground'
						key={eventCat.id}
					>
						{eventCat.title}
					</Link>
				))}
			</div>
			<p className='text-gray-500 text-xs self-end mt-4'>
				&copy; san bleb {thisYear}
			</p>
		</footer>
	);
};

export default Footer;
