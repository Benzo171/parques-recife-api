const mongoose = require('mongoose');

// Importamos o mongoose, que é a biblioteca que faz a ponte
// entre o Node.js e o MongoDB. Com ele conseguimos definir
// a estrutura dos nossos dados (Schema) e salvar/buscar no banco.

// Schema é o "molde" dos documentos que vão ser salvos no MongoDB.
// Cada check-in que o usuário fizer vai seguir essa estrutura.
const CheckInSchema = new mongoose.Schema({

  // Nome do parque que o usuário selecionou no app
  // "required: true" significa que esse campo é obrigatório —
  // se não vier, o banco rejeita o documento
  parque: {
    type: String,
    required: true,
  },

  // Bairro onde o parque fica, vem da API do Dados Recife
  bairro: {
    type: String,
    required: true,
  },

  // Localização geográfica do usuário no momento do check-in.
  // É um objeto com dois campos numéricos: latitude e longitude.
  // Esses valores vêm do expo-location no app React Native.
  localizacao: {
    latitude: {
      type: Number,
      required: true, // obrigatório — sem coordenada não tem check-in
    },
    longitude: {
      type: Number,
      required: true,
    },
  },

  // Data e hora em que o check-in foi feito.
  // "default: Date.now" faz o MongoDB preencher automaticamente
  // com o momento exato em que o documento foi criado.
  // Não precisa mandar esse campo do app — ele vem sozinho.
  criadoEm: {
    type: Date,
    default: Date.now,
  },

});

// Aqui transformamos o Schema em um Model.
// O Model é o que a gente usa no código para criar, buscar,
// atualizar e deletar documentos no banco.
// O MongoDB vai criar automaticamente uma coleção chamada "checkins".
module.exports = mongoose.model('CheckIn', CheckInSchema);