import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loader = new TextLoader(
  join(__dirname, "../loader/fileLoader/data/gaicibi.txt")
);
const docs = await loader.load();

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 200,
  chunkOverlap: 60,
});

const splitDocs = await splitter.splitDocuments(docs);

console.log(splitDocs);
