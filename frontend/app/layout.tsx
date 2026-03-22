import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { FloatingChatButton } from '@/components/features/FloatingChatButton';
import { AIChatAssistant } from '@/components/features/ai/AIChatAssistant';
import '@/globals.css';
import AuthProvider from '@/components/providers/SessionProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'EAOverseas | Institutional Intelligence',
  description: 'Enterprise-grade global student intelligence and university discovery platform.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-brand-primary/20 selection:text-brand-primary`}>
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
              name: 'EAOverseas',
              url: 'https://eaoverseas.com',
              logo: 'https://eaoverseas.com/logo.png',
              sameAs: [
                'https://twitter.com/eaoverseas',
                'https://linkedin.com/company/eaoverseas',
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
