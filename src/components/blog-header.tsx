export default function BlogHeader() {
  return (
    <section className="flex justify-center items-center flex-col gap-3 sm:gap-4 pt-6 sm:pt-8 pb-3 sm:pb-4 px-4 sm:px-6">
      <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold">
        Latest Blog Posts
      </h2>
      <p className="text-muted-foreground text-center max-w-lg text-sm sm:text-base px-4">
        Explore our latest insights, tutorials, and updates.
      </p>
    </section>
  );
}