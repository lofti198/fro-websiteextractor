interface ServiceContentProps {
  content: string;
}

export default function ServiceContent({ content }: ServiceContentProps) {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="prose prose-lg prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}