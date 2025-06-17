import express from 'express';
var router = express.Router();

import lancesController from '../controllers/lancesController.js';
import { validaJWT } from '../services/index.js';


async function authenticateToken(req, res, next) {
    let token = req.get('Authorization');
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    } else {
        return res.status(401).json({ message: 'Token ausente ou mal formatado.' });
    }

    try {
        req.user = await validaJWT(token);
        next();
    } catch (err) {
        console.error('Erro na validação do JWT:', err.message);
        return res.status(403).json({ message: 'Token inválido ou expirado.' });
    }
}


function validarLance(data) {
    if (!data.leilaoId || typeof data.leilaoId !== 'string') {
        return 'leilaoId é obrigatório e deve ser uma string';
    }
    if (!data.valor || typeof data.valor !== 'number' || data.valor <= 0) {
        return 'valor é obrigatório e deve ser número maior que zero';
    }
    return null;
}


router.post('/', authenticateToken, async function(req, res, next) {
    const erroValidacao = validarLance(req.body);
    if (erroValidacao) {
        return res.status(400).json({ message: erroValidacao });
    }

    const lanceData = { ...req.body, usuarioId: req.user.uid };

    try {
        const response = await lancesController.addLance(lanceData);
        res.status(response.code).json(response.payload);
    } catch (error) {
        console.error('Erro na rota POST /lances:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


router.get('/', authenticateToken, async function(req, res, next) {
    try {
        const response = await lancesController.getAllLances(req.get('api_key'));
        res.status(response.code).json(response.payload);
    } catch (error) {
        console.error('Erro na rota GET /lances:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


router.get('/leilao/:leilaoId', async function(req, res, next) {
    try {
        const response = await lancesController.getLancesByLeilaoId(req.params.leilaoId);
        res.status(response.code).json(response.payload);
    } catch (error) {
        console.error('Erro na rota GET /lances/leilao/:leilaoId:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


router.get('/:id', async function(req, res, next) {
    try {
        const response = await lancesController.getLanceById(req.params.id);
        res.status(response.code).json(response.payload);
    } catch (error) {
        console.error('Erro na rota GET /lances/:id:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


router.put('/:id', authenticateToken, async function(req, res, next) {
    try {
        const response = await lancesController.updateLance(req.params.id, req.body);
        res.status(response.code).json(response.payload);
    } catch (error) {
        console.error('Erro na rota PUT /lances/:id:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});


router.delete('/:id', authenticateToken, async function(req, res, next) {
    try {
        const response = await lancesController.deleteLance(req.params.id);
        res.status(response.code).json(response.payload);
    } catch (error) {
        console.error('Erro na rota DELETE /lances/:id:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

export default router;
