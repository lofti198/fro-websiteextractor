import { PostContentProps } from "@/lib/types";
import { fixImageUrls } from "@/lib/utils";

export default function PostContent({ content }: PostContentProps) {
  return (
    <div className="prose prose-lg prose-gray max-w-none [&_img]:!my-12 [&_img]:!mx-auto [&_img]:!block [&_figure]:!my-12 [&_figure]:!mx-auto">
      <div
        className="leading-relaxed [&>*:first-child]:mt-8 [&>*:last-child]:mb-8"
        dangerouslySetInnerHTML={{ __html: fixImageUrls(content) }}
      />
    </div>
  );
}