import Hero from "@/components/home/Hero";
import SelectedWork from "@/components/home/SelectedWork";
import EngineeringPhilosophy from "@/components/home/EngineeringPhilosophy";
import TechnicalCapabilities from "@/components/home/TechnicalCapabilities";
import HomeExperience from "@/components/home/HomeExperience";
import SelectedWriting from "@/components/home/SelectedWriting";
import CallToAction from "@/components/home/CallToAction";
import { getSpeakableJsonLd } from "@/lib/seo/structured-data";
import { Project } from "@/components/projects/ProjectList";
import {
  getCachedHomepageProjects,
  getCachedHomepageBlogs,
  getCachedExperiences,
} from "@/lib/cache";

export const revalidate = 3600;

export default async function Home() {
  const [projects, blogs, experiences] = await Promise.all([
    getCachedHomepageProjects() as Promise<Project[]>,
    getCachedHomepageBlogs(),
    getCachedExperiences(),
  ]);

  return (
    <main className="flex flex-col flex-1">
      {/* 01: Hero — Identity, Core Engineering Focus, and Primary CTAs */}
      <Hero />

      {/* 02: Selected Work — Engineering Case Studies & Flagship Systems */}
      <SelectedWork projects={projects} />

      {/* 03: Engineering Philosophy — How I Think About Engineering */}
      <EngineeringPhilosophy />

      {/* 04: Technical Capabilities — Disciplined Systems & Stack Knowledge */}
      <TechnicalCapabilities />

      {/* 05: Experience & Career History — Factual, Confident Timeline */}
      <HomeExperience experiences={experiences} />

      {/* 06: Selected Writing — Deep-Dive Engineering Notes */}
      {blogs.length > 0 && <SelectedWriting blogs={blogs} />}

      {/* 07: Closing Call to Action — Dual Conversion Paths */}
      <CallToAction />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getSpeakableJsonLd(["h1", "h2", ".hero-intro"])),
        }}
      />
    </main>
  );
}
