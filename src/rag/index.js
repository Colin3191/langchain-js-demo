import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { EPubLoader } from "@langchain/community/document_loaders/fs/epub";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OllamaEmbeddings, Ollama } from "@langchain/ollama";
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { MultiQueryRetriever } from "langchain/retrievers/multi_query";
import { RunnableSequence } from "@langchain/core/runnables";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { LLMChainExtractor } from "langchain/retrievers/document_compressors/chain_extract";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { ScoreThresholdRetriever } from "langchain/retrievers/score_threshold";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const model = new Ollama({
  baseUrl: "http://127.0.0.1:11434",
  model: "qwen2.5",
});

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 100,
// });
// const loader = new TextLoader(path.resolve(__dirname, "./data/beitaoyan.txt"));
// const loader = new EPubLoader(
//   path.resolve(__dirname, "./data/beitaoyan.epub")
// );
// const docs = await loader.load();
// const splitDocs = await splitter.splitDocuments(docs);
// const vectorStore = await FaissStore.fromDocuments(splitDocs, embeddings);
// await vectorStore.save(directory);

const directory = path.resolve(__dirname, "./db/beitaoyan");
const embeddings = new OllamaEmbeddings({ model: "shaw/dmeta-embedding-zh" });
const vectorStore = await FaissStore.load(directory, embeddings);

// const retriever = vectorStore.asRetriever(2);
// const retriever = MultiQueryRetriever.fromLLM({
//   llm: model,
//   retriever: vectorStore.asRetriever(2),
//   queryCount: 3,
//   verbose: false,
// });
// const compressor = LLMChainExtractor.fromLLM(model);
// const retriever = new ContextualCompressionRetriever({
//   baseCompressor: compressor,
//   baseRetriever: vectorStore.asRetriever(3),
// });
const retriever = ScoreThresholdRetriever.fromVectorStore(vectorStore, {
  minSimilarityScore: 0.8,
  maxK: 5,
  kIncrement: 1,
});
const convertDocsToString = (documents) => {
  return documents.map((document) => document.pageContent).join("\n");
};
const contextRetriverChain = RunnableSequence.from([
  (input) => input.question,
  retriever,
  convertDocsToString,
]);

const TEMPLATE = `
你是一个熟读《被讨厌的勇气》的终极原著党，精通根据作品原文详细解释和回答问题，你在回答时会引用作品原文。
并且回答时仅根据原文，尽可能回答用户问题，如果原文中没有相关内容，你可以回答“原文中没有相关内容”，

以下是原文中跟用户回答相关的内容：
{context}

现在，你需要基于原文，回答以下问题：
{question}`;

const prompt = ChatPromptTemplate.fromTemplate(TEMPLATE);

const ragChain = RunnableSequence.from([
  {
    context: contextRetriverChain,
    question: (input) => input.question,
  },
  prompt,
  model,
  new StringOutputParser(),
]);

const answer = await ragChain.invoke({
  question: "在意别人的看法和童年的经历有关吗",
});
console.log(answer);
