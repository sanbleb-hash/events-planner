'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { auth } from '@/db/firebase';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { GrGoogle } from 'react-icons/gr';
import { toast } from 'react-toastify';

type Props = {
	isSignUp: boolean;
};

const GoogleLogin = ({ isSignUp }: Props) => {
	const handleGoogleLogin = async () => {
		const googleProvider = new GoogleAuthProvider();

		try {
			const credentials = await signInWithPopup(auth, googleProvider);
			const user = credentials.user;
			if (user) {
				toast.success(`Welcome, ${user.displayName || 'user'}!`);
			}
			console.log('User:', user);
		} catch (error: unknown) {
			toast.error('Google login failed. Please try again.');
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
