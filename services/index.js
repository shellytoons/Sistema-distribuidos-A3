import Response from '../models/Response.js';
import firebaseApp from './firebaseApp.js';
import { getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword  } from "firebase/auth";

import { SignJWT, jwtVerify } from "jose"
import { segredoDoJWT } from './segredos.js';
    
export function loginUsuarioComEmailSenha(email, password) {
        return new Promise( (resolve, reject)=>{
            const auth = getAuth();
            signInWithEmailAndPassword(auth, email, password)
              .then((userCredential) => {
                resolve(userCredential);
              })
              .catch((error) => {
                reject(error);
              });
        });
    }
    

export function criarUsuarioComEmailSenha(email, password) {
    return new Promise( (resolve, reject)=>{
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            resolve(userCredential);
          })
          .catch((error) => {
            reject(error);
          });
    });
}


export function ApiKeyTest(key) {
        return (key == 'vaporeon');
    }

export function createOKResponse(payload) {
        return new Response(200,payload,'OK');
    }

export function createUnAuthResponse() {
        return new Response(403,undefined,'Não Autorizado')
    }

export function createCreatedResponse(payload) {
        return new Response(201,payload,'Criado com sucesso');
    }

export function createUnprocessableReponse(msg) {
        return new Response(422, { message: msg }, msg);
    }


export function criaJWT(payload) {
  return new Promise((resolve, reject)=>{
    new SignJWT(payload)
    .setIssuedAt()
    .setSubject('login de usuário da nossa API')
    .setProtectedHeader({alg: 'HS256'})
    .setExpirationTime('7d')
    .sign(segredoDoJWT)
    .then((jwt)=> resolve(jwt))
    .catch((error)=>reject(error))
  });
}

export function validaJWT(jwt) {
  return new Promise((resolve, reject)=>{
    jwtVerify(jwt,
              segredoDoJWT, 
              {algorithms:['HS256']})
      .then((payload)=>resolve(payload))
      .catch((error)=>reject(error))
  });
}

