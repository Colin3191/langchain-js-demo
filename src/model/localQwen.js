import { Ollama } from "@langchain/ollama"; // 使用了import语句，package.json 中需要指定 type: module

const ollama = new Ollama({
  baseUrl: "http://127.0.0.1:11434",
  model: "qwen2.5",
});

const res = await ollama.invoke("讲个笑话");

console.log(res);
