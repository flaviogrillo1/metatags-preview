import { NextRequest, NextResponse } from "next/server";
import * as cheerio from "cheerio";

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Validate URL format
    let validUrl: URL;
    try {
      validUrl = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
    }

    // Fetch the HTML
    const response = await fetch(validUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MetaTagsPreview/1.0; +https://metatags-preview.vercel.app)",
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract meta tags
    const metaTags = {
      title: $('meta[property="og:title"]').attr("content") ||
              $("title").text() ||
              "",
      description: $('meta[property="og:description"]').attr("content") ||
                   $('meta[name="description"]').attr("content") ||
                   "",
      image: $('meta[property="og:image"]').attr("content") ||
             $('meta[name="twitter:image"]').attr("content") ||
             "",
      url: $('meta[property="og:url"]').attr("content") ||
           validUrl.toString(),
      siteName: $('meta[property="og:site_name"]').attr("content") ||
                $('meta[name="application-name"]').attr("content") ||
                validUrl.hostname,
      type: $('meta[property="og:type"]').attr("content") || "website",
      twitterCard: ($('meta[name="twitter:card"]').attr("content") as any) ||
                   "summary_large_image",
    };

    // Validate and generate warnings
    const warnings: string[] = [];
    const errors: string[] = [];

    // Title validation
    if (!metaTags.title) {
      errors.push("Missing title tag");
    } else if (metaTags.title.length < 30) {
      warnings.push("Title is too short (recommended: 50-60 characters)");
    } else if (metaTags.title.length > 60) {
      warnings.push("Title may be truncated (recommended: 50-60 characters)");
    }

    // Description validation
    if (!metaTags.description) {
      errors.push("Missing description meta tag");
    } else if (metaTags.description.length < 120) {
      warnings.push("Description is too short (recommended: 150-160 characters)");
    } else if (metaTags.description.length > 160) {
      warnings.push("Description may be truncated (recommended: 150-160 characters)");
    }

    // Image validation
    if (!metaTags.image) {
      warnings.push("Missing Open Graph image - your link preview won't have an image");
    }

    const validation = {
      isValid: errors.length === 0,
      warnings,
      errors,
    };

    return NextResponse.json({ metaTags, validation });
  } catch (error) {
    console.error("Error fetching meta tags:", error);
    return NextResponse.json(
      { error: "Failed to fetch meta tags from the provided URL" },
      { status: 500 }
    );
  }
}
