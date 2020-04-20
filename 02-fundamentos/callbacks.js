// se ejecuta despues de algo

setTimeout(() => {
    // console.log('Hola Mundo'); // este es el callback
}, 3000);

let getUsuarioById = (id, callback) => {
        let usuario = {
            nombre: 'Julian',
            id //id:id es redundante
        }
        if (id === 20) {
            callback(`El usuario con id ${id}, no existe en la base de datos `);
        } else {
            callback(null, usuario);
        }
    }
    // en un callback generalmente el 1- parametro es el error
getUsuarioById(1, (err, usuario) => {
    if (err) {
        return console.log(err);
    }

    console.log('Usuario de base de datos', usuario)
});