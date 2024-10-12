const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

// Criação do pool de conexões com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
});

// Função para obter um cliente do pool
const getClient = async () => {
  try {
      const client = await pool.connect();
      return {
          client,
          release: () => client.release(),
      }; // Retorna o cliente e a função de liberação
  } catch (error) {
      console.error("Erro ao obter cliente do pool:", error);
      throw new Error("Erro ao conectar ao banco de dados");
  }
};

// Função para testar a conexão ao banco de dados
const testConnection = async () => {
  const client = await getClient();
  try {
    console.log("Conexão ao banco de dados realizada com sucesso!");
  } catch (error) {
    console.error("Erro ao conectar ao banco de dados:", error);
  } finally {
    client.release(); // Libere o cliente após o teste
  }
};

// Chamada para testar a conexão
testConnection();

module.exports = { pool, getClient };
