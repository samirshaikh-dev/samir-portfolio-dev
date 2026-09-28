import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { optimizeCloudinaryUrl } from "@/lib/cloudinary-utils";

export interface RelatedProject {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  technologies: string[] | null;
  github_link: string | null;
  demo_link: string | null;
  badge: string | null;
  category: string | null;
}

interface RelatedProjectsProps {
  projects: RelatedProject[];
}

export default function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="related-heading" className="border-t border-border-primary pt-12 sm:pt-14">
      <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
        <div>
          <p className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-6 bg-accent-lime" />
            Keep Exploring
          </p>
          <h2
            id="related-heading"
            className="mt-2 text-2xl font-black tracking-tight text-foreground sm:text-3xl"
          >
            More Projects
          </h2>
        </div>
        <Link
          href="/projects"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-primary bg-background px-4 py-2 text-xs font-bold text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-hover-bg focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none sm:text-sm dark:bg-card-bg"
        >
          View all
          <FiArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
          />
        </Link>
      </div>

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const techs = (project.technologies ?? []).slice(0, 3);
          return (
            <li key={project.id}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-primary bg-background transition-all duration-300 hover:border-foreground/30 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none dark:bg-card-bg"
              >
                {project.cover_image_url ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-border-primary bg-hover-bg">
                    <Image
                      src={optimizeCloudinaryUrl(project.cover_image_url, { width: 640 })}
                      alt={`Interface of ${project.title}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    />
                  </div>
                ) : null}

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {project.badge ? (
                      <span className="inline-flex items-center gap-1.5 text-foreground">
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent-lime" />
                        {project.badge}
                      </span>
                    ) : null}
                    {project.badge && project.category ? (
                      <span aria-hidden="true">·</span>
                    ) : null}
                    {project.category ? <span>{project.category}</span> : null}
                  </div>
                  <h3 className="text-base font-bold leading-snug text-foreground sm:text-lg">
                    {project.title}
                  </h3>
                  {project.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text-muted sm:text-sm">
                      {project.excerpt}
                    </p>
                  ) : null}

                  {techs.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {techs.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-border-primary bg-hover-bg px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto flex items-center gap-2 border-t border-border-primary pt-4 text-xs font-semibold text-foreground">
                    Read case study
                    <FiArrowRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none motion-reduce:transition-none"
                    />
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
