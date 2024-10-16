const express = require("express");
const cryptoController = require("../controllers/cryptoController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Rota para consultar a cotação de criptomoedas
router.get("/crypto/:name", cryptoController.getCryptoPrice);

router.get("/crypto/update/:cryptoName", cryptoController.updateCryptoPrice);

// Rota para consultar saldo
router.get("/balance/:userId", cryptoController.getBalance);

// Rota para depositar dinheiro na conta
router.post("/deposit", verifyToken, cryptoController.depositMoney);

// Rota para realizar a transferência
router.post("/transfer", cryptoController.transferMoney);

// Rota para comprar criptomoeda
router.post("/buy", verifyToken, cryptoController.buyCrypto);

// Rota para vender criptomoeda
router.post("/sell", verifyToken, cryptoController.sellCrypto);

module.exports = router;
