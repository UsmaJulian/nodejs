const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario_model');
const { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');


const app = express();


app.get('/usuario', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde) //se salta 5 registros 
        .limit(limite) // muestra solo 5 
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    cantidad: conteo

                });
            });
        });


    //res.json('get Usuario local');
});


//crear nuevos registros post
app.post('/usuario', [verificaToken, verificaAdmin_Role], (req, res) => {
    // res.json('post Usuario local');
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    // if (body.nombre === undefined) {
    //     res.status(400).json({
    //         ok: false,
    //         mensaje: 'Error, el nombre es necesario',

    //     });
    // } else {
    //     res.json({
    //         persona: body
    //     });
    // }

});
app.put('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    error: 'Token no válido'
                }
            });


        };
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

    // res.json({
    //     id
    // });
});
//ELIMINAR DE LA BASE DE DATOS TOTALMENTE 
// app.delete('/usuario/:id', function(req, res) {


//     let id = req.params.id;
//     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
//         if (err) {
//             return res.status(400).json({
//                 ok: false,
//                 err
//             });
//         };
//         if (usuarioBorrado === null) {
//             return res.status(400).json({
//                 ok: false,
//                 err: {
//                     message: 'Usuario no encontrado'
//                 }
//             });
//         };
//         res.json({
//             ok: true,
//             usuario: usuarioBorrado
//         });

//     });


//     //res.json('delete Usuario');
// });
// CAMBIAR EL ESTADO 
app.delete('/usuario/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };
    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true, }, (err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });


        };
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });


});

module.exports = app;