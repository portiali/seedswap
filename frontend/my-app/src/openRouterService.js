// src/openRouterService.js
import axios from 'axios';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export const getSeedCompatibility = async (seed1, seed2) => {
  const prompt = `You're a helpful gardening assistant. A user wants to swap "${seed1}" with "${seed2}". Based on common companion planting wisdom, are these seeds compatible? Give a short and friendly response.`;

  try {
    const response = await axios.post(
      API_URL,
      {
        model: "openchat/openchat-7b", // Or try "google/gemini-pro", "mistralai/mistral-7b-instruct", etc.
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching compatibility:", error);
    return "Oops! Couldn't check compatibility right now.";
  }
};