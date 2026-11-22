import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nallamothu Srinath — Portfolio",
    short_name: "Srinath",
    description:
      "AI intern, frontend developer, and B.Tech computer science student building practical AI systems and considered interfaces.",
    start_url: "/",
    display: "standalone",
    background_color: "#05060a",
    theme_color: "#05060a",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
