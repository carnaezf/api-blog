const mongoose = require('mongoose');

const connection = async() => {

    try {

        await  mongoose.connect('mongodb://localhost:27017/my_blog')

        console.log('Conectado correctamente a la BBDD "my_blog"');
        
    } catch (error) {
        console.log(error);
        throw new Error('No se a podido conectar a la BBDD')
    }
}


module.exports = {
    connection
}
