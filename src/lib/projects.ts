import { projects, type Project } from "@/data/portfolio";

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 2): Project[] {
  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .sort((a, b) => {
      const aShared = a.categories.filter((category) =>
        project.categories.includes(category),
      ).length;
      const bShared = b.categories.filter((category) =>
        project.categories.includes(category),
      ).length;
      return bShared - aShared;
    })
    .slice(0, limit);
}

export const projectSlugs = projects.map((project) => project.slug);
