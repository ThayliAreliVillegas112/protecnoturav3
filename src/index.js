const express = require ('express');
const morgan = require('morgan');
//ininicializaciones
const app = express();
//settings
app.set('port', process.env.PORT || 4000); //en caso de que haya un puerto definido lo usa, y si no, toma el puerto 4000
//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//routes
app.use(require('./routes/index.js'));
app.use('/client',require('./routes/client.js'));
app.use('/segClient',require('./routes/seguimientoCliente.js'));
app.use('/product',require('./routes/productos.js'));
app.use('/materiaP',require('./routes/materiaPrima.js'));
app.use('/harina',require('./routes/harina.js'));
app.use('/reventado',require('./routes/reventado.js'));
app.use('/mezcla',require('./routes/mezcla.js'));
app.use('/pedido',require('./routes/pedidos.js'));
app.use('/pedidoGranel',require('./routes/pedidosGranel.js'));
// app.use('/pelicula',require('./routes/pelicula.js'));
//starting server
app.listen(app.get('port'), () =>{
	console.log("Server on port", app.get('port'));
});