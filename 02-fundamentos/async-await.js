/**
 * Async Await
 */

// let getNombre = () => {
//     return new Promise((resolve, reject) => { 
// resolve('Julian') });
// }

//=== es igual a tener 
let getNombreAsync = async() => {
    // throw new Error('Texto de error');
    return 'Julian';
}

getNombreAsync().then(nombre => {
        // console.log(nombre);
    })
    .catch(e => {
        // console.log('Error de ASYNC', e);
    })


let getNombreAwait = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Julian')
        }, 3000);
    });
}

let saludoAwait = async() => {
    let nombre = await getNombreAwait();

    return `Hola ${nombre}`;

}

saludoAwait().then(mensaje => {
    console.log(mensaje);
})