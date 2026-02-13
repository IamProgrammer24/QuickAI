import GenerateArticle from "../models/GenerateArticle.js";
import GenerateImage from "../models/GenerateImage.js";

export const getUserCreation = async (req, res) => {
  try {
    const { userId } = req.auth();

    // get all creations of the logged-in user
    const creations = await GenerateArticle.find({ userId });

    if (!creations || creations.length === 0) {
      return res.json({
        success: true,
        message: "No creations found",
        creations: [],
      });
    }

    return res.json({
      success: true,
      creations,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const getPublishedCreation = async (req, res) => {
  try {
    // get all published creations
    const publishCreations = await GenerateImage
      .find({ publish: true })
      .sort({ createdAt: -1 });

    if (!publishCreations || publishCreations.length === 0) {
      return res.json({
        success: true,
        message: "No publish creations found",
        creations: [],
      });
    }

    return res.json({
      success: true,
      creations: publishCreations,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

export const toggleLikeCreation = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { id } = req.body;


    // find image by Mongo _id
    const image = await GenerateImage.findById(id);

    if (!image) {
      return res.json({
        success: false,
        message: "Image not found",
      });
    }

    // check if already liked
    const alreadyLiked = image.likes.includes(userId);

    if (alreadyLiked) {
      // remove like
      image.likes = image.likes.filter(uid => uid !== userId);
    } else {
      // add like
      image.likes.push(userId);
    }

    await image.save();

    return res.json({
      success: true,
      message: alreadyLiked ? "Like removed" : "Image liked",
      likesCount: image.likes.length,
      likes: image.likes,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};
