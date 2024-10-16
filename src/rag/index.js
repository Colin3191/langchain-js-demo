import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings, Ollama } from "@langchain/ollama";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const model = new Ollama({
  baseUrl: "http://127.0.0.1:11434",
  model: "qwen2.5",
});

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 500,
  chunkOverlap: 100,
});

const loader = new TextLoader(path.resolve(__dirname, "./data/gaicibi.txt"));
const docs = await loader.load();
const splitDocs = await splitter.splitDocuments(docs);
const embeddings = new OllamaEmbeddings({ model: "shaw/dmeta-embedding-zh" });
const directory = path.resolve(__dirname, "./db/gaicibi");
const vectorstore = await FaissStore.load(directory, embeddings);

// const retriever = vectorstore.asRetriever(2);
const retriever = MultiQueryRetriever.fromLLM({
  llm: model,
  retriever: vectorstore.asRetriever(3),
  queryCount: 3,
  verbose: true,
});
const res = await retriever.invoke("盖茨比和谁谈过恋爱");
console.log(res);

// const res = await model.invoke("讲个笑话");
