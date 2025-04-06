require('dotenv').config();

const express = require('express');
const { dbConnection } = require('../database/config');
const cors = require('cors');

const path = require('path');

// Create express server
const app = express();

// Configure CORS
app.use(cors());

// Read and parse the body
app.use(express.json());

// Database connection
dbConnection();

// Public directory
app.use(express.static(path.resolve(__dirname, '../public')));

// User route
app.use('/api/usuarios', require('../routes/usuarios'));
app.use('/api/hospitales', require('../routes/hospitales'));
app.use('/api/medicos', require('../routes/medicos'));
app.use('/api/login', require('../routes/auth'));
app.use('/api/todo', require('../routes/busquedas'));
app.use('/api/upload', require('../routes/uploads'));

// Middleware to serve the frontend
app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

app.listen(process.env.PORT, ()=>{
    console.log('Servidor online: ', process.env.PORT);
});

