'use client';

import { Button } from '@/components/ui/button';
import { categories } from '@/libs/categoryList';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdKeyboardArrowRight, MdOutlineClose } from 'react-icons/md';

const Categories = () => {
	const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

	const toggleCategoryList = () => setIsCategoryListOpen((prev) => !prev);

	return (
		<div className='relative w-full mt-5 flex items-center gap-3 overflow-auto py-5 rounded-e-md'>
			<Button
				variant='outline'
				onClick={toggleCategoryList}
				className='text-gray-500 text-sm lg:text-lg capitalize py-2 px-3 text-left self-end '
			>
				Categories
				{isCategoryListOpen ? (
					<MdOutlineClose className=' text-3xl text-gray-400' />
				) : (
					<MdKeyboardArrowRight className=' text-3xl text-gray-400' />
				)}
			</Button>

			{isCategoryListOpen && (
				<div className='flex gap-2 py-2 px-4 bg-slate-100'>
					{categories.map((category) => (
						<Link
							href={`/events/explore?category=${category}`}
							key={category}
							className='text-nowrap bg-slate-200 px-3 py-1 rounded-lg shadow-md text-gray-400 text-xs lg:text-sm'
						>
							{category}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default Categories;
