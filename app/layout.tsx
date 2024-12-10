import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './_components/navbar';
import Footer from './_components/footer';
import { AuthProvider } from '@/hooks/authContext';
const fredoko = Fredoka({
	subsets: ['hebrew'],
	weight: ['300', '400', '600'],
});

export const metadata: Metadata = {
	title: 'events app',
	description: 'create, manage and check out whats poping',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={fredoko.className}>
				<AuthProvider>
					<ToastContainer />
					<NavBar />

					<main className=' w-full min-h-screen bg-white'>{children}</main>
					<Footer />
				</AuthProvider>
			</body>
		</html>
	);
}
