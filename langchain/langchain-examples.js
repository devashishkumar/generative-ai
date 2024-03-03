const { OpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");
const { LLMChain } = require("langchain/chains");

require("dotenv").config();

class LangChainModule {
  openai;
  promptTemplate;
  constructor(temp) {
    this.openai = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9,
    });

    // first way to create prompt template
    this.promptTemplate = new PromptTemplate({
      template: temp,
      inputVariables: ["country"],
    });

    // second way to create prompt template
    this.promptTemplate = PromptTemplate.fromTemplate(
        temp
      );
  }

  async callMethod(text) {
    const res = await this.openai.call(text);
    console.log(res);
  }

  /**
   * lang chain prompt
   */
  async prompt(text) {
    const formattedPrompt = await this.promptTemplate.format({
      country: text,
    });
    const response = await this.openai.invoke(formattedPrompt);
    console.log(response);
  }
}

const oaM = new LangChainModule(
  "What is the national animal and national bird of {country}?"
);
// oaM.callMethod("What is the capital of India ?");
oaM.prompt("India");
