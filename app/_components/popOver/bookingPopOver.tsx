'use client';

import {
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';

import React from 'react';
import BookingForm, { CancelForm } from './bookingForm';
import { DeleteForm } from './deletePopover';

type BookingProps = {
	title?: string;
	type?: 'cancel' | 'delete' | '' | undefined;
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
					<BookingForm />
				)}
			</DialogContent>
		</>
	);
};

export default BookingPopover;
