import * as readline from 'node:readline/promises';
import fs from "fs/promises";
import { graphVisualize } from "./common/graphVisualize.js"
import { customReActAgent } from "./customStateGraphBuilder.js";
import { prebuiltReActAgent } from "./prebuiltStateGraphBuilder.js";

const instructions = await fs.readFile("./common/systemPrompt.txt", "utf-8");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
let messages = [{ role: "system", content: instructions + `\n Todays Date: ${new Date()}` }];

const reActAgent = (process.env.STATE_GRAPH_CHOICE === "PREBUILT") ? prebuiltReActAgent : customReActAgent;
graphVisualize(reActAgent);

const main = async () => {
    while (true) {
        const userPrompt = await rl.question('Your Query: ');
        if (userPrompt === '/bye') {
            break;
        }
        messages.push({ role: "user", content: userPrompt });

        const result = await reActAgent.invoke({ messages: messages }, { configurable: { thread_id: "1" } });

        console.log(`Assistant: ${result.messages.pop().content}`);
    }
}

await main()
    .finally(() => {
        console.warn(`\nBye!\n`);
        rl.close()
    });