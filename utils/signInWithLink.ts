'use server';

import { auth } from '@/db/firebase';
import { sendSignInLinkToEmail } from 'firebase/auth';

// Function to send sign-in link
export const sendLink = async (email: string): Promise<void> => {
	// Define your action code settings
	const actionCodeSettings = {
		url: `${process.env.NEXT_PUBLIC_BASE_URL}/events/profile`,
		handleCodeInApp: true,
	};

	try {
		// Send the sign-in link to the user's email
		const user = await sendSignInLinkToEmail(auth, email, actionCodeSettings);

		console.log('Sign-in link sent to email:', user);
	} catch (error: any) {
		// Log the error
		console.error('Error sending sign-in link:', error.code, error.message);
		throw new Error(error.message);
	}
};
