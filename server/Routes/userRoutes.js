import express from "express";
import { getPublishedCreation, toggleLikeCreation } from "../controllers/userController.js";
import { auth } from "../middlewares/auth.js";
import { fetchUnifiedCreations } from "../controllers/unifiedController.js";

const userRouter = express.Router();

userRouter.get('/get-user-creations', auth, fetchUnifiedCreations)
userRouter.get('/get-published-creations', auth, getPublishedCreation)
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation)

export default userRouter;



