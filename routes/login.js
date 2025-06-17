import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Chave secreta para assinar o token (em produção, guarde em variáveis de ambiente)
const SECRET_KEY = 'minha_chave_super_secreta';

const usuarioTeste = {
  email: 'teste@exemplo.com',
  senha: '123456'
};

router.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Verifica se o email e senha batem com o usuário fixo
  if (email === usuarioTeste.email && senha === usuarioTeste.senha) {
    // Gera o token JWT (payload pode ter dados do usuário)
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }
});

export default router;
