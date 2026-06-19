const express = require('express');

// Router é uma forma de organizar as rotas separadas do app principal.
// Em vez de colocar tudo no app.js, cada grupo de rotas fica no seu arquivo.
const router = express.Router();

// Importamos o Model que criamos — é ele que faz as operações no banco
const CheckIn = require('../models/CheckIn');

// ============================================================
// ROTA POST /check-in
// Responsável por SALVAR um novo check-in no banco de dados.
// O app React Native vai chamar essa rota quando o usuário
// clicar em "fazer check-in" em um parque.
// ============================================================
router.post('/', async (req, res) => {
  try {
    // req.body contém os dados enviados pelo app (parque, bairro, localizacao)
    const { parque, bairro, localizacao } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!parque || !bairro || !localizacao) {
      return res.status(400).json({
        erro: 'Campos obrigatórios: parque, bairro e localizacao',
      });
    }

    // Cria um novo documento com os dados recebidos
    const novoCheckIn = new CheckIn({
      parque,
      bairro,
      localizacao,
    });

    // Salva o documento no MongoDB e aguarda a confirmação
    const salvo = await novoCheckIn.save();

    // Retorna o documento salvo com status 201 (Created)
    res.status(201).json({
      mensagem: 'Check-in realizado com sucesso!',
      dados: salvo,
    });

  } catch (error) {
    // Se der qualquer erro inesperado, retorna status 500 (erro do servidor)
    res.status(500).json({ erro: 'Erro ao salvar check-in', detalhe: error.message });
  }
});

// ============================================================
// ROTA GET /historico
// Responsável por BUSCAR todos os check-ins salvos no banco.
// O app vai chamar essa rota para exibir o histórico na Tela 3.
// ============================================================
router.get('/historico', async (req, res) => {
  try {
    // Busca todos os documentos da coleção, ordenados do mais recente para o mais antigo
    const checkins = await CheckIn.find().sort({ criadoEm: -1 });

    // Retorna a lista com status 200 (OK)
    res.status(200).json({
      total: checkins.length,
      dados: checkins,
    });

  } catch (error) {
    res.status(500).json({ erro: 'Erro ao buscar histórico', detalhe: error.message });
  }
});

// Exportamos o router para usar no app.js
module.exports = router;