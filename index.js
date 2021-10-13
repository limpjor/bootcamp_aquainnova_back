const express  = require('express')
const cors     = require('cors');
var mysql      = require('mysql');

var connection = mysql.createConnection({
    
   // socketPath : '/cloudsql/arched-envelope-328900:us-central1:xpertpro',
   host     : '34.121.4.15',
    port     : '3306',
    user     : 'xpertpro_jorge',
    password : 'bootcamp_aquainnova'
  });

connection.connect();

const app = express();
app.use(express.json())
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.get('/', (req,res)=>{res.send("Servidor Iniciado")})

app.post('/insert',async (req,res)=>{
    let rsp="OK";

    await connection.query(`
        INSERT INTO bootcamp.cliente (nombres,apellidos,correo,telefono,empresa,cargo,pais,region)
        VALUES ('${req.body.nombres}','${req.body.apellidos}','${req.body.correo}','${req.body.telefono}',
        '${req.body.empresa}','${req.body.cargo}','${req.body.pais}','${req.body.region}');
    `, function(err, rows, fields) {
        if (err)rsp=err;
        //console.log('The solution is: ', rows[0].solution);
      });
      connection.end();
     res.send(rsp)
})

app.listen(3030,()=>{
    console.log('servidor iniciado');
})