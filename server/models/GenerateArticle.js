import mongoose from "mongoose";

const generateArticleSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    prompt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const GenerateArticle = mongoose.model(
  "GenerateArticle",
  generateArticleSchema
);

export default GenerateArticle;
