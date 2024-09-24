import { Ollama } from "@langchain/ollama";

const ollama = new Ollama({
  baseUrl: "http://127.0.0.1:11434",
  model: "qwen2.5", 
});

const res = await ollama.invoke("讲个笑话")

console.log(res); 
