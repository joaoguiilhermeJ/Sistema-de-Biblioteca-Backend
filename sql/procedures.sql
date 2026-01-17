
CREATE OR REPLACE PROCEDURE emprestar_livro(p_idUser INT, p_idBook INT)
LANGUAGE plpgsql
AS $$
DECLARE
  qtd INT;
  total INT;
BEGIN
  SELECT quantidade INTO qtd
  FROM livros
  WHERE idBook = p_idBook
  FOR UPDATE;

  IF qtd IS NULL THEN
    RAISE EXCEPTION 'Livro não existe (idBook=%)', p_idBook;
  END IF;

  IF qtd <= 0 THEN
    RAISE EXCEPTION 'Sem estoque para o livro (idBook=%)', p_idBook;
  END IF;

  SELECT totalLivrosEmMao INTO total
  FROM users
  WHERE idUsers = p_idUser
  FOR UPDATE;

  IF total IS NULL THEN
    RAISE EXCEPTION 'Usuário não existe (idUsers=%)', p_idUser;
  END IF;

  IF total >= 5 THEN
    RAISE EXCEPTION 'Usuário já está no limite de 5 livros (idUsers=%)', p_idUser;
  END IF;

  INSERT INTO emprestimos (idUser, idBook, dataEmprestimo, dataDevolucao)
  VALUES (p_idUser, p_idBook, NOW(), NULL);

  UPDATE users
  SET totalLivrosEmMao = totalLivrosEmMao + 1
  WHERE idUsers = p_idUser;

  UPDATE livros
  SET quantidade = quantidade - 1
  WHERE idBook = p_idBook;
END;
$$;


CREATE OR REPLACE PROCEDURE devolver_livro(p_idUser INT, p_idBook INT)
LANGUAGE plpgsql
AS $$
DECLARE
  emprestimo_data TIMESTAMP;
BEGIN
  SELECT dataEmprestimo
  INTO emprestimo_data
  FROM emprestimos
  WHERE idUser = p_idUser
    AND idBook = p_idBook
    AND dataDevolucao IS NULL
  ORDER BY dataEmprestimo DESC
  LIMIT 1
  FOR UPDATE;

  IF emprestimo_data IS NULL THEN
    RAISE EXCEPTION 'Não existe empréstimo aberto para este user/livro (user=% livro=%)', p_idUser, p_idBook;
  END IF;

  UPDATE emprestimos
  SET dataDevolucao = NOW()
  WHERE idUser = p_idUser
    AND idBook = p_idBook
    AND dataEmprestimo = emprestimo_data;

  UPDATE users
  SET totalLivrosEmMao = GREATEST(totalLivrosEmMao - 1, 0)
  WHERE idUsers = p_idUser;

  UPDATE livros
  SET quantidade = quantidade + 1
  WHERE idBook = p_idBook;
END;
$$;
