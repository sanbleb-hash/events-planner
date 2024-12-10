// context/authContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/db/firebase'; // Firebase auth
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

type AuthContextType = {
	user: User | null;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	// Check if there's user info in localStorage and parse it
	const [user, setUser] = useState<User | null>(() => {
		const savedUser = localStorage.getItem('userInfo');
		return savedUser ? JSON.parse(savedUser) : null; // Parse the JSON or return null if not found
	});

	useEffect(() => {
		const handleAuthStateChanged = async (currentUser: User | null) => {
			setUser(currentUser);

			if (currentUser) {
				try {
					const userRef = doc(db, 'users', currentUser.uid);
					const userDoc = await getDoc(userRef);

					if (!userDoc.exists()) {
						// Create a new user object
						const newUser = {
							userId: currentUser.uid,
							username: currentUser.displayName || 'Anonymous',
							email: currentUser.email,
							avatar: currentUser.photoURL || '',
							loginType:
								currentUser.providerData[0]?.providerId || 'self typed',
						};

						// Save the new user to Firestore
						await setDoc(userRef, newUser);
					}

					// Save user info to localStorage
					localStorage.setItem('userInfo', JSON.stringify(currentUser));
				} catch (error: any) {
					console.error('Error handling user data:', error.message || error);
				}
			} else {
				// Remove user info from localStorage when logged out
				localStorage.removeItem('userInfo');
			}
		};

		const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);

		return () => {
			// Cleanup listener on unmount
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
