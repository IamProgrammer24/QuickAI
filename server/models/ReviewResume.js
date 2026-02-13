import mongoose from "mongoose";

const reviewResumeSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // change to mongoose.Schema.Types.ObjectId if referencing User model
      required: true,
      index: true,
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
  },
);

const ReviewResume = mongoose.model("ReviewResume", reviewResumeSchema);

export default ReviewResume;
