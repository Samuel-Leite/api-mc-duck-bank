const { getClient } = require("../config/db");
const axios = require("axios");

const Crypto = {
  async getCryptoPrice(cryptoName) {
    const { client, release } = await getClient();
    try {
      const result = await client.query(
        "SELECT * FROM tb_crypto WHERE name = $1",
        [cryptoName]
      );
      return result.rows[0];
    } finally {
      release();
    }
  },

  async fetchAndUpdateCrypto(cryptoName) {
    const { client, release } = await getClient();
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=usd`
      );
      const price = response.data[cryptoName]?.usd;

      if (!price) throw new Error("Criptomoeda não encontrada na API");

      const result = await client.query(
        "SELECT * FROM tb_crypto WHERE name = $1",
        [cryptoName]
      );

      if (result.rows.length > 0) {
        await client.query("UPDATE tb_crypto SET price = $1 WHERE name = $2", [
          price,
          cryptoName,
        ]);
      } else {
        await client.query(
          "INSERT INTO tb_crypto (name, price) VALUES ($1, $2)",
          [cryptoName, price]
        );
      }

      return { name: cryptoName, price };
    } catch (error) {
      console.error("Erro ao buscar ou atualizar criptomoeda:", error);
      throw error;
    } finally {
      release();
    }
  },

  async depositMoney(userId, amount) {
    const { client, release } = await getClient();
    try {
      const user = await client.query("SELECT * FROM tb_users WHERE id = $1", [
        userId,
      ]);
      if (user.rows.length === 0) throw new Error("Usuário não encontrado");

      await client.query(
        "UPDATE tb_users SET balance = balance + $1 WHERE id = $2",
        [amount, userId]
      );

      await client.query(
        "INSERT INTO tb_deposits (user_id, amount) VALUES ($1, $2)",
        [userId, amount]
      );

      return { message: "Depósito realizado com sucesso!" };
    } catch (error) {
      throw new Error(error.message);
    } finally {
      release();
    }
  },

  async transferMoney(fromUserId, toUserId, amount) {
    const { client, release } = await getClient();
    try {
      const userFrom = await client.query(
        "SELECT * FROM tb_users WHERE id = $1",
        [fromUserId]
      );
      if (userFrom.rows.length === 0)
        throw new Error("Usuário remetente não encontrado");
      if (userFrom.rows[0].balance < amount)
        throw new Error("Saldo insuficiente");

      await client.query(
        "UPDATE tb_users SET balance = balance - $1 WHERE id = $2",
        [amount, fromUserId]
      );

      await client.query(
        "UPDATE tb_users SET balance = balance + $1 WHERE id = $2",
        [amount, toUserId]
      );

      await client.query(
        "INSERT INTO tb_transfers (from_user_id, to_user_id, amount) VALUES ($1, $2, $3)",
        [fromUserId, toUserId, amount]
      );

      return { message: "Transferência realizada com sucesso!" };
    } finally {
      release();
    }
  },

  async buyCrypto(userId, cryptoName, amount) {
    const { client, release } = await getClient();
    try {
      const crypto = await client.query(
        "SELECT * FROM tb_crypto WHERE name = $1",
        [cryptoName]
      );
      if (crypto.rows.length === 0)
        throw new Error("Criptomoeda não encontrada");

      const cryptoId = crypto.rows[0].id;
      const totalCost = amount * crypto.rows[0].price;

      const user = await client.query("SELECT * FROM tb_users WHERE id = $1", [
        userId,
      ]);
      if (user.rows.length === 0) throw new Error("Usuário não encontrado");
      if (user.rows[0].balance < totalCost)
        throw new Error("Saldo insuficiente");

      await client.query(
        "UPDATE tb_users SET balance = balance - $1 WHERE id = $2",
        [totalCost, userId]
      );

      // Atualiza o btc_balance
      await client.query(
        "UPDATE tb_users SET btc_balance = btc_balance + $1 WHERE id = $2",
        [amount, userId]
      );

      await client.query(
        "INSERT INTO tb_transactions (user_id, crypto_id, amount, transaction_type) VALUES ($1, $2, $3, 'buy')",
        [userId, cryptoId, amount]
      );

      return {
        message: "Compra realizada com sucesso!",
        totalCost,
        crypto: crypto.rows[0],
      };
    } finally {
      release();
    }
  },

  async sellCrypto(userId, cryptoName, amount) {
    const { client, release } = await getClient();
    try {
      const crypto = await this.getCryptoPrice(cryptoName);
      if (!crypto) throw new Error("Criptomoeda não encontrada");

      const purchaseResult = await client.query(
        "SELECT SUM(amount) AS total_bought FROM tb_transactions WHERE user_id = $1 AND crypto_id = $2 AND transaction_type = 'buy'",
        [userId, crypto.id]
      );
      const totalBought = purchaseResult.rows[0].total_bought || 0;

      const saleResult = await client.query(
        "SELECT SUM(amount) AS total_sold FROM tb_transactions WHERE user_id = $1 AND crypto_id = $2 AND transaction_type = 'sell'",
        [userId, crypto.id]
      );
      const totalSold = saleResult.rows[0].total_sold || 0;

      const currentBalance = totalBought - totalSold;

      if (currentBalance < amount)
        throw new Error("Saldo insuficiente para venda");

      const totalRevenue = amount * crypto.price;

      // Atualiza o saldo do usuário
      await client.query(
        "UPDATE tb_users SET balance = balance + $1 WHERE id = $2",
        [totalRevenue, userId]
      );

      // Atualiza o btc_balance
      await client.query(
        "UPDATE tb_users SET btc_balance = btc_balance - $1 WHERE id = $2",
        [amount, userId]
      );

      await client.query(
        "INSERT INTO tb_transactions (user_id, crypto_id, amount, transaction_type) VALUES ($1, $2, $3, 'sell')",
        [userId, crypto.id, amount]
      );

      return { message: "Venda realizada com sucesso!", totalRevenue, crypto };
    } finally {
      release();
    }
  },

  async convertCryptoToDollar(userId, amount) {
    const { client, release } = await getClient();
    try {
      const crypto = await this.getCryptoPrice("bitcoin"); // Substitua por outra crypto se necessário
      if (!crypto) throw new Error("Criptomoeda não encontrada");

      const totalRevenue = amount * crypto.price;

      const user = await client.query("SELECT * FROM tb_users WHERE id = $1", [
        userId,
      ]);
      if (user.rows.length === 0) throw new Error("Usuário não encontrado");

      await client.query(
        "UPDATE tb_users SET balance = balance + $1 WHERE id = $2",
        [totalRevenue, userId]
      );

      await client.query(
        "INSERT INTO tb_transactions (user_id, crypto_id, amount, transaction_type) VALUES ($1, $2, $3, 'sell')",
        [userId, crypto.id, amount]
      );

      return { message: "Conversão realizada com sucesso!", totalRevenue };
    } finally {
      release();
    }
  },
};

module.exports = Crypto;
