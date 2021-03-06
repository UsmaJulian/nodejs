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
let getEmpleado = (id, callback) => {
    let empleadoDB = empleados.find(empleado => empleado.id === id)
    if (!empleadoDB) {
        callback(`No existe un empleado con el Id ${id}`)
    } else {
        callback(null, empleadoDB);
    }
}

let getSalario = (empleado, callback) => {
    let salarioDB = salarios.find(salario => salario.id === empleado.id);
    if (!salarioDB) {
        callback(`No existe un salario relacionado con el usuario ${empleado.nombre}`)
    } else {
        callback(null, {
            nombre: empleado.nombre,
            salario: salarioDB.salario,
            id: empleado.id
        });
    }


}

getEmpleado(10, (err, empleado) => {

    if (err) {
        return console.log(err);

    }

    getSalario(empleado, (err, resp) => {
        if (err) {
            return console.log(err);
        };
        console.log(`El salario de ${resp.nombre} es de ${resp.salario}$`);
    });
});