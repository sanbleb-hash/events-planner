'use client';

import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
} from '@/components/ui/select';
import { MdArrowDropDown, MdArrowDropUp, MdArrowRight } from 'react-icons/md';
import { cn } from '@/lib/utils';
import { categories } from '@/libs/categoryList';
import { usePathname, useRouter } from 'next/navigation';

enum FilterType {
	Location = 'location',
	PriceType = 'priceType',
	Category = 'category',
}

const priceTypeList = ['free', 'paid', 'donation', 'invite-only'];

const FilterEvents: React.FC = () => {
	const [isFilterOn, setIsFilterOn] = useState(false);
	const [filterBy, setFilterBy] = useState<FilterType>(FilterType.Location);
	const [location, setLocation] = useState('');
	const [price_type, setPriceType] = useState('');
	const [category, setCategory] = useState('');

	const handleFilterToggle = () => setIsFilterOn((prev) => !prev);

	const router = useRouter();

	const pathname = usePathname();

	const searchParams = new URLSearchParams();
	useEffect(() => {
		if (location) searchParams.append('location', location);
		if (price_type) searchParams.append('priceType', price_type);
		if (category) searchParams.append('category', category);

		router.replace(`${pathname}?${searchParams.toString()}`);
	}, [location, price_type, category, router]);

	const renderFilterOptions = () => {
		if (filterBy === FilterType.Location) {
			return (
				<form className='flex w-full flex-col items-start gap-4'>
					<Label
						htmlFor='location'
						className='font-semibold text-gray-500 border-l border-gray-500 pl-3 capitalize'
					>
						Write city or country name
					</Label>
					<Input
						id='location'
						value={location}
						onChange={(e) => setLocation(e.target.value)}
						className='w-full h-8'
					/>
				</form>
			);
		}

		if (filterBy === FilterType.PriceType) {
			return (
				<div className='flex flex-col items-start bg-inherit/25 capitalize'>
					{priceTypeList.map((type) => (
						<p
							key={type}
							className='flex items-center gap-2 cursor-pointer'
							onClick={() => setPriceType(type)}
						>
							<MdArrowRight />
							{type}
						</p>
					))}
				</div>
			);
		}

		if (filterBy === FilterType.Category) {
			return (
				<Select onValueChange={(value) => setCategory(value)}>
					<SelectTrigger>Category</SelectTrigger>
					<SelectContent>
						{categories.map((category) => (
							<SelectItem key={category} value={category}>
								{category}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			);
		}

		return null;
	};

	return (
		<Popover>
			<PopoverTrigger onClick={handleFilterToggle}>
				<div className='space-y-2 border border-gray-400 px-4 py-1 rounded-lg flex items-center gap-3'>
					<h4 className='font-medium leading-none text-sm'>Filter by</h4>
					{isFilterOn ? (
						<MdArrowDropUp className='text-xl' />
					) : (
						<MdArrowDropDown className='text-xl' />
					)}
				</div>
			</PopoverTrigger>
			<PopoverContent className='w-80'>
				<div className='grid gap-4'>
					<div className='grid gap-2'>
						{Object.values(FilterType).map((type) => (
							<p
								key={type}
								className={cn(
									'cursor-pointer text-gray-400',
									filterBy === type &&
										'font-semibold text-gray-500 border-l border-gray-500 pl-3 capitalize'
								)}
								onClick={() => setFilterBy(type)}
							>
								{type}
							</p>
						))}
						{renderFilterOptions()}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default FilterEvents;
