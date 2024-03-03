const { OpenAI } = require("@langchain/openai");
const { LLMChain } = require("langchain/chains");
const {
  ChatPromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
  AIMessagePromptTemplate,
  HumanMessagePromptTemplate,
} = require("@langchain/core/prompts");
const {
  AIMessage,
  HumanMessage,
  SystemMessage,
} = require("@langchain/core/messages");

require("dotenv").config();

class LangChainModule {
  openai;
  promptTemplate;
  constructor(systemTemplate, humanTemplate) {
    this.openai = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9,
    });

    this.promptTemplate = ChatPromptTemplate.fromMessages([
      ["system", systemTemplate],
      ["human", humanTemplate],
    ]);
  }

  /**
   * lang chain prompt using template object
   */
  async prompt(text, from, to) {
    const formattedChatPrompt = await this.promptTemplate.formatMessages({
      input_language: from,
      output_language: to,
      text: text,
    });
    const response = await this.openai.invoke(formattedChatPrompt);
    console.log(response);
  }

  /**
   * lang chain prompt using fromTemplate
   * @param {} template
   * @param {*} humanTemplate
   * @param {*} promptText
   * @param {*} from
   * @param {*} to
   */
  async prompt2(template, humanTemplate, promptText, from, to) {
    const systemMessagePrompt =
      SystemMessagePromptTemplate.fromTemplate(template);
    const humanMessagePrompt =
      HumanMessagePromptTemplate.fromTemplate(humanTemplate);
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
      input_language: from,
      output_language: to,
      text: promptText,
    });
    const response = await this.openai.invoke(formattedChatPrompt);
    console.log(response);
  }

  /**
   * lang chain prompt using promptTemplate
   */
  async prompt3(template, humanTemplate, promptText, from, to) {
    const systemPrompt = new PromptTemplate({
      template: template,
      inputVariables: ["input_language", "output_language"],
    });

    const humanPrompt = new PromptTemplate({
      template: humanTemplate,
      inputVariables: ["text"],
    });

    const systemMessagePrompt = new SystemMessagePromptTemplate({
      prompt: systemPrompt,
    });
    const humanMessagePrompt = new HumanMessagePromptTemplate({
      prompt: humanPrompt,
    });
    const chatPrompt = ChatPromptTemplate.fromMessages([
      systemMessagePrompt,
      humanMessagePrompt,
    ]);
    const formattedChatPrompt = await chatPrompt.formatMessages({
      input_language: from,
      output_language: to,
      text: promptText,
    });
    const response = await this.openai.invoke(formattedChatPrompt);
    console.log(response);
  }
}

const systemTemplate =
  "You are a helpful assistant that translates {input_language} to {output_language}.";
const humanTemplate = "{text}";
const text = "I am learning langchain from langchin website";
const from = "English";
const to = "Marathi";

const oaM = new LangChainModule(systemTemplate, humanTemplate);
oaM.prompt(text, from, to);

// oaM.prompt2(
//   systemTemplate,
//   humanTemplate,
//   text,
//   from,
//   to
// );
// oaM.prompt3(systemTemplate, humanTemplate, text, from, to);
