import { ExternalLink } from "lucide-react";
import { GithubMark } from "../../icons/BrandMarks";
import oxalateProjectImg from "../../../assets/oxalate-project.png";

const OXALATE_REPO = "https://github.com/josealarconchacon/oxalates";
const OXALATE_LIVE = "https://oxalate.info/";

export function WorkPanelSkeleton() {
  return (
    <article className="flex flex-col gap-4 px-1">
      <div className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] ring-1 ring-white/5">
        <img
          src={oxalateProjectImg}
          alt="Oxalate Info — search results UI showing flour-related foods and oxalate levels"
          className="aspect-[16/10] w-full object-cover object-top"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div>
        <p className="font-manrope text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-portfolio-accent">
          Featured project
        </p>
        <h3 className="mt-1 font-epilogue text-xl font-bold tracking-tight text-white">
          Oxalate Info
        </h3>
        <p className="mt-3 font-epilogue text-sm font-light leading-relaxed text-portfolio-text-muted">
          Oxalates are naturally occurring compounds in many plant-based
          foods—and sometimes produced in the body. In excess, they are most
          linked to kidney stones, but sensitive individuals may experience
          other issues. This app helps people search foods, review oxalate
          levels, and make clearer dietary choices.
        </p>
        <p className="mt-2 font-manrope text-xs text-white/55">
          Angular · TypeScript · Firebase
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5 pt-1">
        <a
          href={OXALATE_REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-4 py-2.5 font-manrope text-sm font-semibold text-white transition duration-300 hover:border-portfolio-accent hover:text-portfolio-accent active:scale-95 sm:flex-none"
        >
          <GithubMark className="size-[1.1rem] shrink-0" />
          GitHub
        </a>
        <a
          href={OXALATE_LIVE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-portfolio-accent/35 to-transparent px-4 py-2.5 font-manrope text-sm font-semibold text-white ring-1 ring-portfolio-accent/40 transition duration-300 hover:from-portfolio-accent/50 hover:ring-portfolio-accent-hover/60 active:scale-95 sm:flex-none"
        >
          <ExternalLink
            className="size-[1.1rem] shrink-0"
            strokeWidth={2}
            aria-hidden
          />
          Live site
        </a>
      </div>
    </article>
  );
}
