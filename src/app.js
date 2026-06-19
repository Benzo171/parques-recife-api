const express = require('express');
const cors = require('cors');

// Importamos as rotas de check-in que criamos
const checkinRoutes = require('./routes/checkin');

// Criamos a instância do app Express
const app = express();

// Middleware que permite requisições de outras origens (o app React Native)
app.use(cors());

// Middleware que faz o Express entender JSON no corpo das requisições
app.use(express.json());

// Registramos as rotas — tudo que vier em /check-in vai para o arquivo de rotas
// Ficamos com:
//   POST /check-in        → salva um check-in
//   GET  /check-in/historico → retorna todos os check-ins
app.use('/check-in', checkinRoutes);

// Rota raiz só pra confirmar que o servidor está de pé
app.get('/', (req, res) => {
  res.json({ mensagem: 'API Parques Recife funcionando!' });
});

module.exports = app;