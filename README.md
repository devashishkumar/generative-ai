### Documentation

Simple Node JS based Generiative AI App

### How to use Open AI API Key ?

```sh
1. Create an API Key from Open AI website. Please watch this video. How to get an Open AI API Key ? (https://www.youtube.com/watch?v=nafDyRsVnXU)
2. Create .env file in the application and add Open AI API Key like this:
OPENAI_API_KEY=your api key
3. Execute command in application root 'npm install'
4. Install nodemon package in your machine using command 'npm install -g nodemon'
5. Execute command 'nodemon start' in your application root location
```

### gpt-3.5-turbo vs text-davinci-003

- text-davinci-003 is a tool that is powerful in the right hands, but it takes the correct type of input to harness the capabilities. A davinci chatbot is more prone to safety and jailbreak concerns. It will generate whatever text looks best following the user input given the particular context. text-davinci-003' has been recently deprecated and to replace it with "gpt-3.5-turbo-instruct".

- Currently points to gpt-3.5-turbo-0125. training data up to Sep 2021

### [Chat GPT Models Reference](https://platform.openai.com/docs/models/gpt-3-5-turbo)

### "add @langchain/openai module, use different type of prompts like ChatPrompt, SystemPrompt and HumanPrompt