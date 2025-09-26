import Link from "next/link";
import Image from "next/image";

export const revalidate = 3600; // Revalidate every hour

// Function to extract first image from content
function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}

export default async function PostsPage() {
  const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`);
  const data = await res.json();

  return (
    <main>
      <section className="flex justify-center items-center flex-col gap-4 pt-8 pb-4">
        <h2 className="text-4xl text-center">All Blog Posts</h2>
        <p className="text-muted-foreground text-center max-w-lg">
          Browse through all our blog posts and articles.
        </p>
      </section>
      <section className="md:grid-cols-3 grid-cols-1 grid gap-5 px-6 pb-8">
        {data &&
          data.map((post: any) => {
            // Get featured image from embed or extract from content
            const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                                extractImageFromContent(post.content.rendered) ||
                                'https://via.placeholder.com/800x450/f3f4f6/9ca3af?text=No+Image';

            return (
              <Link
                href={`/posts/${post.slug}`}
                key={post.id}
              >
                <div className="flex flex-col gap-2 rounded-xl overflow-hidden h-full hover:bg-gray-100 border border-gray-200 transition-colors">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={featuredImage}
                      alt={post.title.rendered}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="py-5 px-6 flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <h3 className="text-xl font-semibold">{post.title.rendered}</h3>
                    <div
                      className="text-gray-600 line-clamp-3"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.slice(0, 150) + '...'
                      }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
      </section>
    </main>
  );
}
