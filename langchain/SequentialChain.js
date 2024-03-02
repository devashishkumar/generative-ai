const { SequentialChain, LLMChain } = require("langchain/chains");
const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
require("dotenv").config();

class RestaurantChainClass {
    async restaurantChainMethod() {
        try {
            const restaurantTemplate = "I want to open a restaurant for {productType} Food. Please suggest some good names for restaurant.";
            const foodItemsTemplate = "Suggest some menu items for {restaurant_name}.";
            const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });
            const promptTemplate = new PromptTemplate({
                template: restaurantTemplate,
                inputVariables: ["productType"]
            });
            const restaurantNamesChain = new LLMChain({
                llm,
                prompt: promptTemplate,
                outputKey: "restaurantNames",
            });

            // const menuLlm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });
            const menuTemplate = new PromptTemplate({
                template: foodItemsTemplate,
                inputVariables: ["restaurant_name"]
            });
            const restaurantNamesChain2 = new LLMChain({
                llm,
                prompt: menuTemplate,
                outputKey: "menus",
            });

            // sequential chain

            const sequentialChainObject = new SequentialChain({
                chains: [restaurantNamesChain, restaurantNamesChain2],
                inputVariables: ["productType", "restaurant_name"],
                // Here we return multiple variables
                outputVariables: ["restaurantNames", "menus"],
                verbose: true,
            });
            const chainResult = await sequentialChainObject.call({
                productType: "Indian",
                restaurant_name: "Indian",
            });
            console.log(chainResult);
        } catch (e) {
            console.log(e);
        }
    }
}

// const restaurantChainClassObj = new RestaurantChainClass();
// restaurantChainClassObj.restaurantChainMethod();

class LlmSequentialChainClass {
    // This is an LLMChain to write a synopsis given a title of a play and the era it is set in.
    async SequentialChainMethod() {
        const llm = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0 });
        const template = `You are a playwright. Given the title of play and the era it is set in, it is your job to write a synopsis for that title.

Title: {title}
Era: {era}
Playwright: This is a synopsis for the above play:`;
        const promptTemplate = new PromptTemplate({
            template,
            inputVariables: ["title", "era"],
        });
        const synopsisChain = new LLMChain({
            llm,
            prompt: promptTemplate,
            outputKey: "synopsis",
        });

        // This is an LLMChain to write a review of a play given a synopsis.
        const reviewLLM = new OpenAI({ temperature: 0 });
        const reviewTemplate = `You are a play critic from the New York Times. Given the synopsis of play, it is your job to write a review for that play.
  
   Play Synopsis:
   {synopsis}
   Review from a New York Times play critic of the above play:`;
        const reviewPromptTemplate = new PromptTemplate({
            template: reviewTemplate,
            inputVariables: ["synopsis"],
        });
        const reviewChain = new LLMChain({
            llm: reviewLLM,
            prompt: reviewPromptTemplate,
            outputKey: "review",
        });

        const overallChain = new SequentialChain({
            chains: [synopsisChain, reviewChain],
            inputVariables: ["era", "title"],
            // Here we return multiple variables
            outputVariables: ["synopsis", "review"],
            verbose: true,
        });
        const chainExecutionResult = await overallChain.call({
            title: "Tragedy at sunset on the beach",
            era: "Victorian England",
        });
        console.log(chainExecutionResult);
    }
}

// const classObj = new LlmSequentialChainClass();
// classObj.SequentialChainMethod();