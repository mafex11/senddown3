import './globals.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ThemeProvider } from "../components/theme-provider"

export const metadata = {
  title: 'Send up',
  description: 'Share files easily without BS',
  icons: {
    icon: '/Flow.png', // Update this to your favicon path
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ErrorBoundary>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}