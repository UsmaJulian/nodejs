const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const Usuario = require('../models/usuario_model');
const Producto = require('../models/producto_model')
const fs = require('fs');
const path = require('path');
// default options
app.use(fileUpload());


app.put('/upload/:tipo/:id', function(req, res) {
    let tipo = req.params.tipo;
    let id = req.params.id;
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se ha seleccionado ningún archivo'
            }
        });
    }
    //VALIDA LOS TIPOS 
    let tiposValidos = ['productos', 'usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Los tipos permitidos son ' + tiposValidos.join(', ')
            }
        })
    }



    let archivo = req.files.archivo;
    // obtener extension
    let nombreArchivoSplit = archivo.name.split('.');

    let extension = nombreArchivoSplit[nombreArchivoSplit.length - 1];

    //Extensiones permitidas
    let extesionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extesionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones permitidas son ' + extesionesValidas.join(','),
                ext: extension
            }
        });
    }
    //CAMBIAR NOMBRE AL ARCHIVO
    let nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extension }`;

    //LUGAR SE QUE LA IMAGEN SE SUBIO
    archivo.mv(`uploads/${ tipo }/${ nombreArchivo }`, (err) => {
        if (err)
            return res.status(500).json({
                ok: false,
                err
            });
        //AQUI LA IMAGEN YA ESTA CARGADA
        // res.json({
        //     ok: true,
        //     err: {
        //         message: 'Imagen subida correctamente'
        //     }
        // });
        switch (tipo) {
            case tipo = 'usuarios':
                imagenUsuario(id, res, nombreArchivo);
                break;
            case tipo = 'productos':
                imagenProducto(id, res, nombreArchivo);
                break;
        }


    });
});

function imagenUsuario(id, res, nombreArchivo) {
    Usuario.findById(id, (err, usuarioDB) => {
        if (err) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!usuarioDB) {
            borrarArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no existe'
                }
            });
        }
        //OBTENER EL PATH DE LA IMAGEN
        // let pathImagen = path.resolve(__dirname, `../../uploads/usuarios/${ usuarioDB.img }`);
        // if (fs.existsSync(pathImagen)) {
        //     //BORRAR EL PATH DE LA IMAGEN 
        //     fs.unlinkSync(pathImagen);
        // }
        borrarArchivo(usuarioDB.img, 'usuarios');




        usuarioDB.img = nombreArchivo;
        usuarioDB.save((err, usuarioGuardado) => {
            res.json({
                ok: true,
                usuario: usuarioGuardado,
                img: nombreArchivo
            });
        });
    });
}

function imagenProducto(id, res, nombreArchivo) {
    Producto.findById(id, (err, productoDB) => {
        if (err) {
            borrarProducto(nombreArchivo, 'productos');
            res.status(500).json({
                ok: false,
                err
            })
        }
        if (!productoDB) {
            borrarProducto(nombreArchivo, 'productos');
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no existe'
                }
            });
        }
        borrarProducto(productoDB.img, 'productos');
        productoDB.img = nombreArchivo;
        productoDB.save((err, productoGuardado) => {
            res.json({
                ok: true,
                producto: productoGuardado,
                img: nombreArchivo
            });
        });
    });
}

function borrarArchivo(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        //BORRAR EL PATH DE LA IMAGEN 
        fs.unlinkSync(pathImagen);
    }
}

function borrarProducto(nombreImagen, tipo) {
    let pathImagen = path.resolve(__dirname, `../../uploads/${ tipo }/${ nombreImagen }`);
    if (fs.existsSync(pathImagen)) {
        //BORRAR EL PATH DE LA IMAGEN DE PRODUCTO 
        fs.unlinkSync(pathImagen);
    }
}
module.exports = app;