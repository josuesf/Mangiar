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

app.get('/', function (req, res) {
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
		return res.json({cuenta})
	})
})
//Routes

// Routes Procesos
// var compra_venta_moneda_extranjera_api = require('./routes/api-compra-venta-moneda-extranjera')

// function authChecker(req, res, next) {
//   if ((req.session && req.session.authenticated)||req.path==='/login') {
//       next();
//   } else {
//       res.render('login.ejs', { title: 'iFacturacion - Usuarios' });
//   }
// }
// app.use('/usuarios_api',usuarios_api);


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