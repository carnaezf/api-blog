const mongoose = require('mongoose');
require('dotenv').config();

const connection = async() => {

    try {

        await  mongoose.connect(process.env.conectar)

        console.log('Conectado correctamente a la BBDD "my_blog"');
        
    } catch (error) {
        console.log(error);
        throw new Error('No se a podido conectar a la BBDD')
    }
}


module.exports = {
    connection
}
