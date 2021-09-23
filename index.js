const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

//configuraciones
app.set('port',3000);
app.set('view engine','ejs');
app.set('views',path.join(__dirname, 'views'));
app.engine('html',require('ejs').renderFile);
app.set('json spaces',2);

//middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //datos que vienen de formularios
app.use(express.json());

//rutas
app.use(require('./routes'));

//archivo estatico
app.use(express.static(path.join(__dirname,'public')));

//empezando el servidor
app.listen(app.get('port'),()=>{
    console.log(`Server on Port ${app.get('port')}`);
});