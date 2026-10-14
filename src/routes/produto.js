const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Valida o corpo da requisição (POST/PUT)
function validar(body) {
  const { nome, categoria, preco } = body;
  if (!nome || typeof nome !== 'string' || !nome.trim()) {
    return 'O campo "nome" é obrigatório';
  }
  if (!categoria || typeof categoria !== 'string' || !categoria.trim()) {
    return 'O campo "categoria" é obrigatório';
  }
  if (preco === undefined || preco === null || preco === '' || isNaN(Number(preco)) || Number(preco) < 0) {
    return 'O campo "preco" é obrigatório e deve ser um número maior ou igual a zero';
  }
  return null;
}

// GET /produto - lista todos
router.get('/', (req, res) => {
  db.query('SELECT id, nome, categoria, preco FROM produto', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar produtos' });
    }
    res.status(200).json(results);
  });
});

// GET /produto/:id - busca um
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  db.query('SELECT id, nome, categoria, preco FROM produto WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar produto' });
    }
    if (results.length === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json(results[0]);
  });
});

// POST /produto - cria
router.post('/', (req, res) => {
  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  const { nome, categoria, preco } = req.body;

  db.query(
    'INSERT INTO produto (nome, categoria, preco) VALUES (?, ?, ?)',
    [nome.trim(), categoria.trim(), Number(preco)],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao criar produto' });
      }
      res.status(201).json({
        mensagem: 'Produto criado com sucesso',
        produto: { id: result.insertId, nome: nome.trim(), categoria: categoria.trim(), preco: Number(preco) }
      });
    }
  );
});

// PUT /produto/:id - atualiza
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  const erro = validar(req.body);
  if (erro) return res.status(400).json({ erro });

  const { nome, categoria, preco } = req.body;

  db.query(
    'UPDATE produto SET nome = ?, categoria = ?, preco = ? WHERE id = ?',
    [nome.trim(), categoria.trim(), Number(preco), id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ erro: 'Erro ao atualizar produto' });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ erro: 'Produto não encontrado' });
      }
      res.status(200).json({
        mensagem: 'Produto atualizado com sucesso',
        produto: { id, nome: nome.trim(), categoria: categoria.trim(), preco: Number(preco) }
      });
    }
  );
});

// DELETE /produto/:id - remove
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ erro: 'ID inválido' });
  }

  db.query('DELETE FROM produto WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao excluir produto' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ erro: 'Produto não encontrado' });
    }
    res.status(200).json({ mensagem: 'Produto excluído com sucesso' });
  });
});

module.exports = router;
