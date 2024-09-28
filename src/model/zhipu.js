import { ChatZhipuAI } from "@langchain/community/chat_models/zhipuai";
import dotenv from "dotenv";

dotenv.config({path: "../.env"});

const model = new ChatZhipuAI({
  zhipuAIApiKey: process.env.ZHIPUAI_API_KEY,
  model: "glm-4",
});

const res = await model.invoke("讲个笑话");

console.log(res);
