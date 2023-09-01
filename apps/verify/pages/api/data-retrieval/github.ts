import axios, { AxiosResponse } from "axios";
import readRemoteFile, { fileInfo } from "../../../utils/readRemoteFiles";
import { NextApiRequest, NextApiResponse } from "next";
import extractGithubUrl from "../../../utils/extractGithubUrl";
import { GitHubComponents } from "../../../utils/extractGithubUrl";

type GitHubContentItem = {
  type: "dir" | "file";
  download_url: string | null;
  path: string;
};

export default async function processApiRequest(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    const { githubUrl } = req.body;
    const gitHubComponents: GitHubComponents | null =
      extractGithubUrl(githubUrl);
    if (gitHubComponents !== null && gitHubComponents.owner) {
      const retrievedFiles = await retrieveGithubFile(
        gitHubComponents.owner,
        gitHubComponents.repo,
        gitHubComponents.path,
      );
      res.status(200).json(retrievedFiles);
    } else {
      res.status(400).json({ error: "Bad github url" });
    }

    return;
  } catch (err: any) {
    console.error(`Failed to read from GitHub: ${err.message}`);
    res.status(500).json({ Error: err });
    return;
  }
}

const retrieveGithubFile = async (
  owner: string,
  repo: string,
  path: string = "",
): Promise<fileInfo[]> => {
  const files: fileInfo[] = [];
  const apiEndpoint: string = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  let response: AxiosResponse<GitHubContentItem[] | GitHubContentItem>;
  response = await axios.get(apiEndpoint, {
    method: "GET",
    headers: {
      Authorization: `token   ${process.env.GITHUB_API_KEY}`,
    },
  });

  if (Array.isArray(response.data)) {
    for (const item of response.data) {
      if (item.type === "dir") {
        await retrieveGithubFile(owner, repo, item.path);
      } else if (item.type === "file" && item.download_url) {
        const file = await readRemoteFile(item.download_url);
        if (file !== null) {
          files.push(...file);
        }
      }
    }
  } else {
    if (response.data.download_url) {
      const file = await readRemoteFile(response.data.download_url);
      if (file !== null) {
        files.push(...file);
      }
    }
  }
  return files;
};
