import React from 'react';
import { TEST_DATA } from '@/lib/services/test-data';
import TestDetailClient from './TestDetailClient';
import { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const name = params.slug.toUpperCase();
  const title = `${name} Test Preparation & Score Guide | EduPlatform`;
  const description = `Comprehensive guide for ${name}. Understand the test structure, scoring system, validity, and universities accepting ${name}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://eduplatform.example.com/tests/${params.slug}`,
      siteName: 'EduPlatform',
    }
  };
}

export default function TestDetailPage({ params }: Props) {
  const { slug } = params;

  return <TestDetailClient slug={slug} />;
}
