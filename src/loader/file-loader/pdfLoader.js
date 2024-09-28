import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { fileURLToPath } from 'url';  
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const loader = new PDFLoader(join(__dirname, "data/helloWorld.pdf"));

const docs = await loader.load();

console.log(docs);