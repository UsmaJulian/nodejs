/* 
Puerto 
*/
process.env.PORT = process.env.PORT || 3000;

/* 
Entorno
*/
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/* 
VENCIMIENTO DEL TOKEN
60 SEGUNDOS
60 MINUTOS
24 HORAS
30 DIAS
*/
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

/* 
SEED DE AUTENTIFICACIÓN (se crea en heroku una variable)
*/
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';




/* 
Base de datos
 */

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}
process.env.URLDB = urlDB;



/*
GOOGLE CLIENT_ID
 */
process.env.CLIENT_ID = process.env.CLIENT_ID || "256898232213-56h3r7a6tm8vt99cetn8qesm4moj6led.apps.googleusercontent.com";