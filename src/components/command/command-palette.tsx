"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Bot,
  Briefcase,
  Copy,
  Download,
  FileText,
  Home,
  Layers,
  Mail,
  Moon,
  Search,
  Sparkles,
  Sun,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/brand-icons";
import { navItems, profile, projects } from "@/data/portfolio";
import { useDialog } from "@/hooks/use-dialog";
import { useIsMac } from "@/hooks/use-is-mac";
import { scrollToHash } from "@/lib/scroll";
import { useToast } from "@/components/providers/toast-provider";

type PaletteAction = {
  id: string;
  label: string;
  group: string;
  icon: React.ComponentType<{ className?: string }>;
  hint?: string;
  keywords?: string;
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const { toast } = useToast();
  const isMac = useIsMac();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };
    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("ns:command", onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("ns:command", onOpen);
    };
  }, []);

  useDialog(open, () => setOpen(false), containerRef);

  const closeThen = (callback: () => void) => {
    setOpen(false);
    window.setTimeout(callback, 140);
  };

  const actions = useMemo<PaletteAction[]>(() => {
    const navigationIcons: Record<string, React.ComponentType<{ className?: string }>> = {
      "#about": User,
      "#journey": Sparkles,
      "#record": Briefcase,
      "#skills": Wrench,
      "#work": Layers,
      "#proof": Trophy,
      "#contact": Mail,
      "#top": Home,
      "#next": Sparkles,
    };

    const navigationActions: PaletteAction[] = navItems.map((item) => ({
      id: `nav-${item.href}`,
      label: item.href === "#top" ? "Back to index" : item.label,
      group: "Navigate",
      icon: navigationIcons[item.href] ?? Home,
      hint: item.index,
      keywords: `go to section ${item.label}`,
      run: () => {
        if (window.location.pathname === "/") {
          scrollToHash(item.href);
        } else {
          router.push(`/${item.href}`);
        }
      },
    }));

    const projectActions: PaletteAction[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      group: "Projects",
      icon: project.category === "Frontend" ? Layers : Sparkles,
      hint: project.year,
      keywords: `${project.tagline} ${project.stack.join(" ")}`,
      run: () => router.push(`/work/${project.slug}`),
    }));

    const utilityActions: PaletteAction[] = [
      {
        id: "theme",
        label: `Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`,
        group: "Actions",
        icon: resolvedTheme === "dark" ? Sun : Moon,
        keywords: "theme appearance color mode",
        run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
      },
      {
        id: "resume",
        label: "Download résumé (PDF)",
        group: "Actions",
        icon: Download,
        keywords: "cv pdf download file",
        run: () => {
          const anchor = document.createElement("a");
          anchor.href = "/resume/Nallamothu-Srinath-Resume.pdf";
          anchor.download = "Nallamothu-Srinath-Resume.pdf";
          anchor.click();
          toast("Résumé download started.", "success");
        },
      },
      {
        id: "view-resume",
        label: "Open web résumé",
        group: "Actions",
        icon: FileText,
        keywords: "cv page view",
        run: () => router.push("/resume"),
      },
      {
        id: "copy-email",
        label: "Copy email address",
        group: "Actions",
        icon: Copy,
        hint: profile.email,
        keywords: "contact mail clipboard",
        run: async () => {
          await navigator.clipboard.writeText(profile.email);
          toast("Email copied to clipboard.", "success");
        },
      },
      {
        id: "email",
        label: "Send an email",
        group: "Connect",
        icon: Mail,
        hint: "Opens mail app",
        keywords: "contact reach out",
        run: () => {
          window.location.href = `mailto:${profile.email}`;
        },
      },
      {
        id: "github",
        label: "GitHub — srinath29-git",
        group: "Connect",
        icon: GithubIcon,
        hint: "External",
        keywords: "code repositories open source",
        run: () => window.open(profile.github, "_blank", "noopener,noreferrer"),
      },
      {
        id: "linkedin",
        label: "LinkedIn — srinath2529",
        group: "Connect",
        icon: LinkedinIcon,
        hint: "External",
        keywords: "profile professional network",
        run: () => window.open(profile.linkedin, "_blank", "noopener,noreferrer"),
      },
      {
        id: "concierge",
        label: "Ask the portfolio concierge",
        group: "Actions",
        icon: Bot,
        keywords: "ai assistant chat question",
        run: () => window.dispatchEvent(new CustomEvent("ns:concierge")),
      },
    ];

    return [...navigationActions, ...projectActions, ...utilityActions];
  }, [resolvedTheme, router, setTheme, toast]);

  const groups = ["Navigate", "Projects", "Actions", "Connect"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            className="cmdk-overlay"
            aria-label="Close command menu"
            onClick={() => setOpen(false)}
            tabIndex={-1}
          />
          <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command menu"
            className="cmdk-dialog"
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Command label="Command menu" loop>
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Search className="h-4 w-4 flex-none text-subtle" />
                <Command.Input
                  autoFocus
                  placeholder="Search sections, projects, or actions…"
                  aria-label="Search commands"
                />
                <kbd className="mr-1 hidden rounded border border-line px-1.5 py-0.5 font-mono text-[13px] text-subtle sm:block">
                  esc
                </kbd>
              </div>
              <Command.List>
                <Command.Empty>No matching commands.</Command.Empty>
                {groups.map((group) => {
                  const items = actions.filter((action) => action.group === group);
                  if (!items.length) return null;
                  return (
                    <Command.Group key={group} heading={group}>
                      {items.map((action) => {
                        const Icon = action.icon;
                        return (
                          <Command.Item
                            key={action.id}
                            value={`${action.label} ${action.keywords ?? ""}`}
                            onSelect={() => closeThen(action.run)}
                          >
                            <Icon className="h-4 w-4 flex-none" />
                            <span className="flex-1 truncate">{action.label}</span>
                            {action.hint && (
                              <span className="hidden max-w-[45%] truncate font-mono text-[13px] uppercase tracking-[0.08em] text-subtle sm:block">
                                {action.hint}
                              </span>
                            )}
                            {action.group === "Projects" ||
                            action.group === "Navigate" ? (
                              <ArrowUpRight className="h-3 w-3 flex-none text-subtle" />
                            ) : null}
                          </Command.Item>
                        );
                      })}
                    </Command.Group>
                  );
                })}
                <div className="mt-2 flex items-center justify-between border-t border-line px-3 py-2.5">
                  <div className="flex items-center gap-3 font-mono text-[13px] uppercase tracking-[0.08em] text-subtle">
                    <span>
                      <kbd className="mr-1 rounded border border-line px-1 py-0.5">↑↓</kbd>
                      Navigate
                    </span>
                    <span>
                      <kbd className="mr-1 rounded border border-line px-1 py-0.5">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span className="font-mono text-[13px] uppercase tracking-[0.08em] text-subtle">
                    {isMac ? "⌘ K" : "Ctrl K"}
                  </span>
                </div>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
