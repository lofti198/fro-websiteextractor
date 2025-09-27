import Link from "next/link";
import Image from "next/image";

export const revalidate = 1200; // Disable caching for development

// Function to extract first image from content
function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}

export default async function Home() {
  const res = await fetch(`${process.env.WP_API_URL}/posts?_embed`);
  const data = await res.json();

  return (
    <main>
      <section className="flex justify-center items-center flex-col gap-3 sm:gap-4 pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">Latest Blog Posts</h2>
        <p className="text-muted-foreground text-center max-w-lg text-sm sm:text-base px-4">Explore our latest insights, tutorials, and updates.</p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 px-4 sm:px-6 pb-6 sm:pb-8">
        {data &&
          data.map((post: any) => {
            // Get featured image from embed or extract from content
            const featuredImage =
              post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
              extractImageFromContent(post.content.rendered) ||
              "https://via.placeholder.com/800x450/f3f4f6/9ca3af?text=No+Image";

            return (
              <Link href={`/posts/${post.slug}`} key={post.id} className="group block">
                <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden h-full transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image src={featuredImage} alt={post.title.rendered} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3 flex-wrap">
                      <time className="text-xs text-gray-500 font-medium">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </time>
                      {post._embedded?.["wp:term"]?.[0]?.[0] && (
                        <>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs text-yellow-600 font-medium truncate">{post._embedded["wp:term"][0][0].name}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors leading-tight">
                      {post.title.rendered}
                    </h3>
                    <div
                      className="text-xs sm:text-sm text-gray-600 line-clamp-3 leading-relaxed"
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.replace(/<[^>]*>/g, "").slice(0, 120) + "...",
                      }}
                    />
                  </div>
                </article>
              </Link>
            );
          })}
      </section>
    </main>
  );
}
