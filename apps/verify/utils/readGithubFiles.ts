import axios, { AxiosResponse } from "axios";
import JSZip from "jszip";
import readRemoteFile from "./readRemoteFiles";

type GitHubComponents = {
  owner: string;
  repo: string;
  path?: string;
};

type GitHubContentItem = {
  type: "dir" | "file";
  download_url: string | null;
  path: string;
};

const readGitHubFiles = async (
  owner: string,
  repo: string,
  path: string = "",
): Promise<void> => {
  const apiEndpoint: string = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  let response: AxiosResponse<GitHubContentItem[]>;
  try {
    console.log("gity", process.env);
    response = await axios.get(apiEndpoint, {
      method: "GET",
      headers: {
        Authorization: `token   ${process.env.GITHUB_API_KEY}`,
      },
    });
  } catch (err: any) {
    console.error(`Failed to read from GitHub: ${err.message}`);
    return;
  }

  for (const item of response.data) {
    if (item.type === "dir") {
      await readGitHubFiles(owner, repo, item.path);
    } else if (item.type === "file" && item.download_url) {
      await readRemoteFile(item.download_url);
    }
  }
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
      path = segments.slice(2).join("/");
    }

    return { owner, repo, path };
  } catch (err) {
    console.error("Invalid URL:", err);
    return null;
  }
};

export const githubUtils = { readGitHubFiles, extractGitHubUrl };
