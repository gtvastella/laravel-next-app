# 🚀 Exemplar Fullstack em Laravel e Next.js

Este projeto é um demonstrativo de um sistema fullstack que utiliza **PHP com Laravel** para o backend (API) e **React com Next.js** para o frontend. O banco de dados utilizado é o **MySQL** e há suporte para **SSR** quando possível. É utilizado o princípio **SOLID** e otimização de código.

---

## 📋 Requisitos

Para executar o projeto, é necessário ter **Docker** e **Docker Compose** instalados.

---

## 🛠 Rodando Localmente

1️⃣ Clone o projeto:
```bash
  git clone https://github.com/gtvastella/laravel-next-app
```

2️⃣ Entre no diretório do projeto:
```bash
  cd laravel-next-app
```

3️⃣ Inicie o Docker Compose:
```bash
  docker compose up
```

⏳ Aguarde a geração das imagens e subida dos containers.

---

## 🌐 Acessando o Frontend

🔗 O frontend poderá ser acessado em: **[http://localhost:3000](http://localhost:3000)**

Você poderá criar um ou mais usuários para acessar as rotas protegidas.

---

## 📦 Dados de Teste

Ao rodar o projeto pela primeira vez, serão inseridos automaticamente:
✅ **2 usuários**
✅ **5 categorias**
✅ **100 produtos** (gerados aleatoriamente)

Os produtos podem ser visualizados na listagem de produtos do frontend.

---

## ⚡ Comandos

📌 **Nenhum comando extra é necessário!**

✅ As **migrações do banco de dados** e a **geração de dados aleatórios** são feitas automaticamente.

---

# 🔌 API - Rotas

Caso necessário, as rotas da API poderão ser testadas externamente em:  
🔗 **http://localhost/api/**

---

## 🔑 Autenticação

### 🔹 Login
#### `POST /api/login`

📌 **Parâmetros:**

| 🏷️ Parâmetro | 🔠 Tipo | 📖 Descrição |
|-------------|--------|--------------|
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |

---

### 📝 Registro
#### `POST /api/register`

📌 **Parâmetros:**

| 🏷️ Parâmetro | 🔠 Tipo | 📖 Descrição |
|-------------|--------|--------------|
| `name` | `string` | **Obrigatório**. Nome do usuário |
| `email` | `string` | **Obrigatório**. Email do usuário |
| `password` | `string` | **Obrigatório**. Senha do usuário |
| `confirm_password` | `string` | **Obrigatório**. Confirmação da senha |

---

### 🚪 Logout
#### `POST /api/logout`

🔹 Finaliza a sessão do usuário autenticado.

---

## 🛒 Produtos

### 📋 Listar Produtos (autenticada)
#### `GET /api/products`

📌 **Parâmetros na URL:**

| 🏷️ Parâmetro | 🔠 Tipo | 📖 Descrição |
|-------------|--------|--------------|
| `page` | `int` | **Opcional**. Página atual (padrão: 1) |
| `per_page` | `int` | **Opcional**. Máximo de itens por página (padrão: 15) |
| `category_id` | `int` | **Opcional**. ID da categoria dos produtos |
| `search` | `string` | **Opcional**. Palavra-chave para buscar no nome ou descrição |

---

### 🔍 Consultar Produto (autenticada)
#### `GET /api/products/{id}`

📌 **Parâmetros na URL:**

| 🏷️ Parâmetro | 🔠 Tipo | 📖 Descrição |
|-------------|--------|--------------|
| `{id}` | `int` | **Obrigatório**. ID do produto a consultar |

---

### 📋 Listar Categorias
#### `GET /api/categories`

🔹 Retorna a lista de todas as categorias disponíveis.

---

📌 **Observação:** Para realizar requisições autenticadas, é necessário incluir o token JWT no cabeçalho:
```
Authorization: Bearer {seu_token}
```

