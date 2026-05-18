import Groq from "groq-sdk";

let groq;

const getGroqClient = () => {
  if (!groq) {
    groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
  }
  return groq;
};

export const generateDescription = async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required for AI generation" });
    }

    const completion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional project manager assistant. Your goal is to provide a concise, professional task description. IMPORTANT: Never include links, URLs, websites, or any external references. Only provide the plain text description.",
        },
        {
          role: "user",
          content: `Task Title: ${title}. 
          Generate a concise, professional task description (under 300 words). 
          STRICT RULE: Do not include any links, URLs, websites, or external references. Provide ONLY the plain text description. No markdown links or formatted URLs allowed.`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    let description = (completion.choices[0]?.message?.content || "").trim();

    // Final safety check: Programmatically remove any sections starting with "Links" or containing URLs
    if (description.toLowerCase().includes("links:")) {
      description = description.split(/links:/i)[0];
    }
    
    // Remove any remaining URLs just in case
    description = description.replace(/https?:\/\/[^\s]+/g, "");
    description = description.trim();

    res.status(200).json({ description });
  } catch (error) {
    console.error("Groq Error:", error);
    const message = error.message || "Error generating description with Groq";
    res.status(500).json({ message });
  }
};

export const generateUrls = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: "Query (Website Name) is required for URL generation" });
    }

    const completion = await getGroqClient().chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an assistant that provides multiple useful URLs for a given website name or topic. Return ONLY a JSON array of strings.",
        },
        {
          role: "user",
          content: `Website Name/Topic: ${query}.  
          Return ONLY a JSON array of strings. Example: ["https://site.com/docs", "https://site.com/blog"]`,
        },
      ],
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
    });

    let content = completion.choices[0]?.message?.content || "[]";

    try {
      // Find the array in the response if it's wrapped in an object
      const data = JSON.parse(content);
      const urls = Array.isArray(data) ? data : (data.urls || Object.values(data).find(Array.isArray) || []);
      res.status(200).json({ urls });
    } catch (e) {
      // Fallback: regex to find URLs
      const urlRegex = /(https?:\/\/[^\s,]+)/g;
      const urls = content.match(urlRegex) || [];
      res.status(200).json({ urls });
    }
  } catch (error) {
    console.error("Groq Error:", error);
    const message = error.message || "Error generating URLs with Groq";
    res.status(500).json({ message });
  }
};
