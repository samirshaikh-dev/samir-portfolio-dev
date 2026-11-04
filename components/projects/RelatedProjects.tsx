import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import ProjectCoverImage from "./ProjectCoverImage";

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
    <section aria-labelledby="related-heading" className="border-t border-border-primary/80 pt-12 sm:pt-16">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-[11px] font-medium uppercase tracking-wider text-text-muted mb-2">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-accent-lime shadow-[0_0_6px_rgba(184,255,0,0.8)]" />
            <span>MORE CASE STUDIES</span>
          </div>
          <h2
            id="related-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-foreground"
          >
            Explore Related Architectures
          </h2>
        </div>
        <Link
          href="/projects"
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-primary/80 bg-background dark:bg-card-bg px-4 py-2 text-xs font-bold text-foreground transition-all duration-200 hover:border-foreground/30 hover:bg-hover-bg/70 focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2 sm:text-sm"
        >
          View All Work
          <FiArrowRight
            aria-hidden="true"
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => {
          const techs = (project.technologies ?? []).slice(0, 3);
          return (
            <article key={project.id} className="h-full">
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-primary/80 bg-background dark:bg-card-bg p-5 transition-all duration-200 hover:border-foreground/30 hover:shadow-2xs focus-visible:ring-2 focus-visible:ring-accent-lime focus-visible:outline-none focus-visible:ring-offset-2"
              >
                <div className="mb-4 overflow-hidden rounded-xl">
                  <ProjectCoverImage
                    coverImageUrl={project.cover_image_url}
                    title={project.title}
                    category={project.category}
                    badge={project.badge}
                    indexStr={String(index + 1).padStart(2, "0")}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-3">
                  <div>
                    <div className="mb-1.5 flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                      {project.badge && (
                        <span className="text-foreground font-semibold">
                          {project.badge}
                        </span>
                      )}
                      {project.category && (
                        <>
                          <span>&bull;</span>
                          <span>{project.category}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground group-hover:text-text-secondary transition-colors">
                      {project.title}
                    </h3>
                    {project.excerpt && (
                      <p className="mt-2 line-clamp-2 text-xs text-text-secondary leading-relaxed">
                        {project.excerpt}
                      </p>
                    )}
                  </div>

                  {techs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border-primary/60">
                      {techs.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border-primary/60 bg-hover-bg/70 px-2 py-0.5 font-mono text-[10px] text-text-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
