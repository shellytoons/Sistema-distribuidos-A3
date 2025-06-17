import oracledb from 'oracledb';
import Time from '../models/Time.js';

function createConnection(){ 
    return new Promise((resolve, reject) => {
        oracledb.getConnection({
          user: process.env.ORACLE_USER,
          password: process.env.ORACLE_PASSWORD,
          connectionString: process.env.ORACLE_CONNECTIONSTRING,
        })
        .then((connection) => {
            console.log('Connected to Oracle Database');
            resolve(connection);
        })
        .catch((err) => {
            console.error('Error connecting to Oracle Database:', err);
            reject('Error connecting to Oracle Database:', err);
        });
    })
}  
let _connection = null;

function getConnection() {
    return new Promise((resolve, reject) => {
        if ( _connection &&  
             _connection != null &&
             _connection.isHealthy() ) {
            resolve( _connection);
        } else {
          console.log('Connection is null, broken or unhealthy, creating a new one');
          _connection = null;
          createConnection()
            .then((connection) => {
              _connection = connection;
              resolve( _connection);
            })
            .catch((err) => {
              console.error('Error getting connection:', err);
              reject(err);
            });
        }
      })
    }

const oracleServices = {
    getAllTimes() {
        getConnection()
        .then((conn)=>{
            conn.execute('select * from times')
            .then((resultSet)=>{
                if (resultSet.rows.length == 0) {
                    resolve([]);
                }
                let arrTimes=[];
                resultSet.rows.array.forEach(row => {
                    let obj = {
                        id: row[0],
                        nome: row[1],
                        federacao: row[2],
                        categorias: row[4]
                    }
                    //let time = Time.buildFromJSON(obj);
                    let time = new Time(row[0],row[1], row[2], row[3]);
                    arrTimes.push(time);
                });
                resolve(arrTimes);
            })
            .catch((erro)=>console.log(erro))
        })
    },
    getTimeById(id) {
        getConnection()
        .then((conn)=>{
            conn.execute(`select * from times 
                         where id = :1`,[id])
            .then((resultSet)=>{
                if (resultSet.rows.length == 0) {
                    resolve([]);
                }
                let arrTimes=[];
                resultSet.rows.array.forEach(row => {
                    let obj = {
                        id: row[0],
                        nome: row[1],
                        federacao: row[2],
                        categorias: row[4]
                    }
                    //let time = Time.buildFromJSON(obj);
                    let time = new Time(row[0],row[1], row[2], row[3]);
                    arrTimes.push(time);
                });
                resolve(arrTimes);
            })
            .catch((erro)=>console.log(erro))
        })
    }
}

export default oracleServices;