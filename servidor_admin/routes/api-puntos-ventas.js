var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const punto_venta = require('../models/punto_venta')
// define the home page route
router.post('/get_puntos_ventas', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.punto_venta_busqueda]
	punto_venta.getPuntosVentas(params, function (err, puntos_ventas) {
		if (err) return res.json({err})
		return res.json({puntos_ventas})
	})
});

router.post('/save_punto_venta', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.cod_punto_venta,
        input.nombre_punto, 
        input.cod_sucursal,
        input.estado_accion,
        input.usuario_accion, 
        input.estado,
        'ADMIN'
	]
	//call Model.login function
	punto_venta.save(params, function (err, puntos_ventas) {
		if (err) return res.json({err})
		return res.json({puntos_ventas})
	})
});


module.exports = router;