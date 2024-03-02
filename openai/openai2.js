const OpenAI = require("openai");
require("dotenv").config();

class OpenAiModule {
  openai;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }
  async generateText(text) {
    const response = await this.openai.completions.create({
      model: "text-davinci-003",
      prompt: text,
      temperature: 1,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    console.log(response);
  }
  async generateChatText(text) {
    const response = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }]
    });
    console.log(response.choices);
  }
  async streamResponses(text) {
    const stream = await this.openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      stream: true,
    });
    for await (const part of stream) {
      process.stdout.write(part.choices[0]?.delta?.content || "");
    }
  }
}

const oaM = new OpenAiModule();
oaM.streamResponses("Rahul Dravid");