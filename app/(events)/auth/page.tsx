'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sendLink } from '@/utils/signInWithLink';
import { toast } from 'react-toastify';
import GoogleLogin from '@/app/_components/googleLogin';

const Auth = () => {
	const [email, setEmail] = useState<string>('');
	const [isSignUp, setIsRegister] = useState<boolean>(false);

	const handleGetLink = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email.trim()) {
			toast.error('Please enter a valid email address.');
			return;
		}

		try {
			await sendLink(email);
			toast.success('Check your email for the sign-in link.');
		} catch (error: any) {
			toast.error('Something went wrong! Please try again.');
			console.error('Error sending sign-in link:', error.message || error);
		}
	};

	const toggleRegisterState = () => {
		setIsRegister((prev) => !prev);
	};

	return (
		<div className='w-full min-h-[60vh] flex items-center justify-center flex-col space-y-8'>
			<h1 className='text-gray-500 text-3xl md:text-5xl mb-9 first-letter:capitalize text-center'>
				Hie, you can {isSignUp ? 'sign in' : 'sign up'} here to get started
			</h1>
			<p className='text-gray-500 text-sm md:text-lg first-letter:capitalize text-center'>
				{isSignUp ? "don't have an account  " : 'already have account'}?
				<span
					className='text-rose-300 underline cursor-pointer hover:text-rose-200 pl-3'
					onClick={toggleRegisterState}
				>
					{isSignUp ? 'sign up' : 'sign in'}
				</span>
			</p>
			<div className='w-1/2 flex flex-col gap-4'>
				<form onSubmit={handleGetLink} className='space-y-4 w-full'>
					<label
						htmlFor='email'
						className='block text-sm font-medium text-gray-700'
					>
						Enter your email
					</label>
					<Input
						id='email'
						type='email'
						placeholder='e.g., example@yahoomail.com'
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setEmail(e.target.value)
						}
						className='w-full'
					/>
					<Button type='submit' className='w-full'>
						{isSignUp ? 'Sign In' : 'Sign Up'}
					</Button>
				</form>
				<p className=' text-center capitalize'>or</p>
				<GoogleLogin isSignUp={isSignUp} />
			</div>
		</div>
	);
};

export default Auth;
