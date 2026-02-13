import GenerateArticle from "../models/GenerateArticle.js";
import GenerateBlogTitle from "../models/GenerateBlogTitle.js";
import GenerateImage from "../models/GenerateImage.js";
import ReviewResume from "../models/ReviewResume.js";

const normalizeData = (item, type) => ({
  id: item._id,
  user_id: item.userId,
  prompt: item.prompt || "",
  content: item.content || "",
  type,
  publish: item.publish ?? false,
  likes: item.likes || [],
  created_at: item.createdAt,
  updated_at: item.updatedAt,
});

export const getUnifiedCreations = async (userId) => {
  const article = await GenerateArticle.find({userId});
  const blogTitle = await GenerateBlogTitle.find({userId});
  const image = await GenerateImage.find({userId});
  const resume = await ReviewResume.find({userId});

  const unifiedData = [
    ...article.map(item => normalizeData(item, "Article")),
    ...blogTitle.map(item => normalizeData(item, "Blog-Title")),
    ...image.map(item => normalizeData(item, "Image")),
    ...resume.map(item =>normalizeData(item, "Resume"))
  ];

  // Optional: sort latest first
  unifiedData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return unifiedData;
};
