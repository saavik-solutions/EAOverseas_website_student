import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eduplatform.example.com';

  // In a real app, you would fetch these from MongoDB
  const dynamicRoutes = [
    { url: `${baseUrl}/discover/university-of-cambridge`, lastModified: new Date() },
    { url: `${baseUrl}/courses/msc-computer-science`, lastModified: new Date() },
    { url: `${baseUrl}/tests/ielts`, lastModified: new Date() }
  ];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/discover`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tests`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...dynamicRoutes
  ];
}
