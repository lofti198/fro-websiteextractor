import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import LatestBlogSection from "@/components/latest-blog-section";
import ContactSection from "@/components/contact-section";
import { WordPressPost } from "@/lib/types";

export const revalidate = 1200;

export default async function Home() {
  let posts: WordPressPost[] = [];
  
  try {
    if (process.env.WP_API_URL) {
      const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`, {
        next: { revalidate: 1200 }
      });
      if (res.ok) {
        posts = await res.json();
      }
    }
  } catch (error) {
    console.log('WordPress API not available, showing homepage without blog posts');
  }

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <LatestBlogSection posts={posts} />
      <ContactSection />
    </main>
  );
}
