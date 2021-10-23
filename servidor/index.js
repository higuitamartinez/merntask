const express = require('express');
const app = express();
const cors = require('cors');

const conectarDB = require('./config/db');
require('dotenv').config({path: 'variables.env'});

conectarDB(); //1. Conectamos con la db en el index
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0'

app.listen(PORT, HOST, () => {
    console.log(`El servidor está funcionando en el puerto ${PORT}`);
});