'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

import React from 'react';
import BookingContent from './bookingContent';

type BookingProps = {
	children: React.ReactNode;
	title?: string;
};

const BookingPopover = ({
	children,
	title = 'hie, reserving your sit starts here',
}: BookingProps) => {
	return (
		<>
			<Dialog>
				<DialogTrigger>{children}</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle className=' text-center text-muted-foreground text-xl lg:text-3xl capitalize'>
							{title}
						</DialogTitle>
					</DialogHeader>
					<BookingContent />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default BookingPopover;
