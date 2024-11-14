'use client';

import { Button } from '@/components/ui/button';
import { categories } from '@/libs/categoryList';
import Link from 'next/link';
import React, { useState } from 'react';
import { MdKeyboardArrowRight, MdOutlineClose } from 'react-icons/md';

type Props = {};

const Categories = (props: Props) => {
	const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

	const toggleCategoryList = () => setIsCategoryListOpen((prev) => !prev);

	return (
		<div className='relative w-full mt-20 flex items-center gap-3 overflow-auto py-6 rounded-e-md'>
			<Button
				variant='outline'
				onClick={toggleCategoryList}
				className={`text-gray-500 text-sm lg:text-lg capitalize py-2 text-left self-end ${
					isCategoryListOpen
						? 'fixed left-12 lg:left-28 xl:left-48 top-32 lg:top-28'
						: 'absolute left-5 top-3'
				}`}
			>
				Categories
				{isCategoryListOpen ? (
					<MdOutlineClose className='pl-2 text-3xl text-gray-400' />
				) : (
					<MdKeyboardArrowRight className='pl-2 text-3xl text-gray-400' />
				)}
			</Button>

			{isCategoryListOpen && (
				<div className='flex gap-2 py-5 px-4 bg-slate-100'>
					{categories.map((cat) => (
						<Link
							href={`/events/explore?cat=${cat}`}
							key={cat}
							className='text-nowrap bg-slate-200 px-3 py-1 rounded-lg shadow-md text-gray-400 text-xs lg:text-sm'
						>
							{cat}
						</Link>
					))}
				</div>
			)}
		</div>
	);
};

export default Categories;
