'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Props = {
	children: React.ReactNode;
	title?: string;
	option?: string;
	href?: string;
};

const DropdownOption: React.FC<Props> = ({ children, option, href }) => {
	const router = useRouter();

	// Handle navigation with a fallback for `href`
	const handleNavigation = () => {
		if (href) {
			router.push(href);
		} else {
			console.warn('No href provided for DropdownOption navigation');
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='flex flex-col'>
				{option && (
					<span
						className='text-xs text-gray-500 cursor-pointer hover:text-gray-700'
						onClick={handleNavigation}
					>
						{option}
					</span>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownOption;
