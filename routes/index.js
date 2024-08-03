const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const templateController = require("../controllers/templateController");
const emailController = require("../controllers/broadcastController");

// Rotas usuários
router.post("/addUser", userController.addUser);
router.delete("/delUser", userController.delUser);

// Rotas templates
router.post("/addTemplate", templateController.addTemplate);
router.get("/listTemplates", templateController.listTemplates);
router.put("/upTemplate", templateController.updateTemplate);
router.delete("/delTemplate", templateController.deleteTemplate);

// Rota para enviar um e-mail para todos os usuários com um template específico
router.post("/sendBroadcast", emailController.sendBroadcast);

module.exports = router;
