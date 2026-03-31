import { GithubMark, LinkedinMark } from "../icons/BrandMarks";
import { HERO_CONTENT, HERO_IMAGE } from "../../constants/portfolio";
import { TECH_STACK_ROWS } from "../../constants/techStack";

const pillVariantClass = {
  lavender:
    "border-portfolio-accent/45 bg-portfolio-accent/10 text-portfolio-accent",
  peach:
    "border-portfolio-accent-hover/55 bg-portfolio-accent-hover/10 text-portfolio-accent-hover",
};

function HeroSection() {
  return (
    <section
      className="relative flex h-full min-h-0 flex-col justify-end"
      aria-labelledby="hero-headline"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="pointer-events-none absolute inset-0 h-full w-full max-h-none min-h-full min-w-full object-cover object-[center_20%] grayscale contrast-[1.05]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-portfolio-bg via-portfolio-bg/75 to-portfolio-bg/20"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-portfolio-bg/40 to-transparent"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top)+0.75rem)] md:px-6">
        <p className="font-epilogue text-[0.625rem] font-semibold uppercase tracking-[0.35em] text-portfolio-accent md:text-xs">
          {HERO_CONTENT.eyebrow}
        </p>

        <h1
          id="hero-headline"
          className="mt-3 font-epilogue text-4xl font-extrabold leading-[0.92] tracking-tight text-white sm:text-5xl"
        >
          {HERO_CONTENT.headlineLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="mt-4 max-w-[22rem] font-epilogue text-sm font-light leading-relaxed text-portfolio-text-muted md:max-w-md md:text-base">
          {HERO_CONTENT.description}
        </p>

        <ul
          className="mt-4 flex max-w-xl list-none flex-col gap-2 p-0"
          aria-label="Tech stack"
        >
          {TECH_STACK_ROWS.map((row, rowIndex) => (
            <li key={rowIndex} className="list-none">
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                {row.map(({ id, label, variant }) => (
                  <li key={id}>
                    <span
                      className={`inline-flex rounded-lg border px-2.5 py-1 font-manrope text-[0.625rem] font-semibold uppercase tracking-wide transition-colors duration-300 md:text-xs ${pillVariantClass[variant]}`}
                    >
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href={HERO_CONTENT.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/30 bg-portfolio-accent/15 px-5 py-2.5 font-manrope text-sm font-semibold text-white transition duration-300 hover:border-white/45 hover:bg-portfolio-accent/25 active:scale-95"
          >
            <LinkedinMark className="size-[1.1rem] shrink-0" />
            {HERO_CONTENT.linkedin.label}
          </a>
          <a
            href={HERO_CONTENT.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-portfolio-accent-hover/75 bg-transparent px-5 py-2.5 font-manrope text-sm font-semibold text-portfolio-accent-hover transition duration-300 hover:border-portfolio-accent-hover hover:bg-portfolio-accent-hover/10 active:scale-95"
          >
            <GithubMark className="size-[1.1rem] shrink-0" />
            {HERO_CONTENT.github.label}
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
