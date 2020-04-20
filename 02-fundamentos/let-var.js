//let y var sirven para declarar una variable
var nombre = 'Wolverine';


if (true) {
    var nombre = 'Magneto';
}
console.log(nombre);
//var permite reinicializar
// let asigna cada variable en espacios de memoria diferentes
let nombre2 = 'Iron Man';

// para usar la variable en un let no se pone de nuevo el let
if (true) {
    let nombre2 = 'Thor';
}
console.log(nombre2);

//ciclo for con var
for (var index = 0; index <= 5; index++) {
    console.log(`index: ${index}`);

}
console.log(index);

//ciclo for con let
let i; //variable sin inicializar
for (let i = 0; i <= 5; i++) { // se crea la variable i solo en ese ambito
    console.log(`index: ${i}`);

}
console.log(i);