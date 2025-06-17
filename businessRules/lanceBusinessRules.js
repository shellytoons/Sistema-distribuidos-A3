import { db } from '../services/firebaseApp.js';
import { doc, getDoc } from 'firebase/firestore';

const lanceBusinessRules = {
    async canCreateLance(lance) {
        if (!lance || !lance.valor || !lance.idLeilao || !lance.idUsuario) {
            throw new Error("Dados do lance incompletos. Valor, ID do leilão e ID do usuário são obrigatórios.");
        }

        if (typeof lance.valor !== 'number' || lance.valor <= 0) {
            throw new Error("O valor do lance deve ser um número positivo.");
        }

        const leilaoRef = doc(db, "leiloes", lance.idLeilao);
        const leilaoSnap = await getDoc(leilaoRef);
        if (!leilaoSnap.exists()) {
            throw new Error("Leilão não encontrado.");
        }

        const leilao = leilaoSnap.data();
        const agora = new Date();
        const dataTermino = new Date(leilao.dataTermino);

        if (dataTermino <= agora) {
            throw new Error("O leilão já foi encerrado.");
        }

        if (lance.idUsuario === leilao.idCriador) {
            throw new Error("O criador do leilão não pode dar lances no próprio leilão.");
        }

        if (lance.valor <= (leilao.maiorLance || leilao.lanceInicial)) {
            throw new Error("O valor do lance deve ser maior que o lance atual.");
        }

        return true;
    }
};

export default lanceBusinessRules;
