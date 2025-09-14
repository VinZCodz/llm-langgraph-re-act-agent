import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { writeFileSync } from "node:fs";

let msgReadyToStream = false;
let embeddingReady = false;

const knowledgeSystemNode = (state) => {
    console.log("Knowledge propagating!");
    return state;
}

const repositoryNode = (state) => {
    console.log("Knowledge stored on my several stores!");
    return state;
}

const queueNode = (state) => {
    msgReadyToStream = true;
    console.log("Knowledge packets are ready to be streamed!");
    return state;
}

const isMsgReadyToStream = () => {
    if (msgReadyToStream)
        return "ingestWorkerNode";
    else
        return "queueNode";
}

const ingestWorkerNode = (state) => {
    console.log("Process the doc!");
    return state;
}

const isEmbeddingReady = () => {
    if (embeddingReady)
        return "vectorStoreNode";
    else
        return "embeddingModelNode";
}

const embeddingModelNode = (state) => {
    embeddingReady = true;
    console.log("Embeddings for doc ready!");
    return state;
}

const vectorStoreNode = (state) => {
    console.log("Store the embeddings of the doc!");
    return state;
}

const ragIngestionGraph = new StateGraph(MessagesAnnotation)
    .addNode("knowledgeSystemNode", knowledgeSystemNode)
    .addEdge("__start__", "knowledgeSystemNode")
    .addNode("repositoryNode", repositoryNode)
    .addEdge("knowledgeSystemNode", "repositoryNode")
    .addNode("queueNode", queueNode)
    .addEdge("repositoryNode", "queueNode")
    .addNode("ingestWorkerNode", ingestWorkerNode)
    .addConditionalEdges("queueNode", isMsgReadyToStream)
    .addNode("embeddingModelNode", embeddingModelNode)
    .addNode("vectorStoreNode", vectorStoreNode)
    .addConditionalEdges("ingestWorkerNode", isEmbeddingReady)
    .addEdge("embeddingModelNode", "ingestWorkerNode")
    .addEdge("vectorStoreNode", "__end__");

const ingestionProcess = ragIngestionGraph.compile();

const main = async () => {
    const drawableGraphGraphState = await ingestionProcess.getGraphAsync();
    const graphStateImage = await drawableGraphGraphState.drawMermaidPng();
    const graphStateArrayBuffer = await graphStateImage.arrayBuffer();

    const filePath = "./graphState.png";
    writeFileSync(filePath, new Uint8Array(graphStateArrayBuffer));

    const finalState = await ingestionProcess.invoke({ messages: [] });
    console.log(finalState);
}

main();

