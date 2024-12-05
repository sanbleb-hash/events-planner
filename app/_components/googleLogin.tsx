'use client';

import { Button } from '@/components/ui/button';
import { auth } from '@/db/firebase';
import { registerUserToDB } from '@/utils/registerUserToDB';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { GrGoogle } from 'react-icons/gr';
type Props = {
	isSignUp: boolean;
};

const GoogleLogin = ({ isSignUp }: Props) => {
	const handleGoogleLogin = async () => {
		const googleProvider = new GoogleAuthProvider();

		try {
			const credentials = await signInWithPopup(auth, googleProvider);
			const user = credentials?.user;
			await registerUserToDB(user);
			console.log(user);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Button
			type='button'
			className='w-full bg-gradient-to-r from-blue-500 to-red-500 via-yellow-300 text-gray-500 font-semibold hover:bg-gradient-to-r hover:from-red-500 hover:to-blue-500 hover:via-white delay-100 transition-all'
			onClick={handleGoogleLogin}
		>
			{isSignUp ? 'Sign In' : 'Sign Up'} with{' '}
			<p className=' text-blue-500'>
				<GrGoogle />
			</p>
		</Button>
	);
};

export default GoogleLogin;
