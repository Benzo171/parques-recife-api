const mongoose = require('mongoose');
const dns = require('dns');
const app = require('./src/app');

// Carrega as variáveis do arquivo .env (PORT e MONGODB_URI)
require('dotenv').config();

// Correção de DNS para o MongoDB Atlas funcionar corretamente no Windows
// Sem isso, pode dar erro de resolução de endereço
dns.setServers(['8.8.8.8', '8.8.4.4']);

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Conecta ao MongoDB Atlas e só depois sobe o servidor
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Conectado ao MongoDB Atlas!');

    // Servidor começa a escutar requisições após conexão com o banco
    app.listen(PORT, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1); // Encerra o processo se não conseguir conectar
  });