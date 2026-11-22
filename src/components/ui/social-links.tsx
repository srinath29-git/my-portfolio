import { ArrowUpRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { socials } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const icons = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

type SocialLinksProps = {
  className?: string;
  variant?: "inline" | "stacked";
  showHandle?: boolean;
};

export function SocialLinks({
  className,
  variant = "inline",
  showHandle = false,
}: SocialLinksProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2",
        variant === "stacked" && "flex-col items-stretch gap-3",
        className,
      )}
    >
      {socials.map((social) => {
        const Icon = icons[social.icon];
        const isExternal = social.icon !== "mail";
        return (
          <a
            key={social.label}
            href={social.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer noopener" : undefined}
            aria-label={`${social.label} — ${social.handle}`}
            data-cursor="hover"
            className={cn(
              "group flex items-center gap-2.5 text-muted transition-colors hover:text-fg",
              variant === "inline" &&
                "h-10 w-10 justify-center rounded-full border border-line-strong bg-surface",
              variant === "stacked" &&
                "justify-between rounded-xl border border-line px-4 py-3 hover:border-accent/40 hover:bg-accent-soft",
            )}
          >
            <span className="flex items-center gap-2.5">
              <Icon className="h-4 w-4" />
              {variant === "stacked" && (
                <span className="flex flex-col">
                  <span className="text-sm text-fg">{social.label}</span>
                  {showHandle && (
                    <span className="font-mono text-[13px] uppercase tracking-[0.12em] text-subtle">
                      {social.handle}
                    </span>
                  )}
                </span>
              )}
            </span>
            {variant === "stacked" && (
              <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </a>
        );
      })}
    </div>
  );
}
