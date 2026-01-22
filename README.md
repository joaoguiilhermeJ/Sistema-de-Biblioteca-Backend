# Sistema de Biblioteca – Backend + Frontend

Sistema completo de biblioteca desenvolvido com Node.js, Express e PostgreSQL no backend, e HTML5, CSS3 e JavaScript vanilla no frontend.  
O projeto foi criado com foco em aprendizado de backend, organização em camadas e uso de recursos do banco de dados como functions, procedures e triggers.

---

## Tecnologias

**Backend:**

- Node.js
- Express.js
- PostgreSQL
- JavaScript
- pg (node-postgres)

**Frontend:**

- HTML5
- CSS3 (Responsive)
- JavaScript Vanilla
- Fetch API

---

## Estrutura

```
src/
├── config/
├── controllers/
├── services/
├── repositories/
├── routes/
├── app.js
└── server.js

public/
├── index.html
├── styles.css
└── script.js
```

---

## Funcionamento

O sistema permite:

- Cadastro de usuários
- Cadastro de livros
- Empréstimo e devolução de livros
- Controle automático de estoque
- Aviso quando o usuário atinge 5 livros emprestados
- Registro automático de usuários devedores
- Listagem de empréstimos abertos via function no banco

As regras críticas são garantidas diretamente no PostgreSQL através de procedures, functions e triggers.

---

## Banco de Dados

Principais tabelas:

- users
- livros
- emprestimos
- avisos
- devedores

Procedure:

- Empresta os livros
- Devolve os livros

Function:

- listar_livros_com_users

Triggers:

- aviso automático ao atingir 5 livros
- registro de devedor ao devolver livro após 7 dias

---

## Rotas da API

### Clientes

- POST /clientes
- GET /clientes
- GET /clientes/:id
- PUT /clientes/:id
- DELETE /clientes/:id

### Livros

- POST /livros
- GET /livros
- GET /livros/:id
- PUT /livros/:id/titulo
- PATCH /livros/:id/quantidade
- DELETE /livros/:id

### Empréstimos

- POST /emprestimos
- POST /emprestimos/devolucao
- GET /emprestimos/abertos

---

## Exemplos de requisição

Criar usuário:

```json
{
  "nomeUsers": "João Guilherme",
  "cpf": "12345678901"
}

Criar livro:

{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "quantidade": 5
}

Emprestar livro:

{
  "idUser": 1,
  "idBook": 1
}

Como executar

Instalar dependências:

npm install

Criar arquivo .env:

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=biblioteca

Iniciar servidor:

node src/server.js

Servidor disponível em:

http://localhost:3000

Observações

- Cada requisição cadastra apenas uma entidade por vez
- Operações críticas usam procedures no banco
- Avisos e devedores são gerados automaticamente por triggers
- Frontend é responsivo e funciona em mobile/desktop
- Sem conflitos entre rotas da API e arquivos estáticos
- CORS habilitado para requisições do navegador

## Frontend - Alterações Recentes



### Funcionalidades do Frontend:
- **Clientes**: Cadastrar, listar e deletar
- **Livros**: Cadastrar, listar, adicionar quantidade e deletar
- **Empréstimos**: Registrar empréstimo, devolução e listar abertos
- Feedback visual com mensagens de sucesso/erro
- Design responsivo com gradiente roxo/azul
```
