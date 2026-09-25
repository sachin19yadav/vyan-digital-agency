export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vyandigitalagency.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allow Google, Bing, and major AI search engine crawlers (ChatGPT, Perplexity, Claude, Apple)
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "GPTBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot",
          "Applebot-Extended",
          "Twitterbot",
          "facebookexternalhit",
        ],
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
