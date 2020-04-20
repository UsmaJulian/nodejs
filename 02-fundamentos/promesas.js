//ejecutar async o sync 

let empleados = [{
    id: 1,
    nombre: 'Julian'
}, {
    id: 2,
    nombre: 'Andrea'
}, {
    id: 1,
    nombre: 'Federico'
}];
let salarios = [{
    id: 1,
    salario: 1000
}, {
    id: 2,
    salario: 1000
}];

let getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        let empleadoDB = empleados.find(empleado => empleado.id === id)
        if (!empleadoDB) {
            reject(`No existe un empleado con el Id ${id}`)
        } else {
            resolve(empleadoDB);
        }
    });

}
let getSalario = (empleado) => {
    return new Promise((resolve, reject) => {
        let salarioDB = salarios.find(salario => salario.id === empleado.id);
        if (!salarioDB) {
            reject(`No existe un salario relacionado con el usuario ${empleado.nombre}`)
        } else {
            resolve({
                nombre: empleado.nombre,
                salario: salarioDB.salario,
                id: empleado.id
            });
        }
    })
}

getEmpleado(2).then(empleado => {
    // console.log('Empleado', empleado);
    getSalario(empleado).then(resp => {
        console.log(`El salario de ${resp.nombre} es de ${resp.salario} `);
    }, (err) => {
        console.log(err);
    });
}, (err) => {
    console.log(err);
});