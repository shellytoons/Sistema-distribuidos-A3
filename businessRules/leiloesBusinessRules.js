import { db } from '../services/firebaseApp.js';
import { doc, getDoc } from 'firebase/firestore';

const leiloesBusinessRules = {
    async canCreateLeilao(leilao) {
        if (!leilao || !leilao.titulo || !leilao.descricao || !leilao.lanceInicial || !leilao.dataTermino || !leilao.idCriador) {
            throw new Error("Dados do leilão incompletos. Título, descrição, lance inicial, data de término e ID do criador são obrigatórios.");
        }

        if (typeof leilao.lanceInicial !== 'number' || leilao.lanceInicial <= 0) {
            throw new Error("Lance inicial deve ser um número positivo.");
        }

        const dataTermino = new Date(leilao.dataTermino);
        const dataAtual = new Date();
        if (isNaN(dataTermino) || dataTermino <= dataAtual) {
            throw new Error("Data de término inválida ou no passado. O leilão deve terminar no futuro.");
        }

        const userRef = doc(db, "users", leilao.idCriador);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
            throw new Error(`Criador (ID: ${leilao.idCriador}) não encontrado.`);
        }

        return true;
    },

    async canUpdateLeilao(leilaoId, novosDadosLeilao) {
        if (!leilaoId) {
            throw new Error("ID do leilão é obrigatório para atualização.");
        }

        const leilaoRef = doc(db, "leiloes", leilaoId);
        const leilaoSnap = await getDoc(leilaoRef);
        if (!leilaoSnap.exists()) {
            throw new Error("Leilão a ser atualizado não encontrado.");
        }

        const leilaoExistente = leilaoSnap.data();

        if (novosDadosLeilao.lanceInicial !== undefined) {
            if (typeof novosDadosLeilao.lanceInicial !== 'number' || novosDadosLeilao.lanceInicial <= 0) {
                throw new Error("Lance inicial para atualização deve ser um número positivo.");
            }

            if (leilaoExistente.lances && leilaoExistente.lances.length > 0) {
                throw new Error("Não é possível alterar o lance inicial de um leilão que já possui lances.");
            }
        }

        if (novosDadosLeilao.dataTermino !== undefined) {
            const dataTermino = new Date(novosDadosLeilao.dataTermino);
            const dataAtual = new Date();
            if (isNaN(dataTermino) || dataTermino <= dataAtual) {
                throw new Error("Nova data de término inválida ou no passado.");
            }
        }

        return true;
    }
};

export default leiloesBusinessRules;
