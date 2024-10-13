const express = require("express");
const userController = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Endpoint para obter todos os usuários (protegido)
router.get("/users", verifyToken, userController.getAllUsers);

// Endpoint para obter um usuário específico por ID (protegido)
router.get("/users/:id", verifyToken, userController.getUserById);

// Endpoint para atualizar um usuário específico por ID (protegido)
router.put("/users/:id", verifyToken, userController.updateUser);

// Endpoint para deletar um usuário específico por ID (protegido)
router.delete("/users/:id", verifyToken, userController.deleteUserById);

// Endpoint para deletar todos os usuário
router.delete("/users", verifyToken, userController.deleteAllUsers);

module.exports = router;
