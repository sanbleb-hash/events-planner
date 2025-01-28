'use client';

import SectionWrapper from '@/app/_components/sectionWrapper';
import { Button } from '@/components/ui/button';
import { auth } from '@/db/firebase';
import Image from 'next/image';
import { MdShare } from 'react-icons/md';
import React, { useEffect, useState } from 'react';
import EditToggle from './_editToggle';
import { getEventById } from '@/actions/getEventById';
import BookingPopover from '@/app/_components/popOver/bookingPopOver';
import { Popover } from '@/components/ui/popover';
import { PopoverTrigger } from '@radix-ui/react-popover';
import PopoverComponent from '@/app/_components/popOver/popover';

import { toast } from 'react-toastify';
import { DocumentData } from 'firebase/firestore';
import { Dialog } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import { SkeletonLoader } from '@/components/ui/loaderSkeleton';

type Props = { params: { id: string } };

const EventPage = ({ params: { id } }: Props) => {
	const [event, setEvent] = useState<DocumentData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const currentUser = auth.currentUser;

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const doc = await getEventById(id);
				if (doc) setEvent(doc);
			} catch (e) {
				toast.error('Failed to load event data');
			} finally {
				setLoading(false);
			}
		};

		fetchEvent();

		return () => {
			setEvent(null); // Clean up the event data if needed
		};
	}, [id]);

	if (loading) {
		return (
			<SectionWrapper>
				<SkeletonLoader type='event' />
			</SectionWrapper>
		);
	}

	if (!event) {
		return (
			<SectionWrapper>
				<p>No event found</p>
			</SectionWrapper>
		);
	}

	// Function to convert time to AM/PM format
	const convertTimeToAmPm = (time: string) => {
		const [hours] = time.split(':');
		return Number(hours) >= 12 ? 'PM' : 'AM';
	};

	// Format price
	const formatPrice = (price: number): string => price.toFixed(2);

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

	const isBookedAlready = attendants?.some(
		(attendant: { email: string }) => attendant.email === currentUser?.email
	);

	const type = isBookedAlready ? 'cancel' : isBookedAlready ? 'delete' : 'book';
	const headerTitle = isBookedAlready
		? 'Are you sure you don’t want to attend this event anymore?'
		: '';

	return (
		<SectionWrapper>
			<section className='grid grid-cols-1 lg:grid-cols-3 gap-3 relative'>
				<article className='col-span-3 lg:col-span-2'>
					<h1 className='text-start text-4xl lg:text-6xl capitalize text-gray-500 pb-5'>
						{title}
					</h1>

					<div>
						<EditToggle imageUrl={imageUrl} creatorId={creatorId} />
					</div>

					<figure className='w-full bg-slate-200 p-3 rounded-md overflow-hidden flex flex-col items-start justify-start'>
						<div className='w-full overflow-hidden rounded-lg'>
							<Image
								src={imageUrl}
								alt='Event Image'
								height={250}
								width={360}
								className='w-full object-cover'
							/>
						</div>

						<figcaption className='w-full rounded-lg flex flex-col items-start py-3'>
							<p className='text-lg'>
								Organized by:{' '}
								<span className='text-muted-foreground pl-2'>{organizer}</span>
							</p>
							<p className='text-lg'>
								Happening on:{' '}
								<span className='text-muted-foreground pl-2'>
									{date}, {time} {convertTimeToAmPm(time)}
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
									ZAR
								</span>
							</p>

							<p className='text-lg py-2 bg-slate-100 px-3 mt-4 rounded-md text-gray-500 text-start'>
								{description}
							</p>

							<div className='flex items-center justify-end w-full mt-10 gap-5'>
								{priceType !== 'Invite Only' && (
									<Dialog>
										<DialogTrigger>
											<Button
												className={`bg-red-400 hover:bg-rose-500 disabled:bg-rose-300 disabled:cursor-not-allowed text-white`}
											>
												{isBookedAlready
													? 'Cancel Appointment'
													: 'Book Appointment'}
											</Button>
										</DialogTrigger>
										<>
											<BookingPopover type={type} title={headerTitle} />
										</>
									</Dialog>
								)}
								<Popover>
									<PopoverTrigger>
										<Button variant='ghost' className='text-2xl'>
											<MdShare />
										</Button>
									</PopoverTrigger>
									<PopoverComponent type='shareLinks' />
								</Popover>
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
