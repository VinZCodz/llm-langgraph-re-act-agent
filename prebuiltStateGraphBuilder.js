import { ChatGroq } from "@langchain/groq";
import { MemorySaver } from "@langchain/langgraph";
import { availableTools } from "./common/tools.js";
import { createReactAgent } from "@langchain/langgraph/prebuilt";

const model = new ChatGroq({
    model: process.env.MODEL,
});

/**
* Provides lang graph's prebuilt State Graph.
* State and nodes is not managed by user.
* Has more autonomous execution, reliability subjective.
* With check pointer memory: non persistent.
*/
export const prebuiltReActAgent = createReactAgent({
    llm: model,
    tools: availableTools,
    checkpointer: new MemorySaver()
});