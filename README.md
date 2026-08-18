# Horizon Teste Prático — To-Do List

Aplicação fullstack de gerenciamento de tarefas (To-Do) com operações CRUD completas.

---

## Tecnologias utilizadas

**Backend**
- Node.js v24.16.0
- Express
- CORS

**Frontend**
- React 18
- Vite
- Axios
- CSS Modules

---

## Como rodar o projeto

### Pré-requisitos

- Node.js instalado

### Backend

```bash
cd backend
npm install
npm start
```

O servidor ficará disponível em `http://localhost:3001`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em `http://localhost:5173`.

---

## Estrutura de pastas

```
horizon_teste/
├── backend/
│   ├── controllers/
│   │   └── taskController.js
│   ├── models/
│   │   └── task.js
│   ├── routes/
│   │   └── tasks.js
│   └── server.js
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── TaskForm.jsx
│       │   └── TaskList.jsx
│       ├── pages/
│       │   └── Home.jsx
│       ├── services/
│       │   └── api.js
│       ├── App.jsx
│       └── main.jsx
└── docs/
```

---

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/tasks | Listar todas as tarefas |
| GET | /api/tasks/:id | Buscar tarefa por ID |
| POST | /api/tasks | Criar nova tarefa |
| PUT | /api/tasks/:id | Atualizar tarefa |
| DELETE | /api/tasks/:id | Remover tarefa |

---

## Como foi desenvolvido

Acessei meu perfil do GitHub e criei um novo repositório público. Na minha máquina local, criei uma pasta e abri no VS Code para inicializar o repositório Git e conectar à origem remota:

```bash
git init
git remote add origin <url_do_repositorio>
```

Como já tinha o Node.js instalado (v24.16.0), iniciei o projeto com `npm init`, que gerou o `package.json`, e em seguida instalei o Express com `npm install express`.

Criei a estrutura de pastas conforme requisitado — `/backend` com `controllers/`, `models/` e `routes/`, e `/frontend` com `components/`, `pages/` e `services/`.

Desenvolvi o backend primeiro: comecei pelo **model**, que define a estrutura da tarefa e as operações em memória; depois o **controller**, com a lógica de cada endpoint e as validações (400 para título vazio, 404 para tarefa não encontrada); e por fim as **rotas**, conectando cada endpoint ao seu controller.

Com o backend funcionando, desenvolvi o frontend em React usando Vite, criando o serviço `api.js` com Axios para comunicação com a API, os componentes de lista e formulário, e a página principal integrando tudo.

---

## Testes no Postman

### POST /api/tasks — Criar tarefa (201 Created)

![POST /api/tasks](docs/Captura%20de%20tela%20de%202026-08-17%2022-29-41.png)

### GET /api/tasks — Listar todas as tarefas (200 OK)

![GET /api/tasks](docs/Captura%20de%20tela%20de%202026-08-17%2022-29-58.png)

### GET /api/tasks/:id — Buscar tarefa por ID (200 OK)

![GET /api/tasks/1](docs/Captura%20de%20tela%20de%202026-08-17%2022-30-16.png)
