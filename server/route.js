const express = require('express');
const router = express.Router();
const db = require('./db');

// Cria um novo usuário
router.post('/users', (req, res) => {
    const { username, email } = req.body;
    const query = 'INSERT INTO users (username, email) VALUES (?, ?)';
    db.query(query, [username, email], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId, username, email });
    });
});

// Lista todos os usuários
router.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(200).json(results);
    });
});

// Atualiza um usuário
router.put('/users/:id', (req, res) => {
    const { username, email } = req.body;
    const query = 'UPDATE users SET username = ?, email = ? WHERE id = ?';
    db.query(query, [username, email, req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Usuário atualizado!');
    });
});

// Deleta um usuário
router.delete('/users/:id', (req, res) => {
    const query = 'DELETE FROM users WHERE id = ?';
    db.query(query, [req.params.id], (err) => {
        if (err) return res.status(500).send(err);
        res.status(200).send('Usuário deletado!');
    });
});

module.exports = router;
