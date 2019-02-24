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
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../assets'));
app.use(bodyParser.json({ limit: '50mb' })); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies
app.disable('x-powered-by');
app.use(session({ secret: '_secret_', cookie: { maxAge: 60 * 60 * 1000 }, saveUninitialized: false, resave: false }));
// app.use(authChecker);
app.get('/', function (req, res, next) {
	res.render('index.ejs')
})
app.post('/login_', function (req, res) {
	//call Model account
	const cuenta = require('./models/cuenta')
	//set params
	const params = { usuario: req.body.usuario, contrasena: req.body.contrasena }
	//call Model.login function
	cuenta.login(params, function (err, cuenta) {
		if (err) return res.json({ err })
		app.locals.usuario = cuenta.usuario
		const perfil = require('./models/perfil')
		perfil.getModulosPerfil([cuenta.cod_perfil], function (err, modulos) {
			if (err) return res.json({ err })
			return res.json({ cuenta, modulos })
		})
	})
})
app.post('/get_variables_sistema', function (req, res) {
	const conf_sistema = require('./models/conf_sistema')
	conf_sistema.getVariales([req.body.obs_variable], function (err, variables) {
		if (err) return res.json({ err })
		return res.json({ variables })
	})
})
//CARGAR DATOS DE EMPRESA
const empresa = require('./models/empresa')
empresa.getEmpresa([], function (err, empresa) {
	if (empresa) {
		app.locals.datos_empresa = {
			razon_social: empresa.nombre_corto,
			ruc: empresa.ruc,
			direccion: empresa.direccion,
			imagen_url: empresa.url_imagen_impresion,
			correo: empresa.correo,
			telefono: empresa.telefono1,
			pagina_web: empresa.pagina_web,
			agradecimiento: 'GRACIAS POR SU PREFERENCIA'
		}
	}
	
})
const conf_sistema = require('./models/conf_sistema')
conf_sistema.getVariales(['IMPRESION_ALMACEN'], function (err, variables) {
	app.locals.impresoras_rutas = variables
})
conf_sistema.getVariales(['IMPRESORA_PRINCIPAL'], function (err, variables) {
	if (variables.length > 0)
		app.locals.impresora_principal = variables[0].valor_variable
})
//GUARDAR IMPRESORAS
//Routes
var empresa_api = require('./routes/api-empresa')
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
var eproductos_combinacion = require('./routes/eproductos.combinacion')
var ecaja_caja = require('./routes/ecaja.caja')
var ecaja_comprobante = require('./routes/ecaja.comprobante')
var webservices = require('./routes/webservices')
// function authChecker(req, res, next) {
//   if ((req.session && req.session.authenticated)||req.path==='/login') {
//       next();
//   } else {
//       res.render('login.ejs', { title: 'iFacturacion - Usuarios' });
//   }
// }

//Listen Server
var server = app.listen(5000, function (err) {
	if (err) return console.log('Hubo un error'), process.exit(1);
	console.log('Escuchando en el puerto 3000');
})
var io = require('socket.io')(server);
io.sockets.on('connection', function (socket) {
	console.log(socket.id)
	socket.on("FIN_CUENTA",function(){
		io.sockets.emit("FIN_CUENTA_MOB")
	})
});
app.use(function (req, res, next) {
	req.io = io;
	next();
})

app.use('/empresa_api', empresa_api);
app.use('/cuentas_api', cuentas_api);
app.use('/modulos_api', modulos_api);
app.use('/perfiles_api', perfiles_api)

app.use('/sucursales_api', sucursales_api);
app.use('/ubigeos_api', ubigeos_api);
app.use('/puntos_ventas_api', puntos_ventas_api);
app.use('/documentos_api', documentos_api);
app.use('/almacenes_api', almacenes_api);
app.use('/personas_api', personas_api);
app.use('/eproductos_categoria', eproductos_categoria);
app.use('/eproductos_producto', eproductos_producto);
app.use('/eproductos_combinacion', eproductos_combinacion);
app.use('/ecaja_caja', ecaja_caja);
app.use('/ecaja_comprobante', ecaja_comprobante);
app.use('/ws', webservices);

// var reportingApp = express();
// app.use('/reporting', reportingApp);
// var jsreport = require('jsreport')({
//   express: { app :reportingApp, server: server },
//   appPath: "/reporting"
// });
// jsreport.init().catch(function (e) {
//   console.error(e);
// });
