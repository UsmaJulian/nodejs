const descripcion = {
    demand: true,
    alias: 'd',
    descripcion: 'Descripción de la tarear por hacer'
};

const completado = {
    alias: 'c',
    default: true,
    descripcion: 'marca como completado o pendiente la tarear '
};



const argv = require('yargs')
    .command('crear', 'Crea un elemento por hacer', {
        descripcion
        // : {
        //     demand: true,
        //     alias: 'd',
        //     descripcion: 'Descripción de la tarear por hacer'
        // }
    })
    .command('actualizar', 'Actualiza el estado como completado de una tarea', {
        descripcion
        // :{
        //     demand: true,
        //     alias: 'd',
        //     descripcion: 'Descripción de la tarear por hacer'
        // }
        ,
        completado
        // : {
        //     alias: 'c',
        //     default: true,
        //     descripcion: 'marca como completado o pendiente la tarear '
        // }
    }).command('borrar', 'Borra una tarea', {
        descripcion
        // : {
        //     demand: true,
        //     alias: 'd',
        //     descripcion: 'Descripción de la tarear por hacer'
        // }

    })
    .help()
    .argv;
module.exports = {
    argv
}