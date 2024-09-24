# WIP:《Langchain.js入门和实战》学习笔记

## 使用 Langchain JS 调用本地通义千问

### 安装 Ollama

请访问 [Ollama 网站](https://ollama.com/) 并安装适用于您平台（mac、windows、linux）的版本。

安装完成后，执行以下命令以运行 Qwen 2.5：

```bash
ollama run qwen2.5
```

> **注意**: Ollama 默认运行在 `11434` 端口。

如果你想使用其他模型，可以替换 qwen2.5 为其他模型名称。其他的模型可以在 [这里](https://ollama.com/models) 查看。

### 初始化项目

```bash
mkdir ai-demo
cd ai-demo
yarn init -y
```

### 安装依赖

```bash
yarn add @langchain/core @langchain/ollama
```

### 代码

```js
// index.js
import { Ollama } from "@langchain/ollama"; // 使用了import语句，package.json 中需要指定 type: module

const ollama = new Ollama({
  baseUrl: "http://127.0.0.1:11434",
  model: "qwen2.5", 
});

const res = await ollama.invoke("讲个笑话")

console.log(res); 

```

执行 node index.js 即可看到结果。
