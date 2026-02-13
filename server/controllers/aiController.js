import OpenAI from "openai";
import GenerateArticle from "../models/GenerateArticle.js";
import { clerkClient } from "@clerk/express";
import GenerateBlogTitle from "../models/GenerateBlogTitle.js";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import GenerateImage from "../models/GenerateImage.js";
import fs from "fs";
import { createRequire } from "module";
import ReviewResume from "../models/ReviewResume.js";
import FormData from "form-data";
import getDataUri from "../configs/datauri.js";


const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;

    // Create and save article
    const newArticle = new GenerateArticle({
      userId,
      prompt,
      content,
    });
    await newArticle.save();

    if (plan != "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateBlogTitle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    console.log("Thisi spromt", prompt);
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({
        success: false,
        message: "Limit reached. Upgrade to continue",
      });
    }

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    });

    const content = response.choices[0].message.content;
    console.log("blog-Title: ", content);

    // Create and save article
    const newArticle = new GenerateBlogTitle({
      userId,
      prompt,
      content,
    });
    await newArticle.save();

    if (plan != "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }

    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, publish } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      },
    );

    const base64Image = `data:image/png;base64,${Buffer.from(data).toString("base64")}`;

    const { secure_url } = await cloudinary.uploader.upload(base64Image);

    const newImage = new GenerateImage({
      userId,
      prompt,
      content: secure_url,
      publish,
    });

    await newImage.save();

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const removeImageBackground = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const { image } = req.file;
//     const plan = req.plan;

//     if (plan !== "premium") {
//       return res.json({
//         success: false,
//         message: "This feature is only avilable for premium subscriptions",
//       });
//     }

//     const {secure_url} = await cloudinary.uploader.upload(image.path, {
//       transformation: {
//         effect: 'background_removal',
//         background_removal: 'remove_the_background'
//       }
//     })

//     // Create and save article
//     const newArticle = new GenerateImage({
//       userId,
//       prompt : "Remove backgound form image",
//       content: secure_url,
//     });
//     await newArticle.save();

//     res.json({ success: true, content: secure_url });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

export const removeImageBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;

    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    if (!image) {
      return res.json({
        success: false,
        message: "Image file is required",
      });
    }
    const imageUri = getDataUri(image);

    const { secure_url } = await cloudinary.uploader.upload(imageUri.content, {
      transformation: [{ effect: "background_removal" }],
    });

    const newArticle = new GenerateImage({
      userId,
      prompt: "Remove background from image",
      content: secure_url,
    });

    await newArticle.save();

    res.json({ success: true, content: secure_url });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { object } = req.body;
    const image = req.file;
    const plan = req.plan;

    // Check premium plan
    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    // Validate image
    if (!image) {
      return res.json({
        success: false,
        message: "Image file is required",
      });
    }

    // Validate object
    if (!object) {
      return res.json({
        success: false,
        message: "Object name is required",
      });
    }

    // Convert to DataURI
    const imageUri = getDataUri(image);

    // Upload image
    const uploadResult = await cloudinary.uploader.upload(imageUri.content);

    // Generate transformed image URL
    const imageUrl = cloudinary.url(uploadResult.public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
    });
    console.log(imageUrl);

    // Save record
    const newArticle = new GenerateImage({
      userId,
      prompt: `Removed ${object} from image`,
      content: imageUrl,
    });

    await newArticle.save();

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// export const resumeReview = async (req, res) => {
//   try {
//     const { userId } = req.auth();
//     const resume = req.file;
//     const plan = req.plan;

//     if (plan !== "premium") {
//       return res.json({
//         success: false,
//         message: "This feature is only avilable for premium subscriptions",
//       });
//     }

//     if(resume.size > 5*1024 *1024){
//       return res.json({
//         success: false,
//         message: "File size is greater than 5MB"
//       })
//     }
//     const dataBuffer = fs.readFileSync(resume.path);
//     const pdfData = await pdf(dataBuffer);

//     const prompt = `Review the following resume and provide constructive feedback on its strengths,
//     weaknesses, and areas for imporvement. Resume Content:\n\n${pdfData.text}`

//     const response = await AI.chat.completions.create({
//       model: "gemini-2.0-flash",
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 1000,
//     });

//     const content = response.choices[0].message.content;

//     // Create and save article
//     const newResume = new ReviewResume({
//       userId,
//       prompt : "Review the uploaded resume",
//       content,
//     });
//     await newResume.save();

//     res.json({ success: true, content });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };

export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file;
    const plan = req.plan;

    // Plan check
    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only available for premium subscriptions",
      });
    }

    // File check
    if (!resume) {
      return res.json({
        success: false,
        message: "Resume file is required",
      });
    }

    // File type check
    if (resume.mimetype !== "application/pdf") {
      return res.json({
        success: false,
        message: "Only PDF files are allowed",
      });
    }

    // File size check
    if (resume.size > 5 * 1024 * 1024) {
      return res.json({
        success: false,
        message: "File size must be less than 5MB",
      });
    }
    console.log(pdf);

    // Parse PDF from buffer
    const pdfData = await pdf(resume.buffer);

    const prompt = `Review the following resume and provide constructive feedback on its strengths,
weaknesses, and areas for improvement.

Resume Content:
${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-3-flash-preview",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    const newResume = new ReviewResume({
      userId,
      prompt: "Review the uploaded resume",
      content,
    });

    await newResume.save();

    res.json({ success: true, content });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
