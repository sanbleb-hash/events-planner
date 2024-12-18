'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import GoogleLogin from '@/app/_components/googleLogin';
import { UserInfo } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/db/firebase';
import { emailPasswordLogin } from '@/utils/emailPasswordLogin';

import { useAuth } from '@/hooks/authContext';
import Loading from '@/app/_components/loading/loading';

const Auth = () => {
	const router = useRouter();

	const { user, setUser } = useAuth();

	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isRegister, setIsRegister] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<UserInfo | null>(
		auth.currentUser || null
	);

	// Handle login and registration form submission
	const handleFormLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!email.trim()) {
			toast.error('Please enter a valid email address.');
			return;
		}
		if (!password) {
			toast.error('Please enter a password.');
			return;
		}

		setLoading(true);

		try {
			const userInfo = await emailPasswordLogin({
				email,
				password,
				type: isRegister ? 'signIn' : 'register',
			});
			setUser(userInfo!);
			localStorage.setItem('userInfo', JSON.stringify(user));

			toast.success(
				isRegister ? 'Successfully signed in!' : 'Registration successful!'
			);
		} catch (error: any) {
			toast.error('Something went wrong! Please try again.');
			console.error('Error sending sign-in link:', error.message || error);
		} finally {
			setLoading(false);
		}
	};

	// Toggle between sign up and sign in
	const toggleRegisterState = () => {
		setIsRegister((prev) => !prev);
	};

	useEffect(() => {
		if (user || currentUser)
			router.push(`/profile?email=${user ? user?.email : currentUser?.email}`);
	}, [router, user]);

	return (
		<div className='w-full min-h-[60vh] flex items-center justify-center flex-col space-y-8'>
			<h1 className='text-gray-500 text-3xl md:text-5xl mb-9 first-letter:capitalize text-center'>
				Hie, you can {isRegister ? 'sign in' : 'sign up'} here to get started
			</h1>
			<p className='text-gray-500 text-sm md:text-lg first-letter:capitalize text-center'>
				{isRegister ? "don't have an account?" : 'already have an account?'}
				<span
					className='text-rose-300 underline cursor-pointer hover:text-rose-200 pl-3'
					onClick={toggleRegisterState}
				>
					{isRegister ? 'Sign up' : 'Sign in'}
				</span>
			</p>
			<div className='w-1/2 flex flex-col gap-4'>
				<form onSubmit={handleFormLogin} className='space-y-4 w-full'>
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
					<label
						htmlFor='password'
						className='block text-sm font-medium text-gray-700'
					>
						Enter your password
					</label>
					<Input
						id='password'
						type='password'
						placeholder='********'
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setPassword(e.target.value)
						}
						className='w-full'
					/>
					<Button type='submit' className='w-full'>
						{loading ? <Loading /> : isRegister ? 'Sign In' : 'Sign Up'}
					</Button>
				</form>
				<p className='text-center capitalize'>or</p>
				<GoogleLogin isSignUp={isRegister} />
			</div>
		</div>
	);
};

export default Auth;
