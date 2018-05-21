var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const sucursal = require('../models/sucursal')
// define the home page route
router.post('/get_sucursales', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.sucursal_busqueda]
	sucursal.getSucursales(params, function (err, sucursales, num_filas) {
		if (err) return res.json({err})
		return res.json({sucursales,num_filas})
	})
});

router.post('/save_sucursal', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.cod_sucursal,
        input.nombre, 
        input.direccion,
        input.telefono,
        input.correo, 
        input.fax,
        input.tipo_sistema,
        input.latitud,
        input.longitud,
        input.departamento,
        input.provincia,
		input.distrito,
		input.estado,
        'ADMIN'
	]
	//call Model.login function
	sucursal.save(params, function (err, sucursales) {
		if (err) return res.json({err})
		return res.json({sucursales})
	})
});

router.post('/delete_sucursal', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_sucursal]
	//call Model.login function
	sucursal.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;