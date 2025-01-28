import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoLocation } from 'react-icons/io5';

type Props = {
	id?: number;
	imgUrl?: string;
	title?: string;
	date?: string;
	location?: string;
	venue?: string;
	charges?: string;
	priceType?: string;
	attendes?: number;
};

const EventCard = ({
	id,
	imgUrl,
	title,
	date,
	location,
	venue,
	charges,
	priceType,
}: Props) => {
	const img =
		imgUrl ||
		'https://plus.unsplash.com/premium_photo-1677341558055-832134a85ad6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGxhY2Vob2xkZXIlMjBpbWFnZXxlbnwwfHwwfHx8MA%3D%3D';
	return (
		<Link
			href={`/events/${id}`}
			className=' min-w-[180px] max-w-[350px] md:min-w-[200px] min-h-[280px] '
		>
			<Card className='min--w-[320px] md:min-w-[200px] h-[250px] flex flex-col gap-1 p-1 bg-red-50'>
				<div className=' w-full flex-1 overflow-hidden'>
					<Image
						src={img}
						alt='poster'
						width='180'
						height='180'
						className=' w-full h-full object-cover rounded-lg'
					/>
				</div>
				<CardContent className='  flex items-start flex-col space-y-[2px] px-1 py-2 overflow-hidden'>
					<p className=' text-sm lg:text-[16px] text-gray-600 truncate w-full'>
						{title}
					</p>
					<p className=' text-[8px] lg:text-sm  text-gray-500 flex items-center justify-between capitalize'>
						date: {date}{' '}
						{priceType === 'Paid' ? (
							<span>price:{charges}</span>
						) : priceType === 'Free' ? (
							<span>free</span>
						) : (
							<span>Invite only</span>
						)}
					</p>
					<p className=' text-[8px] lg:text-sm  text-gray-500 flex items-center justify-between capitalize truncate w-full'>
						{' '}
						city :{location}
					</p>
					<p className=' text-[8px] lg:text-sm  text-gray-500 flex items-center  capitalize truncate w-full  '>
						{' '}
						<IoLocation className=' text-lg' /> {venue}
					</p>
				</CardContent>
			</Card>
		</Link>
	);
};

export default EventCard;
