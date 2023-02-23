require('dotenv').config();

const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');

const path = require('path');

// Crear el servidor de express
const app = express();

// Configurar CORS;
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Conexion a la base de datos.
dbConnection();

// Directorio Publico
app.use(express.static(path.resolve(__dirname, '../public')));

// Ruta usuario
app.use('/api/usuarios', require('../routes/usuarios'));
app.use('/api/hospitales', require('../routes/hospitales'));
app.use('/api/medicos', require('../routes/medicos'));
app.use('/api/login', require('../routes/auth'));
app.use('/api/todo', require('../routes/busquedas'));
app.use('/api/upload', require('../routes/uploads'));

// Lo ultimo
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});


app.listen(process.env.PORT, ()=>{
    console.log('Servidor online: ', process.env.PORT);
});