import mongoose from "mongoose";

const generateBlogTitleSchema = new mongoose.Schema(
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

const GenerateBlogTitle = mongoose.model(
  "GenerateBlogTitle",
  generateBlogTitleSchema
);

export default GenerateBlogTitle;
