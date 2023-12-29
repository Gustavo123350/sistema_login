const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173', // URL do seu frontend Vue
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Authorization, Origin, X-Requested-With, Content-Type, Accept',
};

app.use(cors(corsOptions));

// Rota de login com geração de token JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign({ userId: user.id }, 'seuSegredo', { expiresIn: '1h' });

  res.json({ message: 'Login bem-sucedido', token });
});

// Rotas de CRUD de usuários

// Criar usuário
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Obter todos os usuários
app.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Obter um usuário específico por ID
app.get('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Atualizar um usuário por ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar um usuário por ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});
// Rota para buscar os detalhes do usuário autenticado
app.get('/userDetails', async (req, res) => {
    try {
      // Obter o token do cabeçalho de autorização
      const token = req.headers.authorization;
  
      // Verificar se o token está presente
      if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
      }
  
      // Verificar e decodificar o token para obter o ID do usuário
      const decodedToken = jwt.verify(token, 'seuSegredo');
      const userId = decodedToken.userId;
  
      // Buscar os detalhes do usuário com base no ID obtido do token
      const userDetails = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
        select: {
          id: true,
          name: true,
          email: true,
          // Outros campos que você deseja retornar
        },
      });
  
      // Verificar se os detalhes do usuário foram encontrados
      if (!userDetails) {
        return res.status(404).json({ error: 'Detalhes do usuário não encontrados' });
      }
  
      // Retornar os detalhes do usuário
      res.json(userDetails);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar detalhes do usuário' });
    }
  });
  
  

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
