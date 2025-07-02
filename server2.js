const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Permite receber JSON no corpo da requisição
app.use(express.static(path.join(__dirname, 'public')));

const bancoPath = path.join(__dirname, 'data', 'banco.json');

// Funções utilitárias
function lerBanco() {
  const data = fs.readFileSync(bancoPath, 'utf8');
  return JSON.parse(data);
}

function salvarBanco(dados) {
  fs.writeFileSync(bancoPath, JSON.stringify(dados, null, 2), 'utf8');
}

// Rota principal (frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: Listar todos os produtos
app.get('/api/produtos', (req, res) => {
  try {
    const produtos = lerBanco();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao ler banco de dados.' });
  }
});

// API: Adicionar produto
app.post('/api/produtos', (req, res) => {
  try {
    const produtos = lerBanco();
    produtos.push(req.body);
    salvarBanco(produtos);
    res.status(201).json({ mensagem: 'Produto adicionado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar produto.' });
  }
});

// API: Atualizar produto por índice
app.put('/api/produtos/:index', (req, res) => {
  try {
    const produtos = lerBanco();
    const index = parseInt(req.params.index);
    if (index < 0 || index >= produtos.length) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }
    produtos[index] = req.body;
    salvarBanco(produtos);
    res.json({ mensagem: 'Produto atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar produto.' });
  }
});

// API: Deletar produto por índice
app.delete('/api/produtos/:index', (req, res) => {
  try {
    const produtos = lerBanco();
    const index = parseInt(req.params.index);
    if (index < 0 || index >= produtos.length) {
      return res.status(404).json({ erro: 'Produto não encontrado.' });
    }
    produtos.splice(index, 1);
    salvarBanco(produtos);
    res.json({ mensagem: 'Produto deletado com sucesso.' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao deletar produto.' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
