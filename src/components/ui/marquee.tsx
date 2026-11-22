import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  itemClassName?: string;
  separator?: string;
  ariaLabel?: string;
};

export function Marquee({
  items,
  className,
  itemClassName,
  separator = "✦",
  ariaLabel = "Skills and focus areas",
}: MarqueeProps) {
  const content = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <span key={`${item}-${index}`} className="flex items-center">
          <span className={cn("px-5 text-sm text-muted", itemClassName)}>{item}</span>
          <span aria-hidden="true" className="text-[13px] text-subtle">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("marquee overflow-hidden", className)} aria-label={ariaLabel}>
      <div className="marquee-track">
        {content}
        <div aria-hidden="true" className="flex shrink-0 items-center">
          {items.map((item, index) => (
            <span key={`${item}-dup-${index}`} className="flex items-center">
              <span className={cn("px-5 text-sm text-muted", itemClassName)}>{item}</span>
              <span aria-hidden="true" className="text-[13px] text-subtle">
                {separator}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
