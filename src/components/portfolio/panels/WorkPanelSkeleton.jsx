import { ClipboardList, ExternalLink } from "lucide-react";
import { GithubMark } from "../../icons/BrandMarks";
import { WORK_PROJECTS } from "../../../constants/workProjects";

export function WorkPanelSkeleton() {
  return (
    <article className="flex flex-col gap-10 px-1">
      {WORK_PROJECTS.map((project, index) => (
        <section
          key={project.id}
          className={
            index === 0
              ? "flex flex-col gap-4"
              : "flex flex-col gap-4 border-t border-white/10 pt-10"
          }
        >
          {project.image ? (
            <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] ring-1 ring-white/5">
              <img
                src={project.image.src}
                alt={project.image.alt}
                className="aspect-[16/10] w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-portfolio-accent/20 via-portfolio-bg to-portfolio-accent-hover/10 ring-1 ring-white/5">
              <ClipboardList
                className="size-[18%] min-w-[3rem] max-w-[5rem] text-portfolio-accent/70"
                strokeWidth={1.25}
                aria-hidden
              />
            </div>
          )}

          <div>
            <p className="font-manrope text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-portfolio-accent">
              {project.eyebrow}
            </p>
            <h3 className="mt-1 font-epilogue text-xl font-bold tracking-tight text-white">
              {project.title}
            </h3>
            <p className="mt-3 font-epilogue text-sm font-light leading-relaxed text-portfolio-text-muted">
              {project.description}
            </p>
            {project.features.length > 0 ? (
              <ul className="mt-3 list-disc space-y-1.5 pl-4 font-manrope text-xs leading-relaxed text-portfolio-text-muted">
                {project.features.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
            <p
              className={`${project.features.length > 0 ? "mt-3" : "mt-2"} font-manrope text-xs text-white/55`}
            >
              {project.tech}
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-4 py-2.5 font-manrope text-sm font-semibold text-white transition duration-300 hover:border-portfolio-accent hover:text-portfolio-accent active:scale-95 sm:flex-none"
            >
              <GithubMark className="size-[1.1rem] shrink-0" />
              GitHub
            </a>
            <a
              href={project.links.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-portfolio-accent/35 to-transparent px-4 py-2.5 font-manrope text-sm font-semibold text-white ring-1 ring-portfolio-accent/40 transition duration-300 hover:from-portfolio-accent/50 hover:ring-portfolio-accent-hover/60 active:scale-95 sm:flex-none"
            >
              <ExternalLink
                className="size-[1.1rem] shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              {project.links.liveLabel}
            </a>
          </div>
        </section>
      ))}
    </article>
  );
}
