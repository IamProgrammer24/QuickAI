import mongoose from "mongoose";

const generateImageSchema = new mongoose.Schema(
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
      required: true,
    },

    publish: {
      type: Boolean,
      default: false,
    },
    likes: [String]
  },
  { timestamps: true }
);

const GenerateImage =
  mongoose.model("GenerateImage", generateImageSchema);

export default GenerateImage;
