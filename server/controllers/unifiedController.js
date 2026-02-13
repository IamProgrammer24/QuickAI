import { getUnifiedCreations } from "../services/unifiedCreationService.js";

export const fetchUnifiedCreations = async (req, res) => {
  try {
    const { userId } = req.auth();
    const data = await getUnifiedCreations(userId);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
