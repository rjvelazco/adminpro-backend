require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

// Crear el servidor de express
const app = express();

// app.use(express.static(path.resolve(__dirname, '../public')));

// Configurar CORS;
app.use(cors());

// Conexion a la base de datos.
dbConnection();

app.listen(process.env.PORT, ()=>{
    console.log('Servidor online: ', process.env.PORT);
});