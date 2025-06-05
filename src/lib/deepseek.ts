
const DEEPSEEK_API_KEY = "sk-ca439bf41bdf4242a47ec60fae562df4";
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

export const fetchFromDeepSeek = async (userInput: string, systemPrompt?: string): Promise<string> => {
  try {
    console.log('Sending request to DeepSeek API...');
    
    const messages = [
      {
        role: "system",
        content: systemPrompt ||
          "You are BILIMAI, a friendly AI language coach created by Emilbek. When asked about your creator or owner, always state that you were created by Emilbek and belong to him. Help users improve their language skills through engaging conversation. Be encouraging, helpful, and provide gentle corrections when needed."
      },
      {
        role: "user",
        content: userInput
      }
    ];

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: messages,
        max_tokens: 500,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) {
      console.error('DeepSeek API response not ok:', response.status, response.statusText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('DeepSeek API response:', data);

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content.trim();
    } else {
      throw new Error("No response content from DeepSeek API");
    }
  } catch (error) {
    console.error('Error calling DeepSeek API:', error);
    throw new Error("Failed to get response from AI. Please check your connection and try again.");
  }
};
