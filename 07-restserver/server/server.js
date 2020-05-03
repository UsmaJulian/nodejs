require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();


const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//HABILITAR LA CARPETA PUBLIC
app.use(express.static(path.resolve(__dirname, '../public')));

//configuración global de las rutas de acceso 
app.use(require('./routes/index'));
// app.use(require('./routes/login'));



mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, res) => {

    if (err) throw err;

    console.log('Base de datos Online');

});

app.listen(process.env.PORT, () => { console.log('Escuchando puerto:', process.env.PORT); });