const { connection } = require('./database/connection.js');
const express = require('express')
const cors = require('cors')

// Inicializando app
console.log('App node de arrancada');

// Conectando a la BBDD.
connection();

// Crear servidor de Node
const app = express();
// const puerto = 3900;
const puerto = process.env.PORT;

// configurar cors
app.use(cors())

// Convertir body a objeto js
app.use(express.json()); // Recibir datos con content-type app/json
app.use(express.urlencoded({extended: true})) // form-urlencoded

// RUTAS
const articleRoutes = require('./routes/article')

// Cargo las rutas
app.use('/api', articleRoutes);


// Rutas pruebas harcodeadas
app.get('/probando', (req, res) => {

    console.log('Se a ejecutado en endpoint probando');

    return res.status(200).json([
        {
        tipo: 'Blog Personal',
        autor: 'WebSolutions'
        },
        {
            tipo: 'Blog Personal',
            autor: 'WebSolutions'
            }
])
});


app.get('/', (req, res) => {

    console.log('Se a ejecutado en endpoint probando');

    return res.status(200).send([{
        campo1: 'Este es un string',
        campo2: 'Este es otro string',
        url: "url-ficticia.com/curso"
    },
    {
        campo1: 'Este es un segundo string',
        campo2: 'Este es otro segundo string',
        url: "url-ficticia-2.com/curso"
    }
])
});




// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
})
