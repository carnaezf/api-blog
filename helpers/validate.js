const validator = require('validator')

const validateArticle = (parametros) => {
    // Validar datos
    
    validate_title = !validator.isEmpty(parametros.title) && 
                    validator.isLength(parametros.title, {min:5, max:undefined})

    validate_content = !validator.isEmpty(parametros.content);

    // Validando en caso que alguno de false
    if( !validate_title || !validate_content ) {
        throw new Error('No se ha validado la información!!!')
    }     
}

module.exports = {
    validateArticle
}