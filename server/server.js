require('dotenv').config();

const express = require('express');
const { dbConnection } = require('../database/config');

const cors = require('cors');

// Crear el servidor de express
const app = express();

// Configurar CORS;
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Conexion a la base de datos.
dbConnection();

// Ruta usuario
app.use('/api/usuarios', require('../routes/usuarios'));
app.use('/api/login', require('../routes/auth'));

app.listen(process.env.PORT, ()=>{
    console.log('Servidor online: ', process.env.PORT);
});