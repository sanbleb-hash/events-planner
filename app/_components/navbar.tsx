'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

import { Search } from 'lucide-react';
import { ImLocation } from 'react-icons/im';

import { navListItems } from '@/libs/navLinks';
import SearchBox from './form-input';

const NavBar = () => {
	const pathname = usePathname();

	return (
		<nav className='min-h-[4rem] bg-slate-200 text-gray-500 flex items-center justify-center relative '>
			<div className=' w-[90%] md:w-[80%] h-full flex items-center justify-between mx-auto gap-4 md:gap-10 xl:gap-28  '>
				<h1 className=' text-lg text-red-400 font-bold '>eventPlanner</h1>

				<ul className=' flex items-center justify-between gap-3 flex-1 flex-col-reverse lg:flex-row h-[4rem] '>
					<div className=' absolute left-4 right-4 -bottom-14  lg:static lg:bottom-0 flex-1  xl:max-w-2xl bg-slate-400 py-3 rounded-3xl px-3 flex items-center justify-between h-[80%] '>
						<div className=' flex items-center gap-3'>
							<Search className=' text-xs' />
							<SearchBox type='text' />
						</div>
						<div className=' flex items-center justify-center gap-3 border-l-2 border-gray-500 pl-5'>
							<ImLocation className=' text-xl' />

							<SearchBox type='text' />
						</div>
						<Button className=' rounded-full h-full px-2 bg-rose-600 py-5 hover:bg-red-400'>
							<Search className=' text-sm' />
						</Button>
					</div>
					<li className=' flex items-center justify-between gap-3'>
						{navListItems.map((navLink) => {
							const isActive = pathname === navLink.link;
							return (
								<Link
									className={clsx(
										'text-sm capitalize hover:opacity-85 hover:scale-x-105 p-2 transition-all',
										isActive && 'text-slate-400 border-r-2 border-rose-300 '
									)}
									key={navLink.title}
									href={navLink.link}
								>
									{navLink.title}
								</Link>
							);
						})}
						<Button
							className=' bg-rose-700 hover:bg-rose-900 transition-all
                  '
						>
							{' '}
							get started
						</Button>
					</li>
				</ul>
			</div>
		</nav>
	);
};

export default NavBar;
