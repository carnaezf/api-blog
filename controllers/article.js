const fs = require('fs');
const path = require('path');
const { validateArticle } = require('../helpers/validate');
const Article = require('../models/Article');

console.log("PRUEBA MODELO", Article);

const prueba = (req, res) => {
    return res.status(200).json({
        mensaje: 'Soy una acción de prueba del controlador de articulos'
    });
};

const curso = (req, res) => {
    console.log('Se a ejecutado en endpoint probando');
    return res.status(200).send([{
        campo1: 'Este curso es un string',
        campo2: 'Este curso es otro string',
        url: "url-ficticia.com/curso"
    },
    {
        campo1: 'Este curso es un segundo string',
        campo2: 'Este curso es otro segundo string',
        url: "url-ficticia-2.com/curso"
    }
])
}

const create = (req, res) => {

    // Recoger parametros por post a guardar.
    let parametros = req.body;

    console.log(parametros);

    // Validar datos.
    try {

        validateArticle(parametros);
        
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos por enviar',
        })
    }


    // Crear el objeto a guardar.
    const article = new Article(parametros);


    // Asignar valores a objeto basado en el modelo (manual o automático)
    // article.title = parametros.title;


    // Guardar el objeto en la Base de datos
    article.save((error, articuloGuardado) => {
        if(error || !articuloGuardado) {
            return res.status(400).json({
                status: 'error',
                mensaje: 'No se ha guardado el articulo',
            });
        }
        // Devolver resultado.
        return res.status(200).json({
            status: "success",
            article: articuloGuardado,
            mensaje: 'Acción de guardar',
        })
    })
}

const getArticles = (req, res) => {

    let consulta = Article.find({});

    if(req.params.ultimos) {
        consulta.limit(3)
    }

    consulta.sort({date: -1})
            .exec((error, articles) => {

            if(error || !articles) {
                return res.status(404).json({
                    status: 'error',
                    mensaje: 'No se han encontrado artículos'
                })
        }

        res.status(200).send({
            status: 'success',
            parametro: req.params.ultimos,
            contador: articles.length,
            articles
        })
    })
};

const oneArticle = (req, res) => {
    // Recoger un id por la url
    let id = req.params.id;

    // Buscar el articulo en la BBDD
    // equivale a SELECT * FROM articles WHERE id == id
    Article.findById(id, (error, article) => {
        // Si no existe devolver el error
        if(error || !article) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se a encontrado el artículo'
            })
    }
        // Devolver el resultado
        return res.status(200).json({
            status: 'success',
            article
        })
    })
};

const deleteArticle = (req, res) => {

    let article_id = req.params.id;

    Article.findByIdAndDelete({_id: article_id}, (error, deletedArticle)=> {

        if(error || !deletedArticle) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'Error al borrar el articulo'
            })
        };


        return res.status(200).json({
            status: 'success',
            article: deletedArticle,
            mensaje: 'Metodo de borrar'
        });
    });
};

const editArticle = (req, res) => {
    // Regoger id a editar
    let article_id = req.params.id;

    // Recoger datos del body
    let parametros = req.body;

    // Validar datos
    try {

        validateArticle(parametros)

    } catch (error) {
        return res.status(400).json({
            status: 'error',
            mensaje: 'Faltan datos por enviar',
        })
    }
    // Buscar y actualizar articulo
    Article.findByIdAndUpdate({_id: article_id}, req.body, {new: true}, (error, editedArticle) => {

        if(error || !editedArticle) {
            return res.status(500).json({
                status: 'error',
                mensaje: 'Error al actualizar'
            })
        };

            // Devolver respuesta
        return res.status(200).json({
            status: 'success',
            article: editedArticle,
        });
    });
};

const subir = (req, res) => {

    // Configurar multer



    // Recoger el fichero de imagen subida
    if ( !req.file && !req.files ) {
        return res.status(404).json({
            status: 'error',
            mensaje: 'Petición invalida'
            });
    }


    // Nombre del archivo
    let fileName = req.file.originalname;


    // Extension del archivo
    let file_split = fileName.split('.');
    let file_extension = file_split[1]
    


    // Comprobar extension correcta
    if (file_extension !== 'jpg' && file_extension !== 'jpeg' &&
        file_extension !== 'png' && file_extension !== 'gif') {

            // Borrar archivo y dar respuesta
            fs.unlink(req.file.path, (error) =>{
                return res.status(400).json({
                    status: 'error',
                    mensaje: 'Imagen invalida'
                })
            })
        } else {

                // Regoger id del articulo
        let article_id = req.params.id;

        // Buscar y actualizar articulo
        Article.findByIdAndUpdate({_id: article_id}, {image: req.file.filename }, {new: true}, (error, editedArticle) => {

            if(error || !editedArticle) {
                return res.status(500).json({
                    status: 'error',
                    mensaje: 'Error al actualizar'
                })
            };

                // Devolver respuesta
            return res.status(200).json({
                status: 'success',
                article: editedArticle,
                fichero: req.file
            });
        });
        }
};

const imagen = ( req, res ) => {
    // Nombre del archivo
    let fichero = req.params.fichero
    let ruta_fisica = './images/articles/' + fichero;

    fs.stat(ruta_fisica, (error, existe) => {
        if(existe) {
            return res.sendFile(path.resolve(ruta_fisica))
        } else {
            return res.status(404).json({
                status: 'error',
                mensaje: 'La imagen no existe',
                existe,
                fichero,
                ruta_fisica
            })
        }
    })
}

const buscador = ( req, res ) => {
    // Sacar string de busqueda
    let busqueda = req.params.busqueda;

    // find OR 
    Article.find({ "$or" : [
        { 'title': { '$regex': busqueda, '$options': 'i' } },
        { 'content': { '$regex': busqueda, '$options': 'i' } },
    ]})
    .sort( { date: -1 } )
    .exec( (error, articulosEncotrados) => {

        if( error || !articulosEncotrados || articulosEncotrados <= 0 ) {
            return res.status(404).json({
                status: 'error',
                mensaje: 'No se han encontrado artículos'
            })
        }

        return res.status(200).json({
            status: 'success',
            articles: articulosEncotrados
        })
    }) 
}

module.exports = {
    prueba,
    curso,
    create,
    getArticles,
    oneArticle,
    deleteArticle,
    editArticle,
    subir,
    imagen,
    buscador

}