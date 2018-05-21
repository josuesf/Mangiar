var express = require('express');
var multer = require('multer');
var bodyParser = require("body-parser");
var session = require('express-session');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})
var upload = multer({ storage: storage }).single('picture');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.disable('x-powered-by');
app.use(session({ secret: '_secret_', cookie: { maxAge: 60 * 60 * 1000 }, saveUninitialized: false, resave: false }));
// app.use(authChecker);

app.get('/', function (req, res,next) {
  const db = require('../connectionbd')
	db.query('SELECT * FROM account', [], (err, r) => {
		if (err) {
			return next(err)
		}
		res.send(r.rows)
	})
})
app.post('/login_', function (req, res) {
	//call Model account
	const cuenta = require('./models/cuenta')
	//set params
	const params = { usuario: req.body.usuario, contrasena: req.body.contrasena }
	//call Model.login function
	cuenta.login(params, function (err, cuenta) {
		if (err) return res.json({err})
		app.locals.usuario = cuenta.usuario
		return res.json({cuenta})
	})
})

//Routes
var cuentas_api = require('./routes/api-cuentas')
var modulos_api = require('./routes/api-modelos')
var perfiles_api = require('./routes/api-perfiles')
var sucursales_api = require('./routes/api-sucursales')
var ubigeos_api = require('./routes/api-ubigeos')
var puntos_ventas_api = require('./routes/api-puntos-ventas')
var documentos_api = require('./routes/api-documentos')
var almacenes_api = require('./routes/api-almacenes')
var personas_api = require('./routes/api-personas')
var eproductos_categoria = require('./routes/eproductos.categoria')
var eproductos_producto = require('./routes/eproductos.producto')
// function authChecker(req, res, next) {
//   if ((req.session && req.session.authenticated)||req.path==='/login') {
//       next();
//   } else {
//       res.render('login.ejs', { title: 'iFacturacion - Usuarios' });
//   }
// }
app.use('/cuentas_api',cuentas_api);
app.use('/modulos_api', modulos_api);
app.use('/perfiles_api', perfiles_api)

app.use('/sucursales_api',sucursales_api);
app.use('/ubigeos_api',ubigeos_api);
app.use('/puntos_ventas_api',puntos_ventas_api);
app.use('/documentos_api',documentos_api);
app.use('/almacenes_api',almacenes_api);
app.use('/personas_api',personas_api);
app.use('/eproductos_categoria',eproductos_categoria);
app.use('/eproductos_producto',eproductos_producto);
//Listen Server
var server = app.listen(5000, function (err) {
  if (err) return console.log('Hubo un error'), process.exit(1);
  console.log('Escuchando en el puerto 3000');
})


// var reportingApp = express();
// app.use('/reporting', reportingApp);
// var jsreport = require('jsreport')({
//   express: { app :reportingApp, server: server },
//   appPath: "/reporting"
// });
// jsreport.init().catch(function (e) {
//   console.error(e);
// });