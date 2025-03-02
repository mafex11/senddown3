import './globals.css';
import { ErrorBoundary } from './components/ErrorBoundary';

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
    <html lang="en">
      <body>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}