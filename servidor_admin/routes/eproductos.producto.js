var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const producto = require('../models/eproductos.producto')

router.post('/get_all_productos', function (req, res) {
	input = req.body
	//set params
	const params = []
	//call Model.login function
	producto.getAll(params, function (err, productos) {
		if (err) return res.json({ err })
		return res.json({ productos })
	})
});
// define the home page route
router.post('/get_productos', function (req, res) {
	input = req.body
	//set params
	const params = [input.tamano_pagina, input.numero_pagina, input.producto_busqueda]
	//call Model.login function
	producto.get(params, function (err, productos, num_filas) {
		if (err) return res.json({ err })
		return res.json({ productos, num_filas })
	})
});
router.post('/save_producto', function (req, res) {
	input = req.body
	//set params
	const params = [
		input.producto_id,
		input.cod_producto,
		input.cod_categoria,
		input.cod_marca,
		input.almacen_cod,
		input.nombre,
		input.alias,
		input.descripcion,
		input.imagen_url != "" ? input.cod_producto + Date.now() + '.png' : 'meal.png',
		input.estado,
		req.app.locals.usuario
	]
	const images = {
		nueva: input.imagen_url,
		anterior: input.imagen_anterior
	}
	//call Model.login function
	producto.save(params, images, input.precios, function (err, productos) {
		if (err) return res.json({ err })
		return res.json({ productos })
	})
});
router.post('/delete_producto', function (req, res) {
	input = req.body
	//set params
	const params = [input.producto_id]
	//call Model.login function
	producto.delete(params, function (err, respuesta) {
		if (err) return res.json({ err })
		return res.json({ respuesta })
	})
});
router.post('/find', function (req, res) {
	input = req.body
	//set params
	const params = [input.producto_id]
	//call Model.login function
	producto.get_categorias(function (err, categorias) {
		if (err) return res.json({ err })
		producto.get_almacenes(function (err, almacenes) {
			if (err) return res.json({ err })
			producto.get_precios(params, function (err, precios) {
				return res.json({ categorias,almacenes, precios })
			})
		})
	})
});
router.post('/get_combinaciones', function (req, res) {
	input = req.body
	//set params
	const params = [input.producto_id]
	//call Model.login function
	producto.get_combinaciones(params, function (err, combinaciones) {
		if (err) return res.json({ err })
		producto.get_combinaciones_producto(params, function (err, combinaciones_producto) {
			if (err) return res.json({ err })
			return res.json({ combinaciones, combinaciones_producto })
		})
	})
});
router.post('/get_combinacion_detalle', function (req, res) {
	input = req.body
	//set params
	const params = [input.combinacion_id]
	//call Model.login function
	producto.get_combinacion_detalle(params, function (err, com_detalle) {
		if (err) return res.json({ err })
		return res.json({ com_detalle })
	})
});
router.post('/save_combinaciones_producto', function (req, res) {
	input = req.body
	//set params
	var params = input
	params.usuario = req.app.locals.usuario
	//call Model.login function
	producto.save_combinaciones_producto(params, function (err, respuesta) {
		if (err) return res.json({ err })
		return res.json({ respuesta })
	})
});

module.exports = router;