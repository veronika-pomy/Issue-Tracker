import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppContainer from './AppContainer';
import QueryClientProvider from './QueryClientProvider';
import AuthProvider from './auth/Provider';
import ThemeContext from './context/useThemeContext';
import './globals.css';
import './theme-config.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter' 
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue tracker next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.variable}>
        <ThemeContext>
          <QueryClientProvider>
            <AuthProvider>
                <AppContainer children={children}/>
            </AuthProvider>
          </QueryClientProvider>
        </ThemeContext>
      </body>
    </html>
  )
}
