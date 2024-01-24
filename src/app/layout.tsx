import { ThemeProvider } from '@/client/providers/theme-provider';
import { TRPCReactProvider } from '@/client/providers/trpc-react-provider';
import { Toaster } from '@/components/ui/sonner';
import '@/styles/main.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Compile Code - Home',
	description: 'A Next.js app with typescript used to compile and execute different languages',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<TRPCReactProvider>
					<ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
						{children}
						<Toaster />
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
