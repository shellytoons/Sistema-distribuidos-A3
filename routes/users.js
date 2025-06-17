import express from 'express';
import usersController from '../controllers/usersController.js';
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',function(req, res, next) {
  usersController.criaLoginFirebase(
    req.body.email,
    req.body.password
  ).then((resposta)=>{
    res.status(201).send(resposta);
  })
  .catch((erro)=>{
    res.status(500).send(erro);
  })
  
 
 // res.send('respond with a resource');
});

router.post('/login',function(req, res, next) {
  usersController.login(
    req.body
  ).then((resposta)=>{
    res.status(200).send(resposta);
  })
  .catch((erro)=>{
    res.status(401).send(erro);
  })
  
 
 // res.send('respond with a resource');
});


export default router;
