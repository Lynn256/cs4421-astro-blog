import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		author: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.url().optional(),
		heroImageAlt: z.string().optional(),
		category: z.string().default('Field notes'),
	}),
});

const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.md' }),
	schema: z.object({
		name: z.string(),
		avatar: z.string(),
		bio: z.string(),
		social: z
			.object({
				website: z.url().optional(),
				github: z.url().optional(),
				linkedin: z.url().optional(),
			})
			.default({}),
	}),
});

export const collections = { blog, authors };
