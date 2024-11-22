'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { ImLocation } from 'react-icons/im';
import { FaBars } from 'react-icons/fa';

import { navListItems } from '@/libs/navLinks';
import SearchBox from './form-input';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { searchSchema } from '@/types/searchSchema';

// Define a schema with Zod
const NavBar = () => {
	const pathname = usePathname();
	const router = useRouter();

	// Set up react-hook-form
	const form = useForm<z.infer<typeof searchSchema>>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			searchTerm: '',
			location: '',
		},
	});

	// Handle form submission
	const onSubmit = (data: z.infer<typeof searchSchema>) => {
		const { searchTerm, location } = data;
		if (!data) return;
		// Create URL search parameters
		const params = new URLSearchParams();

		// Append search term and location only if they are present
		if (searchTerm) params.append('q', searchTerm);
		if (location) params.append('loc_q', location);

		// Push the new URL with the search parameters to the router
		router.push(`/search?${params.toString()}`);
	};

	return (
		<nav className='min-h-[4rem] bg-slate-200 text-gray-500 flex items-center justify-center shadow-xl z-50 fixed top-0 left-0 right-0'>
			<div className='w-[90%] lg:w-[80%] h-full flex items-center justify-between mx-auto gap-4 lg:gap-10 xl:gap-28'>
				<Link href='/' className='text-lg text-red-400 font-bold capitalize'>
					eventPlanner
				</Link>

				<ul className='flex items-center justify-between gap-3 flex-1 flex-col-reverse lg:flex-row h-[4rem]'>
					{/* Wrap form in FormProvider */}
					<FormProvider {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='absolute left-8 right-8 -bottom-14 lg:static lg:bottom-0 flex-1 xl:max-w-2xl bg-slate-400 py-3 rounded-3xl px-3 flex items-center justify-between h-[80%]'
						>
							<div className='flex items-center gap-3'>
								<Search className='text-xs' />
								{/* SearchBox for event search */}
								<SearchBox
									type='event'
									form={form}
									placeholder='Search event...'
								/>
							</div>

							<div className='flex items-center justify-center gap-3 border-l-2 border-gray-500 pl-5'>
								<ImLocation className='text-xl' />
								{/* SearchBox for location search */}
								<SearchBox
									type='location'
									placeholder='Search location...'
									form={form}
								/>
							</div>

							<Button
								className='rounded-full h-full w- px-3 bg-rose-500 py-5 hover:bg-red-400'
								type='submit'
							>
								<Search className='text-sm' />
							</Button>
						</form>
					</FormProvider>

					{/* Navigation Links */}
					<li className='flex items-center justify-center h-full gap-3 self-end'>
						{navListItems.map((navLink) => {
							const isActive = pathname === navLink.link;
							return (
								<Link
									className={clsx(
										'text-sm capitalize hover:opacity-85 hover:scale-x-105 p-2 transition-all hidden lg:flex',
										isActive && 'text-slate-400 border-r-2 border-rose-300'
									)}
									key={navLink.title}
									href={navLink.link}
								>
									{navLink.title}
								</Link>
							);
						})}
						<Button className='bg-rose-700 hover:bg-rose-900 transition-all'>
							Get Started
						</Button>
						<span className='text-lg text-muted-foreground lg:hidden hover:opacity-85 cursor-pointer p-4 hover:bg-slate-300 rounded-full'>
							<FaBars />
						</span>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
