// context/authContext.tsx
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/db/firebase'; // Firebase auth
import { onAuthStateChanged, User } from 'firebase/auth';

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
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser); // Update user state
			if (currentUser) {
				// Save user info to localStorage when user logs in
				localStorage.setItem('userInfo', JSON.stringify(currentUser));
			} else {
				// Remove user info from localStorage when logged out
				localStorage.removeItem('userInfo');
			}
		});

		return () => unsubscribe(); // Cleanup listener on unmount
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
