import SectionWrapper from '@/app/_components/sectionWrapper';
import { Button } from '@/components/ui/button';
import { db } from '@/db/firebase';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import Image from 'next/image';
import { MdShare } from 'react-icons/md';
import React from 'react';
import { getAuth } from 'firebase/auth';

import EditToggle from './_editToggle';
import { getEventById } from '@/actions/getEventById';
import BookingPopover from '@/app/_components/popOver/bookingPopOver';

type Props = { params: { id: string } };

const EventPage = async ({ params: { id } }: Props) => {
	const event = await getEventById(id);

	// Function to convert time to AM/PM format
	const convertTimeToMinutes = (time: string) => {
		const [hours] = time.split(':');
		return Number(hours) >= 12 ? 'PM' : 'AM';
	};

	const formatPrice = (price: number): string => {
		return price.toFixed(2); // Ensures the price is formatted to two decimal places
	};

	// Handle event rendering
	if (!event) {
		return (
			<SectionWrapper>
				<p>No event found</p>
			</SectionWrapper>
		);
	}

	// Destructuring event data
	const {
		title,
		imageUrl,
		organizer,
		date,
		time,
		attendants,
		venue,
		city,
		country,
		priceType,
		price,
		description,
		creatorId,
	} = event;

	// JSX rendering

	return (
		<SectionWrapper>
			<section className='grid grid-cols-1 lg:grid-cols-3 gap-3 relative'>
				<article className='col-span-3 lg:col-span-2'>
					<h1 className='text-start text-4xl lg:text-6xl capitalize text-gray-500 pb-5'>
						{title}
					</h1>
					<div>
						<EditToggle creatorId={creatorId} />
					</div>

					<figure className='w-full bg-slate-200 p-3 rounded-md overflow-hidden flex flex-col items-start justify-start'>
						<div className='w-full overflow-hidden rounded-lg'>
							<Image
								src={imageUrl}
								alt='event image'
								height={250}
								width={360}
								className='w-full object-cover'
							/>
						</div>

						<figcaption className='w-full rounded-lg flex flex-col items-start py-3'>
							{/* Event Details */}
							<p className='text-lg'>
								Organized by:{' '}
								<span className='text-muted-foreground pl-2'>{organizer}</span>
							</p>
							<p className='text-lg'>
								Happening on:{' '}
								<span className='text-muted-foreground pl-2'>
									{date}, {time} {convertTimeToMinutes(time)}
								</span>
							</p>
							<p className='text-lg'>
								So far confirmed:{' '}
								<span className='text-muted-foreground pl-2'>
									{attendants?.length} attendees
								</span>
							</p>
							<p className='text-lg'>
								Venue:{' '}
								<span className='text-muted-foreground pl-2'>{venue}</span>,{' '}
								<span className='text-muted-foreground pl-2'>
									{city}, {country}
								</span>
							</p>
							<p className='text-lg'>
								Entry:{' '}
								<span className='text-muted-foreground pl-2'>
									{priceType === 'Paid'
										? formatPrice(Number(price))
										: priceType}{' '}
									za
								</span>
							</p>

							<p className='text-lg py-2 bg-slate-100 px-3 mt-4 rounded-md text-gray-500 text-start'>
								{description}
							</p>

							<div className='flex items-center justify-end w-full mt-10 gap-5'>
								{priceType !== 'Invite Only' && (
									<BookingPopover>
										<Button className='bg-red-400 hover:bg-rose-500 text-white'>
											Book Appointment
										</Button>
									</BookingPopover>
								)}

								<Button variant='ghost' className='text-2xl'>
									<MdShare />
								</Button>
							</div>
						</figcaption>
					</figure>
				</article>

				{/* Sidebar with Similar Events */}
				<aside className='hidden lg:flex col-span-1 bg-slate-200 sticky top-0 flex-col gap-3 justify-evenly'>
					{[
						'Similar events in this area',
						'Similar events',
						'Similar events',
						'Similar events',
					].map((title, index) => (
						<div key={index} className='bg-slate-500 flex-1 rounded-md'>
							<h2>{title}</h2>
						</div>
					))}
				</aside>
			</section>
		</SectionWrapper>
	);
};

export default EventPage;
