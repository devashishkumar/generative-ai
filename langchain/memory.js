const { OpenAI } = require("langchain/llms/openai");
const { BufferMemory } = require("langchain/memory");
const { ConversationChain } = require("langchain/chains");

require("dotenv").config();

class LangChainMemory {
    model;
    memory;
    chain;
    constructor() {
        this.model = new OpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            temperature: 0.9
        });
        this.memory = new BufferMemory();
        this.chain = new ConversationChain({
            llm: this.model,
            memory: this.memory
        });
    }

    async conversation() {
        const response = await this.chain.call({
            input: "Hi, I am Rahul"
        });
        console.log(response);
    }

    async conversation2() {
        const response = await this.chain.call({
            input: "Hi, What is my name ?"
        });
        console.log(response);
    }
}

const memoryObj = new LangChainMemory();
memoryObj.conversation();
memoryObj.conversation2();