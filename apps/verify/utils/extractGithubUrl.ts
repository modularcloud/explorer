export type GitHubComponents = {
  owner: string;
  repo: string;
  path?: string;
};
const extractGitHubUrl = (url: string): GitHubComponents | null => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.host !== "github.com") {
      return null;
    }

    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (segments.length < 2) {
      return null;
    }

    const [owner, repo] = segments;

    let path: string | undefined;

    if (segments.length > 2) {
      path = segments.slice(4).join("/");
    }

    return { owner, repo, path };
  } catch (err) {
    console.error("Invalid URL:", err);
    return null;
  }
};

export default extractGitHubUrl;
