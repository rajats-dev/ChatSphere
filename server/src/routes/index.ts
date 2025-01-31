import { Router } from "express";
import AuthController from "../controller/AuthController.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import ChatGroupController from "../controller/ChatGroupController.js";
import ChatsController from "../controller/ChatsController.js";
const router = Router();

// Auth Routes
router.post("/auth/login", AuthController.login);

// Chat Group Routes
router.get("/chat-group", authMiddleware, ChatGroupController.index);
router.get("/chat-group:id", ChatGroupController.show);
router.post("/chat-group", authMiddleware, ChatGroupController.store);
router.put("/chat-group/:id", authMiddleware, ChatGroupController.update);
router.delete("/chat-group/:id", authMiddleware, ChatGroupController.destroy);

// * Chats
router.get("/chats/:groupId", ChatsController.index);

export default router;
