const mongoose = require('mongoose');
require('dotenv').config({path: 'variables.env'});

const conectarDB = async () => { //En una función la conexión.
    try{
        await mongoose.connect(process.env.DB_MONGO, {//1.mongoose.connect(url)
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('DB conectada');
    }catch(error){
        console.log(error);
        process.exit(1); //2.Salir de la app
    }
}

module.exports = conectarDB;