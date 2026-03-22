import React from 'react';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { FloatingChatButton } from '@/components/features/FloatingChatButton';
import { AIChatAssistant } from '@/components/features/ai/AIChatAssistant';
import '@/globals.css';
import AuthProvider from '@/components/providers/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EduPlatform | AI-First Student Intelligence',
  description: 'Enterprise-grade global student intelligence and university discovery platform.',
  openGraph: {
    title: 'EduPlatform',
    description: 'AI-First Student Intelligence',
    url: 'https://eduplatform.example.com',
    siteName: 'EduPlatform',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased selection:bg-brand-primary/20 selection:text-brand-primary">
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'EduPlatform',
              url: 'https://eduplatform.example.com',
              logo: 'https://eduplatform.example.com/logo.png',
              sameAs: [
                'https://twitter.com/eduplatform',
                'https://linkedin.com/company/eduplatform',
              ],
            }),
          }}
        />
        <FloatingChatButton />
        <AIChatAssistant />
      </body>
    </html>
  );
}
