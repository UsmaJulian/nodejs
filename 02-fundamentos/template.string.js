let nombre = 'Deadpool';
let real = 'Wade Winston';


console.log(nombre + ' ' + real);

//templates literales ``
console.log(`${nombre} ${real}`);


let nombreCompleto = nombre + ' ' + real;
let nombreTemplate = `${nombre} ${real}`;

console.log(nombreCompleto === nombreTemplate);

function getNombre() {
    return `${nombre} ${real}`;
}
console.log(`El Nombre de: ${getNombre()}`);