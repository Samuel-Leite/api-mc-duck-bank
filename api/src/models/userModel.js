const { getClient } = require("../config/db");
const bcrypt = require("bcryptjs");

const User = {
  async createUser(userData) {
    const { username, cpf, email, address, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const { client, release } = await getClient();

    try {
      const result = await client.query(
        "INSERT INTO tb_users (username, cpf, email, address, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [username, cpf, email, address, hashedPassword]
      );
      return result.rows[0];
    } finally {
      release();
    }
  },

  async getAllUsers() {
    const { client, release } = await getClient();

    try {
      const result = await client.query("SELECT * FROM tb_users");
      return result.rows;
    } finally {
      release();
    }
  },

  async getUserById(userId) {
    const { client, release } = await getClient();

    try {
      const result = await client.query("SELECT * FROM tb_users WHERE id = $1", [
        userId,
      ]);
      return result.rows[0]; // Retorna o usuário encontrado ou undefined
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error; // Lança o erro para ser tratado na camada superior
    } finally {
      release();
    }
  },

  async updateUser(id, userData) {
    const { username, cpf, email, address, password } = userData;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    const { client, release } = await getClient();

    try {
      const result = await client.query(
        "UPDATE tb_users SET username = COALESCE($1, username), cpf = COALESCE($2, cpf), email = COALESCE($3, email), address = COALESCE($4, address), password = COALESCE($5, password) WHERE id = $6 RETURNING *",
        [username, cpf, email, address, hashedPassword, id]
      );

      return result.rows[0];
    } finally {
      release();
    }
  },

  async deleteUser(userId) {
    const { client, release } = await getClient();

    try {
      const result = await client.query(
        "DELETE FROM tb_users WHERE id = $1 RETURNING *",
        [userId]
      );

      if (result.rows.length > 0) {
        // Resetar a sequência do ID
        await client.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
        return result.rows[0]; // Retorna o usuário excluído
      } else {
        return null; // Usuário não encontrado
      }
    } finally {
      release();
    }
  },

  async deleteUser(userId) {
    const { client, release } = await getClient();

    try {
      const result = await client.query(
        "DELETE FROM tb_users WHERE id = $1 RETURNING *",
        [userId]
      );

      if (result.rows.length > 0) {
        // Resetar a sequência do ID
        await client.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
        return result.rows[0]; // Retorna o usuário excluído
      } else {
        return null; // Usuário não encontrado
      }
    } finally {
      release();
    }
  },

  async deleteAllUsers() {
    const { client, release } = await getClient();

    try {
      const result = await client.query("DELETE FROM tb_users RETURNING *");
      // Resetar a sequência do ID, se necessário
      await client.query("ALTER SEQUENCE users_id_seq RESTART WITH 1");
      return result; // Retorna todos os usuários excluídos
    } finally {
      release();
    }
  },
};

module.exports = User;
