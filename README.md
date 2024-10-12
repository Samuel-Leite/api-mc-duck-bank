# API da plataforma Mc Duck Bank

![alt text](mcduck-logo.png)

## 🚀 INTRODUÇÃO:
O Mc Duck Bank é um banco fictício inspirado no Tio Patinhas. Neste projeto, construí uma API que contempla os principais recursos de gerenciamento de usuários, permitindo operações de CRUD (Criar, Ler, Atualizar e Deletar). A API foi projetada para ser escalável e segura, proporcionando uma experiência robusta para os usuários do banco e inclui monitoramento de desempenho usando Grafana e Prometheus, permitindo uma análise detalhada das métricas da API durante testes de performance.

## 💻 TECNOLOGIAS:
- Node.js: Ambiente de execução para JavaScript no lado do servidor.
- JavaScript: Linguagem de programação utilizada para desenvolver a API.
- DBeaver: Ferramenta para gerenciar e visualizar dados no PostgreSQL.
- Insomnia/Postman: Ferramenta para testar APIs.
- Grafana: Plataforma de visualização de dados, utilizada para monitorar métricas de desempenho da API.
- Prometheus: Sistema de monitoramento e alerta que coleta métricas da aplicação.


## 🤖 CONFIGURAÇÕES:
- Clonar o projeto na máquina local
- Executar no terminal do diretório do projeto o comando:

```
'npm install'
```

- Informar os dados necessários no arquivo dotEnv:

```
DB_USER=nome_usuario
DB_PASSWORD=senha_usuario
DB_HOST=localhost
DB_PORT=numero_porta
DB_DATABASE=nome_banco_dados
```
- Inicializar a API:

```
npm run dev
```

## 📂 ESTRUTURA DO PROJETO:

| Diretório           | Finalidade                                                                                                     |
| ------------------- | -------------------------------------------------------------------------------------------------------------- |
| ./github            | Configuração do CI/CD utilizando GitHub Actions.                                                               |
| ./src/config        | Configuração com o banco de dados (DBeaver)                                                                    |
| ./src/controllers   | Implementa a lógica de controle da aplicação, gerenciando as interações entre a API e os dados dos usuários    |
| ./src/middleware    | Implementa funcionalidades como autenticação e verificação de token.                                           |
| ./src/models        | Define a lógica de interação com o banco de dados para a tabela de usuários                                    |
| ./src/routers       | Define as rotas da API relacionadas a usuários                                                                 |
| ./src/app           | Configuração principal do servidor Express                                                                     |

## DOCKER
Para inicializar o Grafana e Prometheus para visualização das métricas através do Docker Compose, utilizar os seguintes comandos no terminal do VS Code

```
docker-compose up -d
```

- Encerrar o Docker Compose, execute o comando abaixo:
```
docker-compose down
```

Através da URL 'http://localhost:3001/' após inicializar o Docker Compose, configure o Dashboard: Add visualization > prometheus > forneça as métricas:
- api_response_time_seconds_count
- api_response_time_seconds_sum
- api_response_time_seconds_bucket
- nodejs_eventloop_lag_seconds
- process_cpu_seconds_total
- process_resident_memory_bytes
- up

## EVIDENCIA
Segue o vídeo apresentando a execução do projeto

## CONCLUSÃO
O Mc Duck Bank é uma aplicação que simula um banco fictício do Tio Patinhas, focada na gestão de usuários através de uma API RESTful. Este projeto contempla operações de criação, leitura, atualização e exclusão (CRUD) de usuários, proporcionando uma base sólida para o aprendizado sobre desenvolvimento de APIs com Node.js e integração com bancos de dados.

Embora ainda não realize operações bancárias, a estrutura foi pensada para ser expandida futuramente. Com a implementação de autenticação segura e monitoramento de desempenho, o Mc Duck Bank serve como um excelente exemplo didático para quem deseja entender práticas modernas de desenvolvimento.

Sinta-se à vontade para explorar, contribuir e adaptar a aplicação conforme suas necessidades!
