import { criarUsuarioComEmailSenha, 
         loginUsuarioComEmailSenha,
        criaJWT } from "../services/index.js";

const usersController = {
    criaLoginFirebase(email, senha) {
        return new Promise((resolve, reject)=>{
            criarUsuarioComEmailSenha(email, senha)
            .then(
                (credencial)=>{
                    let payload = {
                        usuario: credencial.user.uid,
                        email: credencial.user.email,
                        nivel: '3'
                    }
                    criaJWT(payload)
                    .then((jwt)=>resolve(jwt))
                }
            )
            .catch(
                (erro)=>{
                    reject(erro);
                }
            )
        });
        
    },
    login(obj) {
        //if (tipoLogin=='Firebase') {
            return this.loginFirebase(obj.email, obj.password);
        //}
    },
    loginFirebase(email, senha) {
        return new Promise((resolve, reject)=>{
            loginUsuarioComEmailSenha(email, senha)
            .then(
                (credencial)=>{
                    let payload = {
                        id : credencial.user.uid,
                        email: credencial.user.email,
                        nivel: 3
                    }
                    criaJWT(payload)
                    .then((jwt)=>{resolve(jwt)})
                    
                }
            )
            .catch(
                (erro)=>{
                    reject(erro);
                }
            )
        });
        
    }
};

export default usersController;