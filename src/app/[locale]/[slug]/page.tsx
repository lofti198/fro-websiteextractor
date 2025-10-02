import { notFound } from "next/navigation";
import { WordPressPost } from "@/lib/types";
import ServiceHeader from "@/components/services-details/service-header";
import ServiceContent from "@/components/services-details/service-content";
import ServiceFooter from "@/components/services-details/service-footer";

export const revalidate = 1200;

async function getService(slug: string): Promise<WordPressPost | null> {
  try {
    if (process.env.WP_API_URL) {
      const res = await fetch(`${process.env.WP_API_URL}/posts?slug=${slug}&_embed`, {
        next: { revalidate: 1200 }
      });
      if (res.ok) {
        const posts: WordPressPost[] = await res.json();
        return posts[0] || null;
      }
    }
  } catch (error) {
    console.log('WordPress API not available');
  }
  return null;
}

export default async function ServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  // Extract categories and tags from embedded data
  const categories = service._embedded?.["wp:term"]?.[0] || [];
  const tags = service._embedded?.["wp:term"]?.[1] || [];
  const author = service._embedded?.author?.[0];

  return (
    <main>
      <ServiceHeader 
        service={service} 
        categories={categories} 
        tags={tags} 
        author={author} 
      />
      <ServiceContent content={service.content.rendered} />
      <ServiceFooter 
        categories={categories} 
        tags={tags} 
      />
    </main>
  );
}
