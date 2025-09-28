# Home Page (page.tsx) - README

## Overview
The main homepage component that displays a grid of WordPress blog posts.

## Functionality
- Fetches blog posts from WordPress REST API
- Displays posts using `BlogHeader` and `BlogPostGrid` components
- Server-side rendered with 20-minute cache (ISR)

## Code Structure
```jsx
export default async function Home() {
  const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`);
  const posts: WordPressPost[] = await res.json();

  return (
    <main>
      <BlogHeader />
      <BlogPostGrid posts={posts} />
    </main>
  );
}
```

## Requirements
- `WP_API_URL` environment variable
- `BlogHeader` component
- `BlogPostGrid` component
- `WordPressPost` type definition

## Features
- **ISR**: Revalidates every 1200 seconds (20 minutes)
- **Embedded Data**: Uses `_embed` parameter for featured images and metadata
- **TypeScript**: Type-safe with `WordPressPost` interface
- **Performance**: Server-side rendering for fast loading