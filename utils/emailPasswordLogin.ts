import { auth } from '@/db/firebase';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
} from 'firebase/auth';

type LoginProps = {
	email: string;
	password: string;
	type: 'register' | 'signIn';
};

export const emailPasswordLogin = async ({
	email,
	password,
	type,
}: LoginProps): Promise<UserCredential['user']> => {
	try {
		let userCredential: UserCredential;

		// Determine the authentication flow based on the type
		if (type === 'signIn') {
			userCredential = await signInWithEmailAndPassword(auth, email, password);
		} else if (type === 'register') {
			userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
		} else {
			throw new Error(`Unsupported login type: ${type}`);
		}

		// Return the authenticated user object
		return userCredential.user;
	} catch (error: any) {
		// Log the error and throw a user-friendly message
		console.error('Authentication error:', error.message || error);

		const errorMessage =
			type === 'signIn'
				? 'Failed to sign in. Please check your email and password.'
				: 'Failed to register. Please try again later.';
		throw new Error(errorMessage);
	}
};
