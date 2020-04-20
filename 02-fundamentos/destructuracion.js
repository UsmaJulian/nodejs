let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre: function() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`
    }
};
// console.log(deadpool.getNombre());

// let nombre = deadpool.nombre;
// let apellido = deadpool.apellido;
// let poder = deadpool.poder;

//DESTRUCTURACION VIENE DESPUES DE LET
//para cambiar el identificador se agrega : y el nuevo (nombre cambiarlo por primer nombre)
//la destructuracion funciona sin renombrar 
let { nombre: primerNombre, apellido, poder } = deadpool;
console.log(primerNombre, apellido, poder);