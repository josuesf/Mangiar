var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const producto = require('../models/eproductos.producto')
// define the home page route
router.post('/login', function (req, res) {
    const input = req.body
	//call Model account
	const cuenta = require('../models/cuenta')
	//set params
	const params = { usuario: input.usuario, contrasena: input.contrasena }
	//call Model.login function
	cuenta.login(params, function (err, cuenta) {
		if (err) return res.json({err})
		return res.json({cuenta})
	})
});
router.post('/get_puntos_venta', function (req, res) {
    const input = req.body
	//call Model account
	const punto_venta = require('../models/punto_venta')
	//set params
	const params = [input.usuario]
	//call Model.login function
	punto_venta.getActivos(params, function (err, puntos_venta) {
		if (err) return res.json({err})
		return res.json({puntos_venta})
	})
});
//get_categorias_todas
router.post('/get_categorias_todas', function (req, res) {
    const input = req.body
	//call Model account
	const categoria = require('../models/eproductos.categoria')
	//call Model.login function
	categoria.getActivos([], function (err, categorias) {
		if (err) return res.json({err})
		return res.json({categorias})
	})
});
router.post('/get_productos_todos', function (req, res) {
    const input = req.body
	//call Model account
	const producto = require('../models/eproductos.producto')
	//call Model.login function
	producto.get_productos_todos([], function (err, productos) {
		if (err) return res.json({err})
		return res.json({productos})
	})
});

module.exports = router;