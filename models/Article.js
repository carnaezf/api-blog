const { Schema, model } = require('mongoose');

const ArticleSchema = Schema({
    // const Article = Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        default: 'default.png'
    },
});

module.exports = model( "Article", ArticleSchema, "articles" )
                    // mongoose pluraliza coleccion a: "articulos", para evitar confusión la defines en el 3 parametro models.           



