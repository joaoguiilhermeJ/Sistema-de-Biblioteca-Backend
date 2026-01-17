CREATE OR REPLACE FUNCTION trg_avisar_limite_5()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  total_abertos INT;
BEGIN
  SELECT COUNT(*)
  INTO total_abertos
  FROM emprestimos
  WHERE idUser = NEW.idUser
    AND dataDevolucao IS NULL;

  IF total_abertos >= 5 THEN
    INSERT INTO avisos (idUser, mensagem)
    VALUES (NEW.idUser, 'Aviso: você atingiu o limite de 5 livros emprestados.');
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS t_avisar_limite_5 ON emprestimos;

CREATE TRIGGER t_avisar_limite_5
AFTER INSERT ON emprestimos
FOR EACH ROW
EXECUTE FUNCTION trg_avisar_limite_5();


CREATE OR REPLACE FUNCTION trg_verificar_atraso_devolucao()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.dataDevolucao IS NOT NULL
     AND (NEW.dataDevolucao - NEW.dataEmprestimo) > INTERVAL '7 days' THEN

    INSERT INTO devedores (idUser, idBook, dataEmprestimo)
    VALUES (NEW.idUser, NEW.idBook, NEW.dataEmprestimo)
    ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS t_verificar_atraso_devolucao ON emprestimos;

CREATE TRIGGER t_verificar_atraso_devolucao
AFTER UPDATE OF dataDevolucao ON emprestimos
FOR EACH ROW
EXECUTE FUNCTION trg_verificar_atraso_devolucao();
