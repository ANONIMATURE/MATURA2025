// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      generationConfig,
    });

    const prompt =
      "Stwórz chwytliwe i krótkie zdanie promujące Discorda dla maturzystów. Skup się na zachęceniu do dołączenia, podkreślając dostęp do materiałów, przecieków arkuszy i wsparcia.";
    const result = await model.generateContent(prompt);
    const text = result?.response?.content || "Default Tweet Text"; // Fallback text
    console.log(text);
    sendTweet(text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}
