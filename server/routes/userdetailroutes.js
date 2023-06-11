import express from "express";
import {
    getUser,
    getUserFriends,
    addRemoveFriend
} from "../controller/userdetailController.js";
import { verifyToken } from "../middleware/auth.js";
const router = express.Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id", verifyToken, getUserFriends);

// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;