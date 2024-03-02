const displayApiKey = () => {
    return "key";
};

const langChainCode = () => {
    return "langchain";
}

const  OpenAI = require( "openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateText(text) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: text }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices);
}

module.exports = {displayApiKey, langChainCode, generateText};