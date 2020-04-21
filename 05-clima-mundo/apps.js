// const axios = require('axios').default;
const lugar = require('./lugar/lugar');
const argv = require('./config/yargs').argv;
const clima = require('./clima/clima');

// console.log(argv.direccion);

// let encodedUrl = encodeURI(`${argv.direccion}`);

// const instance = axios.create({
//     baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
//     headers: { 'X-RapidAPI-Key': '2de006eb34mshfb63252de73eacap1f4943jsn5a86f63355be' }
// });

// instance.get().then(resp => {
//     console.log(resp.data.Results[0]);
//     console.log(resp.data.Results[0].name);
//     console.log(resp.data.Results[0].lat);
//     console.log(resp.data.Results[0].lon);
// }).catch(err => {
//     console.log('ERROR!!!!', err);
// })
// lugar.getLugarLatLon(argv.direccion)
//     .then(resp => {
//         console.log(resp);
//     })
//     .catch(e => console.log(e));

// clima.getClima(3.030000, -75.169998)
//     .then(temp => { console.log(temp); })
//     .catch(e => console.log(e));

let getInfo = async(direccion) => {
    try {
        let coors = await lugar.getLugarLatLon(direccion);
        let temp = await clima.getClima(coors.lat, coors.lng);
        return `El Clima en: ${coors.dir} es de ${temp}`;
    } catch (error) {
        return `No se pudo determinar el clima en ${direccion}`;
    }

}

getInfo(argv.direccion)
    .then(mensaje => console.log(mensaje))
    .catch(e => console.log(e));