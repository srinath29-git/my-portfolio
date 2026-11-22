import { projects } from "@/data/portfolio";

export type GithubRepoSignal = {
  name: string;
  fullName: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  openIssues: number;
  updatedAt: string;
  htmlUrl: string;
};

export type GithubSignals = {
  username: string;
  profileUrl: string;
  publicRepos: number;
  followers: number;
  repos: Record<string, GithubRepoSignal>;
  fetchedAt: string | null;
  live: boolean;
};

const USERNAME = "srinath29-git";
const REVALIDATE_SECONDS = 60 * 60;

export async function fetchGithubSignals(): Promise<GithubSignals> {
  const fallback: GithubSignals = {
    username: USERNAME,
    profileUrl: `https://github.com/${USERNAME}`,
    publicRepos: 7,
    followers: 0,
    repos: {},
    fetchedAt: null,
    live: false,
  };

  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github+json",
      "User-Agent": "nallamothu-srinath-portfolio",
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, {
        headers,
        next: { revalidate: REVALIDATE_SECONDS },
      }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: REVALIDATE_SECONDS },
      }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error("GitHub API request failed");
    }

    const user = await userResponse.json();
    const repos = await reposResponse.json();

    if (!Array.isArray(repos)) {
      throw new Error("Unexpected GitHub response");
    }

    const curatedNames = new Set(
      projects.map((project) => project.githubRepo).filter(Boolean) as string[],
    );

    const byName: Record<string, GithubRepoSignal> = {};
    for (const repo of repos) {
      if (!curatedNames.has(repo.name)) continue;
      byName[repo.name] = {
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        updatedAt: repo.pushed_at ?? repo.updated_at,
        htmlUrl: repo.html_url,
      };
    }

    return {
      username: USERNAME,
      profileUrl: user.html_url ?? fallback.profileUrl,
      publicRepos: user.public_repos ?? fallback.publicRepos,
      followers: user.followers ?? 0,
      repos: byName,
      fetchedAt: new Date().toISOString(),
      live: true,
    };
  } catch {
    return fallback;
  }
}
