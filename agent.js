import { ChatGroq } from "@langchain/groq";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import fs from "fs/promises";
import { availableTools } from "./tools.js";
import * as readline from 'node:readline/promises';
import { MemorySaver } from "@langchain/langgraph";


const instructions = await fs.readFile("systemPrompt.txt", "utf-8");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let messages = [{ role: "system", content: instructions+`\n Todays Date: ${new Date()}` }];

const main = async () => {
    const model = new ChatGroq({
        model: process.env.MODEL,
    });

    const agent = createReactAgent({
        llm: model,
        tools: availableTools,
        checkpointer: new MemorySaver()
    });

    while (true) {
        const userPrompt = await rl.question('Your Query: ');
        if (userPrompt === '/bye') {
            break;
        }
        messages.push({ role: "user", content: userPrompt });

        const result = await agent.invoke({ messages: messages }, { configurable: { thread_id: "1" } });

        console.log(`Assistant: ${result.messages.pop().content}`);
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
        rl.close()
    });