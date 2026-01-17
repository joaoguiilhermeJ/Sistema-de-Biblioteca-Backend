CREATE OR REPLACE FUNCTION listar_livros_com_users()
RETURNS TABLE (
  idUser INT,
  nomeUsers TEXT,
  idBook INT,
  titulo TEXT,
  dataEmprestimo TIMESTAMP,
  diasEmMao INT
)
LANGUAGE sql
AS $$
  SELECT
    u.idUsers,
    u.nomeUsers,
    l.idBook,
    l.titulo,
    e.dataEmprestimo,
    (EXTRACT(DAY FROM (NOW() - e.dataEmprestimo)))::INT AS diasEmMao
  FROM emprestimos e
  JOIN users u ON u.idUsers = e.idUser
  JOIN livros l ON l.idBook = e.idBook
  WHERE e.dataDevolucao IS NULL
  ORDER BY e.dataEmprestimo DESC;
$$;


