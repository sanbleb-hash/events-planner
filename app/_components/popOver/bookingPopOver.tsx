'use client';

import { DialogContent } from '@/components/ui/dialog';

import React from 'react';
import BookingForm from './bookingForm';
import { DeleteForm } from './deletePopover';
import { CancelForm } from './cancelBooking';

type BookingProps = {
	title?: string;
	type?: 'cancel' | 'delete' | 'book' | '' | undefined;
};

const BookingPopover = ({ title = 'booking form ', type }: BookingProps) => {
	return (
		<>
			<DialogContent>
				{type === 'cancel' ? (
					<CancelForm title={title} />
				) : type === 'delete' ? (
					<DeleteForm title={title} />
				) : (
					type === 'book' && <BookingForm />
				)}
			</DialogContent>
		</>
	);
};

export default BookingPopover;
