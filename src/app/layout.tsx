import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/error-boundary";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'DevTrip: 당신의 DevOps 세계 일주',
  description: '전 세계를 여행하며 미션을 완료하여 DevOps를 배우는 인터랙티브 플랫폼입니다.',
  keywords: ['DevOps', '학습', '미션', '여행', 'Docker', 'Kubernetes', 'ArgoCD', 'Helm', 'Kafka'],
  authors: [{ name: 'DevTrip Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'DevTrip: 당신의 DevOps 세계 일주',
    description: '전 세계를 여행하며 미션을 완료하여 DevOps를 배우는 인터랙티브 플랫폼입니다.',
    type: 'website',
    locale: 'ko_KR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#1e40af" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Toaster />
      </body>
    </html>
  );
}
