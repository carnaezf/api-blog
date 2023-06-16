```markdown
# API Blog

Este repositorio contiene el código fuente de una API para un blog, desarrollada con MongoDB, Express y Node.js. La API proporciona varios endpoints para realizar solicitudes desde el front-end, como subir artículos, subir imágenes, enviar artículos, borrar artículos, etc.

## Configuración

Asegúrate de tener instalado [MongoDB](https://www.mongodb.com/), [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/) en tu entorno de desarrollo.

1. Clona este repositorio:

```bash
git clone https://github.com/carnaezf/api_blog.git
```

2. Navega al directorio del proyecto:

```bash
cd api_blog
```

3. Instala las dependencias del proyecto:

```bash
npm install
```


## Uso

Para iniciar el servidor de desarrollo, ejecuta el siguiente comando:

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

## Endpoints

A continuación se enumeran los principales endpoints disponibles en esta API:

- `POST /create`: Crea un nuevo artículo.
- `POST /subir-imagen/:id`: Sube una imagen relacionada con un artículo.
- `GET /articles/:ultimos?`: Obtiene todos los artículos o los tres ultimos.
- `GET /article/:id`: Obtiene un artículo específico por su ID.
- `PUT /articles/:id`: Actualiza un artículo existente.
- `DELETE /articles/:id`: Elimina un artículo existente.


## Contribuir

Si deseas contribuir a este proyecto, puedes seguir los pasos a continuación:

1. Haz un fork de este repositorio.
2. Crea una rama para tu nueva funcionalidad (`git checkout -b nueva-funcionalidad`).
3. Realiza tus cambios y commitea (`git commit -am 'Agrega nueva funcionalidad'`).
4. Haz push a la rama (`git push origin nueva-funcionalidad`).
5. Abre un Pull Request en GitHub.

## Licencia

Este proyecto está licenciado bajo la [MIT License](LICENSE).
```
