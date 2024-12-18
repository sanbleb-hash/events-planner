'use client';

import { onEventDelete } from '@/actions/onDeleteEvent';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { Button } from '@/components/ui/button';
import Loading from '../loading/loading';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

type FormProps = {
	title: string;
};

export const DeleteForm = ({ title }: FormProps) => {
	// Get event ID from the route parameters
	const params = useParams();
	const router = useRouter();
	const eventId = params?.id as string;

	const [isDeleting, setIsDeleting] = useState(false);

	// Delete event handler
	const handleDeleteEvent = async () => {
		setIsDeleting(true);
		try {
			if (!eventId) {
				toast.error('Event ID is missing.');
				return;
			}
			await onEventDelete(eventId);
			toast.success('Event successfully deleted!');
			router.push(`/create-event`);
		} catch (error) {
			console.error('Error deleting event:', error);
			toast.error('Something went wrong. Please try again.');
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className='w-full max-w-lg mx-auto'>
			<DialogHeader>
				<DialogTitle className='text-xl text-gray-500 capitalize leading-6 tracking-wider text-center mb-4'>
					{title}
				</DialogTitle>
			</DialogHeader>
			<Button
				onClick={handleDeleteEvent}
				disabled={isDeleting}
				className='w-full mt-4 capitalize flex items-center gap-2'
			>
				{isDeleting ? (
					<span className='flex items-center gap-2'>
						Deleting... <Loading />
					</span>
				) : (
					'Confirm Delete'
				)}
			</Button>
		</div>
	);
};
