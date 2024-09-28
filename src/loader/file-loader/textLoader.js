import { TextLoader } from "langchain/document_loaders/fs/text";
import { fileURLToPath } from 'url';
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loader = new TextLoader(join(__dirname, "data/gaicibi.txt"));

const docs = await loader.load();

console.log(docs);
