# Post Page ([slug]/page.tsx) - README

## Purpose
This page displays individual blog posts when someone clicks on a post from the homepage. It shows the full article content, author info, categories, and navigation to other posts.

## Key Functions Explained

### `generateStaticParams()`
**What it does**: Gets a list of all blog post URLs from WordPress and tells Next.js to create pages for each one during build time.
**Why**: This makes the website faster because pages are pre-built instead of created when someone visits.

### `generateMetadata()`
**What it does**: Creates the page title, description, and social media preview information for each post.
**Why**: This helps with SEO (Google rankings) and makes posts look good when shared on Facebook/Twitter.

### `PostPage()` (Main Function)
**What it does**:
1. Gets the specific post data from WordPress using the URL slug
2. If post doesn't exist, shows a "not found" page
3. Gets all posts to figure out which post comes before/after this one
4. Displays the post with header, content, footer, and navigation

## Page Structure
- **Post Navigation**: Arrows to go to previous/next posts
- **Post Header**: Title, author, date, featured image
- **Post Content**: The actual blog post text
- **Post Footer**: Categories and tags
- **Post Pagination**: Links to previous/next posts

## Configuration
- **Caching**: Pages refresh every 20 minutes to get new content
- **Static Generation**: All post pages are pre-built for speed
- **Error Handling**: Shows friendly message if post is missing