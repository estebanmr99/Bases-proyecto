import { Router } from 'express';

const pg = require("pg");

const config = {
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE, 
  password: process.env.DATABASE_PASSWORD, 
  port: process.env.DATABASE_PORT, 
  max: process.env.DATABASE_MAX_CONNECTIONS,
  idleTimeoutMillis: process.env.DATABASE_TIME,
};

const router = Router();
var pool = new pg.Pool(config);

router.get('/:userId', (req, res) => {
  pool.connect(function(err,client,done) {
    if(err){
      console.log("not able to get connection "+ err);
      res.status(400).send(err);
    } 
    client.query('SELECT * from prc_seleccionar_usuario($1)',[req.params.userId] ,function(err,result) {
      done(); 
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      var user;
      for(var i = 0; i< result.rows.length; i++){
        user = result.rows[i];
      }
      res.status(200).send(user);
    });
  });
});

router.post('/', (req, res) => {
  pool.connect(function(err,client,done) {
    if(err){
        console.log("not able to get connection "+ err);
        res.status(400).send(err);
    } 
    client.query('SELECT * from prc_insertar_usuario($1,$2,$3,$4)',[req.body.carnet, req.body.nombre, req.body.beca, req.body.precio],
      function(err,result) {
        done(); 
        if(err){
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows);
    });
  });
});

router.delete('/:userId', (req, res) => {
  pool.connect(function(err,client,done) {
    if(err){
      console.log("not able to get connection "+ err);
      res.status(400).send(err);
    } 
    client.query('SELECT * from prc_eliminar_usuario($1)',[req.params.userId] ,function(err,result) {
      done(); 
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      var user;
      for(var i = 0; i< result.rows.length; i++){
        user = result.rows[i];
      }
      res.status(200).send(user);
    });
  });
});

router.put('/:userId', (req, res) => {
  pool.connect(function(err,client,done) {
    if(err){
      console.log("not able to get connection "+ err);
      res.status(400).send(err);
    } 
    client.query('SELECT * from prc_actualizar_usuario($1,$2,$3,$4)',[req.body.carnet, req.body.nombre, req.body.beca, req.body.precio],
      function(err,result) {
      done(); 
      if(err){
        console.log(err);
        res.status(400).send(err);
      }
      var user;
      for(var i = 0; i< result.rows.length; i++){
        user = result.rows[i];
      }
      res.status(200).send(user);
    });
  });
});

export default router;