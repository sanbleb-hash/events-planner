'use client';

import { onCancelBooking } from '@/actions/onCancelBooking';
import { DialogHeader } from '@/components/ui/dialog';
import { useAuth } from '@/hooks/authContext';
import { bookingSchema } from '@/schemas/bookingSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import FormFieldInput from '../formField';
import { Button } from '@/components/ui/button';
import Loading from '../loading/loading';

export const CancelForm = ({ title }: { title: string }) => {
	// Get event ID from the route parameters
	const params = useParams();
	const router = useRouter();
	const eventId = params?.id as string;

	// Get current user details
	const currentUser = useAuth();

	// React Hook Form setup
	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			email: '',
		},
	});

	// Set initial values dynamically based on current user
	useEffect(() => {
		if (currentUser) {
			form.reset({
				email: currentUser?.user?.email || '',
			});
		}
	}, [currentUser, form]);

	const [isSubmitting, setIsSubmitting] = useState(false);

	// Handle form submission
	const handleCancelAppointment = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const email = currentUser?.user?.email;
		setIsSubmitting(true);
		try {
			if (!eventId) {
				toast.error('Event ID is missing.');
				return;
			}
			if (email) await onCancelBooking(email, eventId);
			toast.success('Booking successfully cancelled!');
			router.refresh();
		} catch (error) {
			console.error('Error submitting booking:', error);
			toast.error('Something went wrong. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};
	return (
		<div className='w-full max-w-lg mx-auto'>
			<DialogHeader>
				<DialogTitle className='text-xl text-gray-500 capitalize leading-6 tracking-wider  text-center mb-4'>
					{title}
				</DialogTitle>
			</DialogHeader>
			<FormProvider {...form}>
				<form onSubmit={handleCancelAppointment} className='space-y-4'>
					{/* Email Field */}
					<FormFieldInput
						name='email'
						type='email'
						placeholder='e.g. zenk@gmail.com'
						title='Email'
					/>

					{/* Submit Button */}
					<Button
						type='submit'
						disabled={isSubmitting}
						className='w-full mt-4 capitalize flex items-center gap-2'
					>
						{isSubmitting ? (
							<span className=' flex items-center gap-2'>
								cancelling... <Loading />
							</span>
						) : (
							'confirm cancel'
						)}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};
