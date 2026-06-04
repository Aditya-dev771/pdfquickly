import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://pdfquickly.online";

  const routes = [
    "",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/merge-pdf",
    "/split-pdf",
    "/pdf-to-jpg",
    "/jpg-to-pdf",
    "/png-to-pdf",
    "/image-to-pdf",
    "/remove-pdf-pages",
    "/rotate-pdf",
    "/extract-pdf-pages",
    "/pdf-organizer",
    "/add-watermark",
    "/add-page-numbers",
    "/add-pdf-border",
    "/pdf-preview",
    "/pdf-to-word",
    "/text-to-pdf",
    "/extract-first-page",
    "/extract-last-page",
    "/remove-blank-pages",
    "/pdf-metadata-viewer",
    "/remove-pdf-metadata",
    "/pdf-page-counter",
    "/pdf-size-calculator",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}