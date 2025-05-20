export const fetchAIInsights = async (prompt) => {
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful assistant that gives weather insights in Bengali.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
          temperature: 0.7,
        }),
      });
  
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("AI fetch error:", error);
      return "AI থেকে তথ্য আনতে ব্যর্থ হয়েছি।";
    }
  };
  