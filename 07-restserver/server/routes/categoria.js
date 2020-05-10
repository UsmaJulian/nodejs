const express = require('express');
const _ = require('underscore');

let { verificaToken, verificaAdmin_Role } = require('../middlewares/autenticacion');

let app = express();

let Categoria = require('../models/categoria_model');


//MOSTRAR TODAS LAS CATEGORIAS
app.get('/categoria', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);


    Categoria.find({})
        .sort('descripcion') //se usa para ordenar
        .skip(desde)
        .limit(limite)
        .populate('usuario', 'nombre email') //campos de otras bases de datos 
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err
                });


            };
            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categoriaDB,
                    cantidad: conteo

                });
            });
        });
});

//MOSTRAR UNA CATEGORIA POR ID
app.get('/categoria/:id', (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    let id = req.params.id;

    Categoria.findById(id, {})
        .skip(desde)
        .limit(limite)
        .exec((err, categoriaDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            };
            if (!categoriaDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no existe'
                    }
                });


            };
            Categoria.countDocuments({}, (err, conteo) => {
                res.json({
                    ok: true,
                    categoriaDB,
                    cantidad: conteo

                });
            });
        });
});

//  CREAR UNA NUEVA CATEGORIA
app.post('/categoria', [verificaToken], (req, res) => {
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });
    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    })


});

//ACTUALIZAR LA CATEGORIA POR ID
app.put('/categoria/:id', [verificaToken], (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    };


    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });


        };
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});






//ELIMINA LA CATEGORIA POR ID
app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role], (req, res) => {
    let id = req.params.id;

    let cambiaEstado = {
        estado: false
    };
    Categoria.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });


        };
        if (err) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'El id no existe'
                }
            });


        };

        res.json({
            ok: true,
            message: 'Categoria Borrada',
            categoria: categoriaDB
        });
    });
});

module.exports = app;