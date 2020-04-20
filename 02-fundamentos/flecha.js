// function sumar(a, b) {
//     return a + b;
// }

// console.log(sumar(10, 20));

// FUNCION DE FLECHA 
let sumar = (a, b) => {
    return a + b;
}

// otra manera
let sumar2 = (c, d) => c + d;

// console.log(sumar(10, 20));
// console.log(sumar2(10,20));


let saludar = () => 'Hola Mundo';
let saludar2 = (nombre) => `Hola ${nombre}`


// console.log(saludar());
// console.log(saludar2('Julian'));

//this apunta a lo que vale fuera de la funcion flecha
let deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneración',
    getNombre() {
        return `${this.nombre} ${this.apellido} - poder: ${this.poder}`
    }
};
console.log(deadpool.getNombre());