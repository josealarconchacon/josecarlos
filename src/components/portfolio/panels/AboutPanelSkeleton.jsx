import { ABOUT_BIO_PARAGRAPHS } from "../../../constants/aboutBio";

export function AboutPanelSkeleton() {
  return (
    <article className="px-0">
      <div className="flex min-w-0 w-full flex-col items-start text-left">
        <div className="w-full border-l-2 border-portfolio-accent/35 pl-4 @[400px]:pl-5 @[520px]:pl-6">
          <div className="flex flex-col gap-4 text-left">
            {ABOUT_BIO_PARAGRAPHS.map((text, i) => (
              <p
                key={i}
                className={`text-pretty font-epilogue leading-[1.65] text-portfolio-text-muted ${
                  i === 0
                    ? "text-[0.95rem] font-normal text-white/[0.88] @[520px]:text-base"
                    : "text-sm font-light @[520px]:text-[0.9375rem]"
                }`}
              >
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
