// ---
// const { Router } = require('express');
// const router = express.Router();
// ---

const express = require("express");
const multer  = require('multer')

const ControllerArticle = require("../controllers/article")

const router = express.Router();

console.log('MULTER OBJECT: ',multer);

const almacenamiento = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/articles/')
    },

    filename: function (req, file, cb) {
        cb(null, 'article' + Date.now() + file.originalname)
    } 
});

const subidas = multer({
    storage: almacenamiento
})



// Rutas de pruebas
router.get('/ruta-de-prueba', ControllerArticle.prueba)
router.get('/curso', ControllerArticle.curso)

// Ruta util
router.post('/create', ControllerArticle.create);
router.get('/articles/:ultimos?', ControllerArticle.getArticles);
router.get('/article/:id', ControllerArticle.oneArticle);
router.delete('/article/:id', ControllerArticle.deleteArticle);
router.put('/article/:id', ControllerArticle.editArticle);
router.post('/subir-imagen/:id', [subidas.single('file0')],ControllerArticle.subir);
router.get('/imagen/:fichero', ControllerArticle.imagen);
router.get('/buscar/:busqueda', ControllerArticle.buscador);




module.exports = router;
