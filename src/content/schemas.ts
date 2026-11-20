import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "headline": z.string(),
        "headlineAccent": z.string(),
        "subheadline": z.string(),
        "searchPlaceholder": z.string(),
        "ctaLabel": z.string()
      }),
      "stats": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      })),
      "categoriesHeading": z.string(),
      "categoriesSubheading": z.string(),
      "categories": z.array(z.object({
        "id": z.string(),
        "label": z.string(),
        "count": z.string()
      })),
      "featuredHeading": z.string(),
      "featuredSubheading": z.string(),
      "featuredListings": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "location": z.string(),
        "category": z.string(),
        "rating": z.string(),
        "reviews": z.string(),
        "description": z.string(),
        "badge": z.string()
      })),
      "ctaHeading": z.string(),
      "ctaSubheading": z.string(),
      "ctaBody": z.string(),
      "ctaButtonLabel": z.string(),
      "ctaNote": z.string()
    }),
    videos: z.object({
      "hero": z.object({
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "sectionHeading": z.string(),
      "sectionSubheading": z.string(),
      "videos": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "category": z.string(),
        "duration": z.string(),
        "views": z.string(),
        "youtubeId": z.string()
      }))
    })
  }
};
export type Schemas = typeof schemas;