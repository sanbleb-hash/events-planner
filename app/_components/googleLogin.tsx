'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { auth, db } from '@/db/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GrGoogle } from 'react-icons/gr';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type Props = {
	isSignUp: boolean;
};

const GoogleLogin = ({ isSignUp }: Props) => {
	const router = useRouter();

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);

			const user = result.user;

			if (user) {
				const userRef = doc(db, 'users', user.uid);

				// Check if the user already exists
				const userDoc = await getDoc(userRef);

				if (!userDoc.exists()) {
					// Create a new user object
					const newUser = {
						userId: user.uid,
						username: user.displayName || 'Anonymous',
						email: user.email,
						avatar: user.photoURL || '',
						loginType: user.providerData[0]?.providerId || 'google',
					};

					// Save the new user to Firestore
					await setDoc(userRef, newUser);
				}

				// Success notification and redirect
				toast.success(`Welcome, ${user.displayName || 'User'}!`);
				router.push(`/profile/email=${user.email}`);
			}
		} catch (error: any) {
			console.error('Error during Google login:', error.message || error);
			toast.error('Failed to login with Google.');
		}
	};

	return (
		<Button
			type='button'
			className='w-full bg-gradient-to-r from-blue-500 to-red-500 via-yellow-300 text-gray-500 font-semibold hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:via-white delay-100 transition-all'
			onClick={handleGoogleLogin}
		>
			{isSignUp ? 'Sign Up' : 'Sign In'} with{' '}
			<GrGoogle className='text-blue-500 ml-2' />
		</Button>
	);
};

export default GoogleLogin;
