# What are ReAct Agents?

At their core, (Re)ason + (Act) agents are an architectural pattern for building AI applications. They empower a Large Language Model (LLM) to perform complex tasks by dynamically choosing and executing external tools. These tools are real-world centric, allowing the agent to make payments, set calendar events, log tickets, and more.

### The Core Technical Components:

- The Reasoning Engine (The LLM): This is the agent's brain not just for generating a final response, but for chain-of-thought reasoning to pick a tool and execute

    > Observation, on user's prompt -> Reasoning, generating an internal monologue -> command to use a specific tool Action

    **This internal reasoning process is what allows the agent to handle complex, multi-step requests.**

- The Toolset (The Executor): Interacts with outside world such as APIs, CRUD operations, functions etc. 

    > The output from a tool -> sent back for observation. 

    **This iterative process allows them to adapt to real-time changes or handle unexpected tool errors.**

### Building for Production: 
#### The Role of Frameworks: LangGraph

While a simple ReAct loop can be built with a prompt, production-grade agents require more control. This is where frameworks like **LangGraph** come in.

- Beyond the Loop: LangGraph defines a directed graph, each node represents a specific state or action in agent's workflow. This moves beyond a simple, linear loop. A node can be an LLM call, a tool execution, or a human-in-the-loop checkpoint. Edge can be simple or conditional.

- Prebuilt and Custom graphs: the above State graph can be 
    -   Prebuilt, OOTB: where the LLM has more autonomy in tool execution. But reliability is subjective. Eg: Searching. 
    -   Custom Graph: using your own builder to defining nodes and edges, fallback states. Thus more controlled for guardrails safety, reliable outputs but controlled, programmatic autonomy for LLMs. Eg: Critical financial application.

Pick your flavour!

#### Final Thoughts:

What it means to your existing codebase: which likely contains many CRUD operations, ReAct agents can wrap around the CRUD functions as tools, you can create inject NLP agents that now interacts with your entire application! This means users can issue commands in plain English to execute business logic across your SaaS applications! Or another SLM can do a A2A interaction! More on the way.

I've created a CRUD Agent leveraging both Prebuilt and Custom Graphs builder of LangGraph to perform a event scheduling with date, subject and description, along with internet searching capabilities. This is for my understanding of how we can wrap the existing CRUD methods and give them as tool for LLM to take over, of course with guardrails safety!

<img width="1642" height="487" alt="image-2" src="https://github.com/user-attachments/assets/767ccf74-30e5-40dd-9c32-08566973331d" />
<p align="center">
<img alt="image-2" src="https://github.com/user-attachments/assets/c2a88e37-0537-4318-b131-81a9a56fdaf5" />
</p>
