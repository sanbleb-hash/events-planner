import { Button } from '@/components/ui/button';
import React from 'react';
import { FaArrowDown } from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { GrLocationPin } from 'react-icons/gr';
import { IoLocation } from 'react-icons/io5';

type Props = {};

const Header = (props: Props) => {
	return (
		<div
			className="relative  w-full min-h-[40dvh] rounded-md overflow-hidden bg-[url('https://plus.unsplash.com/premium_photo-1712029146082-3faa70d0144c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMDR8fHxlbnwwfHx8fHw%3D')] bg-no-repeat bg-cover lg:bg-center z-30 flex items-center justify-between p-4
    "
		>
			<div className='before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r from-white/15 to-black/50  before:bg-center before:bg-cover' />
			<div className=' flex items-center justify-center lg:items-start lg:justify-start flex-col flex-1 gap-5 z-20'>
				<h1 className=' text-gray-200 text-4xl'>
					Best events in <br />
					<span className=' text-4xl font-bold'>Western Cape</span>
				</h1>
				<p className=' p-5 lg:p-0  lg:pt-5 text-gray-300 '>
					Looking for things to do in Western Cape? Whether you're a local, new
					in town or just cruising through we've got loads of great tips and
					events. You can explore by location, what's popular, our top picks,
					free stuff... you got this. Ready?
				</p>
				<Button
					variant='destructive'
					className=' flex items-center gap-3 capitalize '
				>
					<IoLocation className=' text-lg' />
					westen cape <FaArrowDown />
				</Button>
			</div>
			<div className=' flex-1 hidden lg:block'></div>
		</div>
	);
};

export default Header;
