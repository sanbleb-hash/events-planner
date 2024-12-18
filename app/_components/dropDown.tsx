'use client';

import React, { useState } from 'react';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useRouter } from 'next/navigation';

import { auth } from '@/db/firebase';
import Loading from './loading/loading';
type Props = {
	email: string | null | undefined;
	children: React.ReactNode;
};

const DropDown = ({ children, email }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		setLoading(true);
		try {
			await auth.signOut().then(() => {
				localStorage.removeItem('userInfo');
			});
			router.push('/'); // Redirect to login page
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				{loading ? <Loading /> : children}
			</DropdownMenuTrigger>
			<DropdownMenuContent className=' capitalize font-semibold bg-rose-200 text-gray-500'>
				<DropdownMenuItem
					className=' cursor-pointer'
					onClick={() => router.push(`/auth/profile?email=${email}`)}
				>
					Profile
				</DropdownMenuItem>
				<DropdownMenuItem onClick={handleClick} className=' cursor-pointer'>
					log out
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default DropDown;
