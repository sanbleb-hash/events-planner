'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { auth } from '@/db/firebase';
import FormFieldInput from '../formField';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { bookingSchema } from '@/schemas/bookingSchema';
import { onBooking } from '@/actions/onBooking';
import { useParams, useRouter } from 'next/navigation';
import { onCancelBooking } from '@/actions/onCancelBooking';
import Loading from '../loading/loading';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

const BookingForm: React.FC = () => {
	// Get event ID from the route parameters
	const params = useParams();
	const router = useRouter();
	const eventId = params?.id as string;

	// Get current user details
	const currentUser = auth.currentUser;

	// React Hook Form setup
	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			email: '',
			name: '',
			phoneNumber: '',
		},
	});

	// Set initial values dynamically based on current user
	React.useEffect(() => {
		if (currentUser) {
			form.reset({
				email: currentUser.email || '',
				name: currentUser.displayName || '',
				phoneNumber: currentUser.phoneNumber || '',
			});
		}
	}, [currentUser, form]);

	const [isSubmitting, setIsSubmitting] = React.useState(false);

	// Handle form submission
	const dataOnSubmit = async (data: z.infer<typeof bookingSchema>) => {
		setIsSubmitting(true);
		try {
			if (!eventId) {
				toast.error('Event ID is missing.');
				return;
			}
			await onBooking(data, eventId);
			toast.success('Booking successfully submitted!');
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
			<h2 className='text-2xl font-bold text-center mb-4'>Booking Form</h2>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(dataOnSubmit)} className='space-y-4'>
					{/* Name Field */}
					<FormFieldInput
						name='name'
						type='text'
						placeholder='e.g. Harriet Phikisa'
						title='Name'
					/>

					{/* Phone Number Field */}
					<FormFieldInput
						name='phoneNumber'
						type='text'
						placeholder='e.g. 078 123 1234'
						title='Phone Number'
					/>

					{/* Email Field */}
					<FormFieldInput
						name='email'
						type='email'
						placeholder='e.g. zenk@gmail.com'
						title='Email'
					/>

					{/* Submit Button */}
					<Button type='submit' disabled={isSubmitting} className='w-full mt-4'>
						{isSubmitting ? 'Submitting...' : 'Book'}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

type FormProps = {
	title: string;
};

export const CancelForm = ({ title }: FormProps) => {
	// Get event ID from the route parameters
	const params = useParams();
	const router = useRouter();
	const eventId = params?.id as string;

	// Get current user details
	const currentUser = auth.currentUser;

	// React Hook Form setup
	const form = useForm<z.infer<typeof bookingSchema>>({
		resolver: zodResolver(bookingSchema),
		defaultValues: {
			email: '',
		},
	});

	// Set initial values dynamically based on current user
	React.useEffect(() => {
		if (currentUser) {
			form.reset({
				email: currentUser.email || '',
			});
		}
	}, [currentUser, form]);

	const [isSubmitting, setIsSubmitting] = React.useState(false);

	// Handle form submission
	const handleCancelAppointment = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault();
		const email = currentUser?.email;
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

export default BookingForm;
