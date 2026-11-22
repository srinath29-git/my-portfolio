import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Journey } from "@/components/sections/journey";
import { Record } from "@/components/sections/record";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";
import { Proof } from "@/components/sections/proof";
import { ResumeSection } from "@/components/sections/resume-section";
import { Interests } from "@/components/sections/interests";
import { Contact } from "@/components/sections/contact";
import { siteConfig } from "@/data/portfolio";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Journey />
      <Record />
      <Skills />
      <Work />
      <Proof />
      <ResumeSection />
      <Interests />
      <Contact />
    </>
  );
}
