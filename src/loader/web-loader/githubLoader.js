import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import ignore from "ignore";

const loader = new GithubRepoLoader(
  "https://github.com/Colin3191/langchain-js-demo",
  {
    branch: "master",
    recursive: false,
    unknown: "warn",
    ignorePaths: ["*.md", "yarn.lock", "*.json"],
  }
);

const docs = await loader.load();

console.log(docs);

