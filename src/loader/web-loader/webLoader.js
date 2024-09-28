import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const loader = new CheerioWebBaseLoader(
  "https://juejin.cn/post/7049770996231831559"
);

const docs = await loader.load();

console.log(docs);
