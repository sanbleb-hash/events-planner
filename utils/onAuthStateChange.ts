import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { redirect } from 'next/navigation';

const auth = getAuth();
export const isUserSignedIn = onAuthStateChanged(auth, (user) => {
	if (user) {
		redirect(`/auth/profile?email=${user?.email}`);
		return user;

		// ...
	} else {
		redirect('/auth');
	}
});
