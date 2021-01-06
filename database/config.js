const mongoose = require('mongoose');


const dbConnection = async() =>{

    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('DB Online');
    } catch(err){
        console.log(err);
        throw new Error('Error al conectar con la base de datos, ver logs');
    }

}

module.exports = {
    dbConnection
}