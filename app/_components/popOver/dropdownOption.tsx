'use client';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import React from 'react';

type Props = {
	children: React.ReactNode;
	title?: string;
	option?: string;
	href?: string;
};

const DropdownOption = ({ children, title, option, href }: Props) => {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className=' flex flex-col'>
				<span
					className=' text-xs text-gray-500 cursor-pointer'
					onClick={() => router.push(`${href}`)}
				>
					{option}
				</span>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropdownOption;
