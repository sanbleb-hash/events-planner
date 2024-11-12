'use client';

import { Button } from '@/components/ui/button';
import { categories } from '@/libs/categoryList';
import Link from 'next/link';
import React, { useState } from 'react';

type Props = {};

const Categories = (props: Props) => {
	const [isCategoryListOpen, setIsCategoryListOpen] = useState<boolean>(false);
	return (
		<div className='mt-20 relative w-full lg:mt-10 pb-10 pl-32 lg:pl-40 flex items-center gap-3 overflow-auto '>
			<Button
				onClick={() => setIsCategoryListOpen((prev) => !prev)}
				type='button'
				variant='outline'
				className=' text-gray-500 text-sm lg:text-lg text-left self-end fixed left-8 lg:left-36 xl:left-48'
			>
				Categories
			</Button>

			{isCategoryListOpen
				? null
				: categories.map((cat) => (
						<Link
							className='  text-nowrap bg-slate-200 px-2 rounded-lg shadow-md text-gray-500 text-xs lg:text-sm mb-2'
							href={`/events/explore?cat=${cat}`}
							key={cat}
						>
							{cat}
						</Link>
				  ))}
		</div>
	);
};

export default Categories;
