const Crypto = require("../models/cryptoModel");
const { getClient } = require("../config/db");

const cryptoController = {
  // Consulta a cotação de criptomoedas
  async getCryptoPrice(req, res) {
    const { name } = req.params;

    try {
      const crypto = await Crypto.getCryptoPrice(name);
      if (!crypto) {
        return res.status(404).json({ error: "Criptomoeda não encontrada" });
      }

      res.status(200).json({ name: crypto.name, price: crypto.price });
    } catch (error) {
      console.error("Erro ao buscar cotação:", error);
      res.status(500).json({ error: "Erro ao buscar cotação" });
    }
  },

  async getBalance(req, res) {
    const { userId } = req.params;

    const { client, release } = await getClient();
    try {
      // Obtenha os saldos em USD e BTC do banco de dados
      const userBalanceResult = await client.query(
        "SELECT balance, btc_balance FROM tb_users WHERE id = $1",
        [userId]
      );

      if (userBalanceResult.rows.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const { balance: usdBalance, btc_balance } = userBalanceResult.rows[0];

      // Converta os saldos para números
      const usdBalanceNumber = parseFloat(usdBalance);
      const btcBalanceNumber = parseFloat(btc_balance);

      // Obtenha o preço do Bitcoin
      const crypto = await Crypto.getCryptoPrice("bitcoin");
      const btcPrice = crypto.price;

      // Calcule o total em dólar
      const totalInUSD =
        usdBalanceNumber + btcBalanceNumber * parseFloat(btcPrice);

      // Formate o total com duas casas decimais
      const formattedTotal = totalInUSD.toFixed(2);

      res.status(200).json({
        usd_balance: usdBalanceNumber.toFixed(2), // Formate o saldo em USD
        btc_balance: btcBalanceNumber, // Retorne o saldo em BTC
        total: formattedTotal, // Total formatado
      });
    } catch (error) {
      console.error("Erro ao buscar saldo:", error);
      res.status(500).json({ error: "Erro ao buscar saldo" });
    } finally {
      release();
    }
  },
  async updateCryptoPrice(req, res) {
    const { cryptoName } = req.params;

    try {
      const result = await Crypto.fetchAndUpdateCrypto(cryptoName);
      res
        .status(200)
        .json({ message: "Preço atualizado com sucesso!", result });
    } catch (error) {
      console.error("Erro ao atualizar preço da criptomoeda:", error);
      res.status(500).json({ error: "Erro ao atualizar preço da criptomoeda" });
    }
  },

  // Depositar dinheiro na conta
  async depositMoney(req, res) {
    const { userId, amount } = req.body;

    try {
      const result = await Crypto.depositMoney(userId, amount);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao depositar dinheiro:", error);
      res.status(500).json({ error: "Erro ao depositar dinheiro" });
    }
  },

  async transferMoney(req, res) {
    const { fromUserId, toUserId, amount } = req.body;

    try {
      const result = await Crypto.transferMoney(fromUserId, toUserId, amount);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao realizar transferência:", error);
      res.status(500).json({ error: "Erro ao realizar transferência" });
    }
  },

  // Comprar criptomoeda
  async buyCrypto(req, res) {
    const { userId, cryptoName, amount } = req.body;

    try {
      const result = await Crypto.buyCrypto(userId, cryptoName, amount);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao comprar criptomoeda:", error);
      res.status(500).json({ error: "Erro ao comprar criptomoeda" });
    }
  },

  // Vender criptomoeda
  async sellCrypto(req, res) {
    const { userId, cryptoName, amount } = req.body;

    try {
      const result = await Crypto.sellCrypto(userId, cryptoName, amount);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao vender criptomoeda:", error);
      res.status(500).json({ error: "Erro ao vender criptomoeda" });
    }
  },

  // Converter criptomoeda para dólar
  async convertCryptoToDollar(req, res) {
    const { userId, amount } = req.body;

    try {
      const result = await Crypto.convertCryptoToDollar(userId, amount);
      res.status(200).json(result);
    } catch (error) {
      console.error("Erro ao converter criptomoeda:", error);
      res.status(500).json({ error: "Erro ao converter criptomoeda" });
    }
  },
};

module.exports = cryptoController;
