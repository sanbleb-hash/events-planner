'use client';

import {
	getAuth,
	isSignInWithEmailLink,
	signInWithEmailLink,
} from 'firebase/auth';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { auth } from '@/db/firebase';
import { useAuth } from '@/hooks/authContext';
import SectionWrapper from '@/app/_components/sectionWrapper';

type Props = {
	searchParams: { [key: string]: string };
};

const ProfileClient = ({ searchParams }: Props) => {
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		const handleSignIn = async () => {
			const email = searchParams.email;

			if (!email) {
				toast.error('Email address is missing.');
				return;
			}

			if (isSignInWithEmailLink(auth, window.location.href)) {
				try {
					// Complete sign-in
					const result = await signInWithEmailLink(
						auth,
						email,
						window.location.href
					);

					toast.success('Successfully signed in!');

					// Redirect or handle further logic
					router.push('/dashboard'); // Example redirect
				} catch (error: any) {
					toast.error('Sign-in failed. Please try again.');
					console.error('Error signing in:', error.message);
				}
			}
		};

		handleSignIn();
	}, [searchParams]);

	useEffect(() => {
		if (!user) router.push('/auth');
	}, []);

	return (
		<SectionWrapper>
			<h1 className='text-gray-500 text-3xl md:text-5xl mb-9 first-letter:capitalize text-center'>
				my Profile
			</h1>
			<div className=' min-h-[60vh] bg-black'></div>
		</SectionWrapper>
	);
};

export default ProfileClient;
