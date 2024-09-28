import { SerpAPILoader } from "@langchain/community/document_loaders/web/serpapi";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

const question = "langchain js docs";
const loader = new SerpAPILoader({ q: question, apiKey: process.env.SERPAPI_API_KEY });
const docs = await loader.load();

console.log(docs);
