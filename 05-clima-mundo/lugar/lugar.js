const axios = require('axios').default;
const argv = require('../config/yargs').argv;

const getLugarLatLon = async(direccion) => {
    let encodedUrl = encodeURI(direccion);

    let instance = axios.create({
        baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${encodedUrl}`,
        headers: { 'X-RapidAPI-Key': '2de006eb34mshfb63252de73eacap1f4943jsn5a86f63355be' }
    });
    // @ts-ignore
    let resp = await instance.get();
    if (resp.data.Results.length === 0) {
        throw new Error(`No hay resultados para ${direccion}`);
    }
    let data = resp.data.Results[0];
    let dir = data.name;
    let lat = data.lat;
    let lng = data.lon;
    return {
        dir,
        lat,
        lng
    }
}


module.exports = {
    getLugarLatLon
}