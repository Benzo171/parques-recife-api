# Parques Recife API

Backend da aplicação **Parques Recife**, responsável por fornecer os dados de parques e praças do Recife e persistir os check-ins dos usuários no banco de dados.

## 🚀 Tecnologias

- **Node.js** — ambiente de execução JavaScript
- **Express** — framework web para criação das rotas HTTP
- **Mongoose** — ODM para modelagem e conexão com o MongoDB
- **MongoDB Atlas** — banco de dados NoSQL em nuvem
- **dotenv** — gerenciamento de variáveis de ambiente
- **nodemon** — reinicialização automática do servidor em desenvolvimento
- **CSV** — arquivo local dos dados do portal Dados Abertos do Recife

## 📋 Funcionalidades

- **GET /check-in/parques** — retorna a lista completa de parques e praças do Recife em formato JSON, lida a partir do CSV oficial do portal Dados Abertos do Recife
- **POST /check-in** — salva um novo check-in do usuário no MongoDB, com nome do parque, bairro e coordenadas geográficas
- **GET /check-in/historico** — retorna todos os check-ins salvos, ordenados do mais recente ao mais antigo

## 🗂️ Estrutura do projeto

```
parques-recife-api/
├── src/
│   ├── models/
│   │   └── CheckIn.js       # Schema do MongoDB para check-ins
│   ├── routes/
│   │   └── checkin.js       # Rotas POST /check-in, GET /historico e GET /parques
│   └── app.js               # Configuração do Express e middlewares
├── parques.csv              # Dados dos parques do portal Dados Abertos do Recife
├── server.js                # Entrada da aplicação, conexão com MongoDB
├── .env                     # Variáveis de ambiente (não versionado)
├── .gitignore
└── package.json
```

## ⚙️ Como executar localmente

### Pré-requisitos

- Node.js v18 ou superior
- Conta no MongoDB Atlas com um cluster ativo
- Git

### Instalação

```bash
git clone https://github.com/Benzo171/parques-recife-api
cd parques-recife-api
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto:

```
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/parques-recife
```

### Executar

```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3000`

## 📡 Rotas

### GET /check-in/parques
Retorna todos os parques e praças do Recife.

**Resposta (200):**
```json
{
  "total": 483,
  "dados": [
    {
      "nome_equip_urbano": "Da Jaqueira",
      "nome_oficial_equip_urbano": "Parque da Jaqueira",
      "tipo_equip_urbano": "Parque",
      "nome_bairro": "Jaqueira",
      "area": "71793,04406",
      "latitude": "-8.036906181",
      "longitude": "-34.90482213"
    }
  ]
}
```

### POST /check-in
Salva um novo check-in do usuário.

**Body:**
```json
{
  "parque": "Parque da Jaqueira",
  "bairro": "Jaqueira",
  "localizacao": {
    "latitude": -8.036,
    "longitude": -34.904
  }
}
```

**Resposta (201):**
```json
{
  "mensagem": "Check-in realizado com sucesso!",
  "dados": { ... }
}
```

### GET /check-in/historico
Retorna todos os check-ins salvos.

**Resposta (200):**
```json
{
  "total": 3,
  "dados": [ ... ]
}
```

## 📊 Fonte dos dados

Os dados de parques e praças foram obtidos do **Portal de Dados Abertos da Cidade do Recife**:
- Dataset: [Parques e Praças](http://dados.recife.pe.gov.br/dataset/parques-e-pracas)
- Formato original: CSV com separador `;`
- Total de registros com nome: 483
