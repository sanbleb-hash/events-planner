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

import Loading from '../loading/loading';

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
						{isSubmitting ? (
							<>
								Submitting...
								<Loading />
							</>
						) : (
							'Book'
						)}
					</Button>
				</form>
			</FormProvider>
		</div>
	);
};

export default BookingForm;
