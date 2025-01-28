import Link from 'next/link';
import React from 'react';
import { IoMdArrowDropright, IoMdMore } from 'react-icons/io';
import DropdownOption from './popOver/dropdownOption';

const TitleHeader = ({
	title = 'Popular in Western Cape',
	url,
}: {
	title?: string;
	url?: string;
}) => {
	return (
		<div className='w-full  py-3 flex items-center justify-between'>
			<h3 className=' text-lg text-gray-400'>{title}</h3>
			<p className='text-gray-400'>
				<DropdownOption option='explore more' href={url}>
					<IoMdMore className='text-sm lg:hidden cursor-pointer' />
				</DropdownOption>
				{url && (
					<Link href={url} className='hidden lg:flex items-center gap-1'>
						explore more <IoMdArrowDropright className=' text-3xl' />
					</Link>
				)}
			</p>
		</div>
	);
};

export default TitleHeader;
