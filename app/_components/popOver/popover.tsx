'use client';

import React, { useState } from 'react';
import { PopoverContent } from '@/components/ui/popover';
import { socialShareLinks } from '@/libs/shareLinks';
import Link from 'next/link';
import { toast } from 'react-toastify';

type PopProps = { type: string };

const PopoverComponent = ({ type }: PopProps) => {
	const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

	const [isCopied, setIsCopied] = useState(false);

	const handleCopyLink = async (
		url: string,
		setIsCopied: React.Dispatch<React.SetStateAction<boolean>>
	) => {
		try {
			await navigator.clipboard.writeText(url);
			setIsCopied(true);
			toast.success('Link copied, ready to share!');
		} catch (err) {
			toast.error('Failed to copy the link. Please try again.' + err);
		}
	};

	{
		isCopied && toast.success('coppied');
	}

	return (
		<PopoverContent className='space-y-3'>
			{type === 'shareLinks' && (
				<div>
					{socialShareLinks?.map((link) => {
						const { name, icon: Icon, url } = link;
						const newUrl = `${url}${currentUrl}`;

						return (
							<div
								key={name}
								className='flex gap-2 hover:bg-transparent/10 text-gray-500 p-1'
							>
								{name === 'copy link' ? (
									<button
										onClick={() => handleCopyLink(currentUrl, setIsCopied)}
										className='flex gap-2 items-center cursor-pointer'
									>
										<Icon className='text-xl' />
										<span>{name}</span>
									</button>
								) : (
									<Link
										href={newUrl}
										target='_blank'
										className='flex gap-2 items-center'
									>
										<Icon className='text-xl' />
										<span>{name}</span>
									</Link>
								)}
							</div>
						);
					})}
				</div>
			)}
		</PopoverContent>
	);
};

export default PopoverComponent;
