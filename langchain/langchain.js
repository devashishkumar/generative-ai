const { OpenAI } = require("@langchain/openai");
const {PromptTemplate} = require("@langchain/core/prompts");
const {LLMChain} = require("langchain/chains");

require("dotenv").config();

class LangChainModule {
    
  openai;
  promptTemplate;
  llmChain;
  template = "What would be a good company name that makes {product}?"
  constructor() {
    this.openai = new OpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.9
    });
    this.promptTemplate = new PromptTemplate({
        template: this.template,
        inputVariables: ["product"]
    });
    this.llmChain = new LLMChain({
        llm: this.openai,
        prompt: this.promptTemplate
    });
  }

  async callMethod(text) {
    const res = await this.openai.call(text);
    console.log(res);
  }

  /**
   * lang chain prompt
   */
  async prompt() {
    const formattedPrompt = await this.promptTemplate.format({
        product: "colorful clothes"
    });
    console.log(formattedPrompt);
  }

  /**
   * llm chain method
   */
  async llmChainMethod() {
    const response = await this.llmChain.call({
        product: "colorful ice creams"
    });
    console.log(response);
  }
}

const oaM = new LangChainModule();
oaM.callMethod("What would be a good company name that makes colurful socks ?");
// oaM.prompt();
// oaM.llmChainMethod();