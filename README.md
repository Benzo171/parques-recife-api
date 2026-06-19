# Parques Recife API

Backend da aplicação Parques Recife, desenvolvido com Node.js, Express e MongoDB Atlas.

## Tecnologias

- Node.js
- Express
- Mongoose
- MongoDB Atlas

## Como executar localmente

### Pré-requisitos

- Node.js instalado
- Conta no MongoDB Atlas com um cluster ativo

### Instalação

```bash
git clone https://github.com/Benzo171/parques-recife-api
cd parques-recife-api
npm install
```

### Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```
PORT=3000
MONGODB_URI=sua_connection_string_do_atlas
```

### Executar

```bash
npm run dev
```

O servidor vai rodar em `http://localhost:3000`

## Rotas

### POST /check-in
Salva um novo check-in do usuário em um parque.

**Body:**
```json
{
  "parque": "Parque da Jaqueira",
  "bairro": "Graças",
  "localizacao": {
    "latitude": -8.0476,
    "longitude": -34.9011
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
Retorna todos os check-ins salvos, do mais recente ao mais antigo.

**Resposta (200):**
```json
{
  "total": 1,
  "dados": [ ... ]
}
```

## Estrutura do projeto

```
parques-recife-api/
├── src/
│   ├── models/
│   │   └── CheckIn.js
│   ├── routes/
│   │   └── checkin.js
│   └── app.js
├── .env
├── .gitignore
├── server.js
└── README.md
```