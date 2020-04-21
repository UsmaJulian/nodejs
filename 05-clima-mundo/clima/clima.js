const axios = require('axios').default;



let getClima = async(lat, lng) => {
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=17bbaffe1ba4d95d942dafcc66f4cac5`)
    return resp.data.main.temp;
}
module.exports = {
    getClima
}