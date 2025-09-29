import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import LatestBlogSection from "@/components/latest-blog-section";
import ContactSection from "@/components/contact-section";
import { WordPressPost } from "@/lib/types";

export const revalidate = 1200;

export default async function Home() {
  const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`);
  const posts: WordPressPost[] = await res.json();

  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <LatestBlogSection posts={posts} />
      <ContactSection />
    </main>
  );
}
