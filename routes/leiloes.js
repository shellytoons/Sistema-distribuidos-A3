import express from 'express';
var router = express.Router();

import leiloesController from '../controllers/leiloesController.js';
import { validaJWT, ApiKeyTest } from '../services/index.js';


async function authenticateToken(req, res, next) {
    let token = req.get('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7); 
    } else {
        return res.status(401).json({ message: 'Token de autenticação não fornecido ou mal formatado.' });
    }

    try {
        const payload = await validaJWT(token);
        req.user = payload;
        next();
    } catch (err) {
        console.error('Erro na validação do JWT:', err.message);
        return res.status(403).json({ message: 'Token de autenticação inválido ou expirado.' });
    }
}

router.get('/', async function(req, res, next) {
    let apiKey = req.get('api_key');
    let response = await leiloesController.getAllLeiloes(apiKey);
    res.status(response.code).json(response.payload);
});

router.get('/:id', async function(req, res, next) {
    let response = await leiloesController.getLeilaoById(req.params.id);
    res.status(response.code).json(response.payload);
});

router.post('/', authenticateToken, async function(req, res, next) {
    let response = await leiloesController.addLeilao(req.body); 
    res.status(response.code).json(response.payload);
});

router.put('/:id', authenticateToken, async function(req, res, next) {
    let response = await leiloesController.updateLeilao(req.params.id, req.body);
    res.status(response.code).json(response.payload);
});

router.delete('/:id', authenticateToken, async function(req, res, next) {
    let response = await leiloesController.deleteLeilao(req.params.id);
    res.status(response.code).json(response.payload);
});

export default router;