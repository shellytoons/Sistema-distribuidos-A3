import firestoreServices from '../services/firestore.js'; 
import { ApiKeyTest, createCreatedResponse, createOKResponse, createUnAuthResponse, createUnprocessableReponse } from '../services/index.js';

const leiloesController = {
    
    async getLeilaoById(id) {
        try {
            const leilao = await firestoreServices.getLeilaoById(id);
            if (leilao) {
                return createOKResponse(leilao);
            } else {
                
                return createUnprocessableReponse('Leilão não encontrado.'); 
            }
        } catch (error) {
            console.error('Erro ao buscar leilão por ID:', error);
           
            return createUnprocessableReponse('Erro interno ao buscar leilão.');
        }
    },

    
    async getAllLeiloes(apiKey) {
        
        if (ApiKeyTest(apiKey)) {
            try {
                const leiloes = await firestoreServices.getAllLeiloes();
                return createOKResponse(leiloes);
            } catch (error) {
                console.error('Erro ao buscar todos os leilões:', error);
                return createUnprocessableReponse('Erro interno ao buscar leilões.');
            }
        } else {
            return createUnAuthResponse(); 
        }
    },

   
    async addLeilao(leilaoData) {
        try {
           
            if (!leilaoData.titulo || !leilaoData.lanceInicial || !leilaoData.dataTermino) {
                return createUnprocessableReponse('Dados do leilão incompletos. Título, lance inicial e data de término são obrigatórios.');
            }
           

            const novoLeilao = await firestoreServices.saveLeilao(leilaoData);
            return createCreatedResponse(novoLeilao); 
        } catch (error) {
            console.error('Erro ao adicionar leilão:', error);
            return createUnprocessableReponse('Erro interno ao adicionar leilão.');
        }
    },

   
    async updateLeilao(id, updateData) {
        try {
           
            const leilaoExistente = await firestoreServices.getLeilaoById(id);
            if (!leilaoExistente) {
                return createUnprocessableReponse('Leilão não encontrado para atualização.');
            }

            const leilaoAtualizado = await firestoreServices.updateLeilao(id, updateData);
            return createOKResponse(leilaoAtualizado);
        } catch (error) {
            console.error('Erro ao atualizar leilão:', error);
            return createUnprocessableReponse('Erro interno ao atualizar leilão.');
        }
    },

   
    async deleteLeilao(id) {
        try {
            
            const leilaoExistente = await firestoreServices.getLeilaoById(id);
            if (!leilaoExistente) {
                return createUnprocessableReponse('Leilão não encontrado para exclusão.');
            }

            await firestoreServices.deleteLeilao(id);
            return createOKResponse({ message: 'Leilão deletado com sucesso.' });
        } catch (error) {
            console.error('Erro ao deletar leilão:', error);
            return createUnprocessableReponse('Erro interno ao deletar leilão.');
        }
    },

    
};

export default leiloesController;
