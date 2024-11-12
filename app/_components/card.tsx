import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import React from 'react';
import { IoLocation } from 'react-icons/io5';

type Props = {
	imgUrl?: string;
	title?: string;
	date?: string;
	time?: string;
	location?: string;
	venue?: string;
	charges?: string;
	priceType?: string;
	attendes?: number;
};

const EventCard = ({
	imgUrl,
	title,
	date,
	time,
	location,
	venue,
	charges,
	attendes,
	priceType,
}: Props) => {
	return (
		<>
			<Card className='w-full md:max-w-[350px] flex flex-col gap-1 p-1 bg-red-50'>
				<div className=' w-full h-[200px] overflow-hidden'>
					{imgUrl && (
						<Image
							src={imgUrl}
							alt='poster'
							width='350'
							height='220'
							className=' w-full h-full object-cover rounded-lg'
						/>
					)}
				</div>
				<CardContent className='  flex items-start flex-col space-y-1 px-1 py-2 overflow-hidden'>
					<p className=' text-sm lg:text-[16px] text-gray-600 truncate w-full'>
						{title}
					</p>
					<p className=' text-xs lg:text-sm  text-gray-500 flex items-center justify-between capitalize'>
						date: {date}{' '}
						{priceType === 'Paid' ? (
							<span>price:{charges}</span>
						) : priceType === 'Free' ? (
							<span>free</span>
						) : (
							<span>Invite only</span>
						)}
					</p>
					<p className=' text-xs lg:text-sm  text-gray-500 flex items-center justify-between capitalize truncate w-full'>
						{' '}
						city :{location}
					</p>
					<p className=' text-xs lg:text-sm  text-gray-500 flex items-center  capitalize truncate w-full  '>
						{' '}
						<IoLocation className=' text-lg' /> {venue}
					</p>
					<p className=' text-xs lg:text-sm  text-gray-500 flex items-center justify-between capitalize truncate w-full'>
						{' '}
						Booked by : {attendes} more and counting{' '}
					</p>
				</CardContent>
			</Card>
		</>
	);
};

export default EventCard;
