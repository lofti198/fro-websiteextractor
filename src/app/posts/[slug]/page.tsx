export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const res = await fetch(`${process.env.WP_API_URL}/posts`);
  const data = await res.json();

  const postSlugs = data.map((post: { slug: string }) => ({ slug: post.slug }));

  return postSlugs;
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.WP_API_URL}/posts?slug=${params.slug}`
  );
  const data = await res.json();
  const post = data[0];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="container flex justify-center my-10">
      <div className="lg:w-6/12 flex flex-col">
        <p className="text-sm text-muted-foreground mb-4">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
        <h1 className="text-6xl font-bold mb-8">{post.title.rendered}</h1>
        <div className="text-xl parsed-container flex flex-col mt-10 gap-10">
          <div
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </div>
    </div>
  );
}
