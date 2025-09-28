export interface WordPressPost {
  id: number;
  date: string;
  modified: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
    }>;
    "wp:term"?: Array<Array<{
      id: number;
      name: string;
    }>>;
    "author"?: Array<{
      id: number;
      name: string;
    }>;
  };
}

export interface BlogPostCardProps {
  post: WordPressPost;
}

export interface PostNavigationProps {
  prevPost?: WordPressPost | null;
  nextPost?: WordPressPost | null;
}

export interface PostHeaderProps {
  post: WordPressPost;
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  author?: { id: number; name: string };
}

export interface PostContentProps {
  content: string;
}

export interface PostFooterProps {
  categories: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
}

export interface PostPaginationProps {
  prevPost?: WordPressPost | null;
  nextPost?: WordPressPost | null;
}