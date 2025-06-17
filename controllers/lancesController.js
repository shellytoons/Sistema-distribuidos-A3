import firestoreServices from '../services/firestore.js';

const lancesController = {
  async addLance(lanceData) {
    try {
      const novoLance = await firestoreServices.saveLance(lanceData);
      return { code: 201, payload: novoLance };
    } catch (error) {
      return { code: 500, payload: { error: error.message } };
    }
  },

  async getAllLances() {
    try {
      const lances = await firestoreServices.getAllLances();
      return { code: 200, payload: lances };
    } catch (error) {
      return { code: 500, payload: { error: error.message } };
    }
  },

  async getLanceById(id) {
    try {
      const lance = await firestoreServices.getLanceById(id);
      if (!lance) {
        return { code: 404, payload: { message: 'Lance não encontrado' } };
      }
      return { code: 200, payload: lance };
    } catch (error) {
      return { code: 500, payload: { error: error.message } };
    }
  },

  async getLancesByLeilaoId(leilaoId) {
    try {
      const lances = await firestoreServices.getLancesByLeilaoId(leilaoId);
      return { code: 200, payload: lances };
    } catch (error) {
      return { code: 500, payload: { error: error.message } };
    }
  },

  async updateLance(id, updateData) {
    try {
      const lanceAtualizado = await firestoreServices.updateLance(id, updateData);
      return { code: 200, payload: lanceAtualizado };
    } catch (error) {
      return { code: 500, payload: { error: error.message } };
    }
  },

  async deleteLance(id) {
    try {
      const resultado = await firestoreServices.deleteLance(id);
      return { code: 200, payload: resultado };
    } catch (error) {
      return { code: 500, payload: { error: error.message } };
    }
  }
};

export default lancesController;
