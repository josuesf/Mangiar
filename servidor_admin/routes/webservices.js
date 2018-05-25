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
//get_productos_by_mesa
router.post('/get_productos_by_mesa', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.cod_mesa]
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.getPedidobyPunto(params, function (err, productos_selec) {
		if (err) return res.json({err})
		return res.json({productos_selec})
	})
});
router.post('/confirmar_ecaja_pedido', function (req, res) {
    const input = req.body
	//call Model account
	const params = [
		input.numero==''?-1:input.numero,
		input.nombre_cliente,
		input.cod_moneda,
		input.total,
		input.estado_pedido,
		input.cod_mesa,
		input.usuario_registro
	]
	console.log(params)
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.confirmar_pedido(params,input.productos,input.usuario_registro, function (err, pedido) {
		if (err) return res.json({err})
		return res.json({numero:pedido[0].numero,pedido_id:pedido[0].pedido_id})
	})
});
module.exports = router;