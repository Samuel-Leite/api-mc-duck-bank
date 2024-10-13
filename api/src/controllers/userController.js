const User = require("../models/userModel");
const { generateToken } = require("../middleware/authMiddleware");
const bcrypt = require("bcryptjs"); // Adicione esta linha se ainda não estiver importada
const jwt = require("jsonwebtoken"); // Adicione esta linha se ainda não estiver importada
const { getClient } = require("../config/db");
const { SECRET_KEY } = process.env; // Adicione esta linha se ainda não estiver importada

const userController = {
  async signup(req, res) {
    const { username, cpf, email, address, password } = req.body;

    try {
      const newUser = await User.createUser({
        username,
        cpf,
        email,
        address,
        password,
      });
      res.status(201).json({
        message: "Usuário cadastrado com sucesso!",
        user: newUser,
      });
    } catch (err) {
      console.error("Erro ao cadastrar usuário:", err);
      res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }
  },

  async login(req, res) {
    const { cpf, password } = req.body; // Alterado de 'username' para 'cpf'

    try {
      const { client, release } = await getClient(); // Certifique-se de obter o cliente e a função de liberação
      const result = await client.query(
        "SELECT * FROM users WHERE cpf = $1", // Alterado para buscar pelo 'cpf'
        [cpf]
      );

      release(); // Libere o cliente após a consulta

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      const user = result.rows[0];
      const passwordIsValid = await bcrypt.compare(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ error: "Credenciais inválidas" });
      }

      const token = generateToken(user.id);
      const refreshToken = jwt.sign({ id: user.id }, SECRET_KEY + "_refresh", {
        expiresIn: "7d",
      });

      res.status(200).json({ token, refreshToken });
    } catch (err) {
      console.error("Erro ao realizar login:", err);
      res.status(500).json({ error: "Erro interno ao realizar login" });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
      res.status(500).json({ error: "Erro ao buscar usuários" });
    }
  },

  async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await User.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json(user);
    } catch (err) {
      console.error("Erro ao buscar usuário:", err);
      res.status(500).json({ error: "Erro ao buscar usuário" });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { username, cpf, email, address, password } = req.body;

    try {
      const updatedUser = await User.updateUser(id, {
        username,
        cpf,
        email,
        address,
        password,
      });
      if (!updatedUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        user: updatedUser,
      });
    } catch (err) {
      console.error("Erro ao atualizar usuário:", err);
      res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
  },

  // Método para excluir um usuário por ID
  async deleteUserById(req, res) {
    const { id } = req.params;

    try {
      const deletedUser = await User.deleteUser(id);
      if (!deletedUser) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      res.status(500).json({ error: "Erro ao deletar usuário" });
    }
  },

  // Método para excluir todos os usuários
  async deleteAllUsers(req, res) {
    try {
      const deletedUsers = await User.deleteAllUsers();
      res.status(200).json({
        message: `${deletedUsers.rowCount} usuários deletados com sucesso!`,
      });
    } catch (err) {
      console.error("Erro ao deletar usuários:", err);
      res.status(500).json({ error: "Erro ao deletar usuários" });
    }
  },
};

module.exports = userController;
