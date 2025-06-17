import firebaseApp from "./firebaseApp.js";
import { 
    getFirestore, 
    collection, 
    query, 
    where, 
    getDocs, 
    setDoc, 
    doc, 
    getDoc, 
    updateDoc, 
    deleteDoc 
} from "firebase/firestore";


const db = getFirestore(firebaseApp);


const leiloesCollection = collection(db, 'leiloes'); 
const lancesCollection = collection(db, 'lances'); 

const firestoreServices = {

    

    
    async saveLeilao(leilaoData) {
       
        const docRef = doc(leiloesCollection);
        await setDoc(docRef, { ...leilaoData, id: docRef.id }); 
        return { id: docRef.id, ...leilaoData }; 
    },

    
    async getAllLeiloes() {
        const result = [];
        const q = query(leiloesCollection);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        return result;
    },

    
    async getLeilaoById(id) {
        const docRef = doc(leiloesCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    },

    
    async updateLeilao(id, updateData) {
        const docRef = doc(leiloesCollection, id);
        await updateDoc(docRef, updateData);
        return { id, ...updateData }; 
    },

    
    async deleteLeilao(id) {
        const docRef = doc(leiloesCollection, id);
        await deleteDoc(docRef);
        return { id, message: "Document successfully deleted!" };
    },

    
    async saveLance(lanceData) {
        const docRef = doc(lancesCollection);
        await setDoc(docRef, { ...lanceData, id: docRef.id });
        return { id: docRef.id, ...lanceData };
    },

    
    async getAllLances() {
        const result = [];
        const q = query(lancesCollection);
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        return result;
    },

    
    async getLancesByLeilaoId(leilaoId) {
        const result = [];
        
        const q = query(lancesCollection, where("leilaoId", "==", leilaoId)); 
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            result.push({ id: doc.id, ...doc.data() });
        });
        return result;
    },

    
    async getLanceById(id) {
        const docRef = doc(lancesCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    },

    
    async updateLance(id, updateData) {
        const docRef = doc(lancesCollection, id);
        await updateDoc(docRef, updateData);
        return { id, ...updateData };
    },

    
    async deleteLance(id) {
        const docRef = doc(lancesCollection, id);
        await deleteDoc(docRef);
        return { id, message: "Document successfully deleted!" };
    }
};

export default firestoreServices;