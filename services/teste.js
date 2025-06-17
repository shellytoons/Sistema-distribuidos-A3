import { criaJWT } from "./index.js";

criaJWT({nome:'jean', tipo: 'prof'})
.then((jwt)=>console.log(jwt))
.catch((erro)=> console.log(erro))