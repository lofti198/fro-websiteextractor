export function extractImageFromContent(content: string): string | null {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  if (match) {
    let imageUrl = match[1];
    if (imageUrl.startsWith("//")) {
      imageUrl = "https:" + imageUrl;
    }
    return imageUrl;
  }
  return null;
}

export function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url || url === "EXPORT_IMAGE_URL" || (!url.startsWith("http") && !url.startsWith("/"))) {
    return "/static/img/blog.jfif";
  }

  if (url.startsWith("//")) {
    return "https:" + url;
  }

  return url;
}

export function decodeHtmlEntities(text: string): string {
  const entities: { [key: string]: string } = {
    "&#8211;": "–",
    "&#8212;": "—",
    "&#8216;": "'",
    "&#8217;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#8230;": "…",
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&nbsp;": " ",
  };

  return text.replace(/&#?\w+;/g, (entity) => entities[entity] || entity);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text: string, length: number = 120): string {
  return text.length > length ? text.slice(0, length) + "..." : text;
}

export function fixImageUrls(content: string): string {
  return content.replace(/<img([^>]+)src="([^"]*)"([^>]*>)/g, (match, before, src, after) => {
    let fixedSrc = src;

    if (fixedSrc.startsWith("//")) {
      fixedSrc = "https:" + fixedSrc;
    }

    if (!fixedSrc || fixedSrc === "EXPORT_IMAGE_URL" || (!fixedSrc.startsWith("http") && !fixedSrc.startsWith("/"))) {
      fixedSrc = "/static/img/blog.jfif";
    }

    return `<img${before}src="${fixedSrc}"${after}`;
  });
}

export function cleanExcerptForMeta(excerpt: string, maxLength: number = 160): string {
  return excerpt
    .replace(/<[^>]*>/g, "")
    .replace(/&[^;]+;/g, "")
    .slice(0, maxLength);
}