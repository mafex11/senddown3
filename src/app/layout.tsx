import './globals.css';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { ThemeProvider } from "../components/theme-provider"

export const metadata = {
  title: 'File Sharing App',
  description: 'Share files easily with rooms',
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