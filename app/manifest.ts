import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Samir Shaikh — AI Backend Engineer & Portfolio",
    short_name: "Samir Shaikh",
    description:
      "The personal portfolio and engineering blog of Samir Shaikh — AI Backend Engineer, AI SDE, and Agentic AI Engineer — showcasing AI systems, RAG pipelines, and high-performance backend architecture.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    background_color: "#F7F8F2",
    theme_color: "#0A0A0A",
    orientation: "portrait-primary",
    lang: "en-US",
    dir: "ltr",
    categories: ["portfolio", "technology", "developer tools", "productivity"],
    icons: [
      {
        src: "/Filled_Logo.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/Filled_Logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/Filled_Logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "AI Projects",
        short_name: "Projects",
        description: "Explore Agentic AI systems, RAG pipelines, and full-stack software",
        url: "/projects",
        icons: [{ src: "/Filled_Logo.png", sizes: "192x192" }],
      },
      {
        name: "Technical Skills",
        short_name: "Skills",
        description: "Review core competencies in AI, distributed backend, and database engineering",
        url: "/technical-skills",
        icons: [{ src: "/Filled_Logo.png", sizes: "192x192" }],
      },
      {
        name: "Technical Blog",
        short_name: "Blog",
        description: "Read in-depth technical articles on AI engineering, RAG, and system architecture",
        url: "/blogs",
        icons: [{ src: "/Filled_Logo.png", sizes: "192x192" }],
      },
      {
        name: "Contact Samir",
        short_name: "Contact",
        description: "Get in touch for contract, advisory, or full-time opportunities",
        url: "/contact",
        icons: [{ src: "/Filled_Logo.png", sizes: "192x192" }],
      },
    ],
  };
}
