const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const cryptoRoutes = require("./routes/cryptoRoutes"); // Importa as rotas do crypto
const cors = require("cors");
const { collectDefaultMetrics, register, Histogram } = require("prom-client");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Coleta de métricas padrão
collectDefaultMetrics();

// Definindo um histograma para medir o tempo de resposta da API
const responseTimeHistogram = new Histogram({
  name: "api_response_time_seconds",
  help: "Tempo de resposta da API em segundos",
  labelNames: ["route", "status"],
});

// Middleware para medir o tempo de resposta
app.use((req, res, next) => {
  const end = responseTimeHistogram.startTimer();
  res.on("finish", () => {
    end({ route: req.path, status: res.statusCode });
  });
  next();
});

// Use o middleware CORS
app.use(cors());

// Configuração do express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "web")));

// Rotas
app.use("/auth", authRoutes);
app.use("/api", cryptoRoutes); // Adiciona as rotas do crypto

// Rota para expor métricas
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

// Rotas de página
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "web", "pages", "login.html"));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "web", "index.html"));
});

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
