import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className="flex items-center justify-between gap-4 border-t border-line pt-5">
          <span className="mono text-muted">[ {index} ]</span>
          <span className="mono text-muted">{eyebrow}</span>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7" delay={0.05}>
          <h2 className="display text-[clamp(2.55rem,5.6vw,5.4rem)]">{title}</h2>
        </Reveal>
        {(description || children) && (
          <Reveal
            className="flex flex-col justify-end gap-5 lg:col-span-4 lg:col-start-9"
            delay={0.15}
          >
            {description && (
              <p className="max-w-md text-pretty text-[1.02rem] leading-relaxed text-muted">
                {description}
              </p>
            )}
            {children}
          </Reveal>
        )}
      </div>
    </div>
  );
}
