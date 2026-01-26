-- USERS
CREATE TABLE IF NOT EXISTS users (
  idUsers SERIAL PRIMARY KEY,
  nomeUsers TEXT NOT NULL,
  cpf VARCHAR(11) NOT NULL,
  totalLivrosEmMao INT NOT NULL DEFAULT 0
);

-- LIVROS
CREATE TABLE IF NOT EXISTS livros (
  idBook SERIAL PRIMARY KEY,
  titulo TEXT NOT NULL,
  autor TEXT NOT NULL,
  quantidade INT NOT NULL DEFAULT 0
);

-- LIVROS EMPRESTADOS (EMPRÉSTIMOS)
CREATE TABLE IF NOT EXISTS emprestimos (
  idUser INT NOT NULL REFERENCES users(idUsers),
  idBook INT NOT NULL REFERENCES livros(idBook),
  dataEmprestimo TIMESTAMP NOT NULL DEFAULT NOW(),
  PRIMARY KEY (idUser, idBook, dataEmprestimo)
);

CREATE TABLE devolvidos (
  idDevolvidos SERIAL PRIMARY KEY,
  idUser INT NOT NULL REFERENCES users(idUsers),
  idBook INT NOT NULL REFERENCES livros(idBook),
  dataDevolucao TIMESTAMP NULL
);

-- DEVEDORES
CREATE TABLE IF NOT EXISTS devedores (
  idUser INT NOT NULL REFERENCES users(idUsers),
  idBook INT NOT NULL REFERENCES livros(idBook),
  dataEmprestimo TIMESTAMP NOT NULL,
  PRIMARY KEY (idUser, idBook, dataEmprestimo)
);

-- AVISOS (para guardar o "aviso" do limite de 5)
CREATE TABLE IF NOT EXISTS avisos (
  idAviso SERIAL PRIMARY KEY,
  idUser INT NOT NULL REFERENCES users(idUsers),
  mensagem TEXT NOT NULL,
  criadoEm TIMESTAMP NOT NULL DEFAULT NOW()
);

ALTER TABLE livros
ADD COLUMN autor TEXT NOT NULL;

