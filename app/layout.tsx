import type { Metadata } from 'next';
import { Fredoka } from 'next/font/google';
import './globals.css';
import NavBar from './_components/navbar';
import Footer from './_components/footer';
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
				<NavBar />
				<main className=' w-full min-h-screen bg-white'>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
