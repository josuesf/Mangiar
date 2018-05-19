var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const modulo = require('../models/modulo')
// define the home page route
router.post('/get_modulos', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.modulo_busqueda]
	//call Model.login function
	modulo.getModulos(params, function (err, modulos, num_filas) {
		if (err) return res.json({err})
		return res.json({modulos, num_filas})
	})
});
router.post('/save_modulo', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.cod_modulo,
		input.nombre,
		input.descripcion,
		input.nivel,
		input.ruta_modulo,
		input.tipo_modulo,
		input.imagen_url,
		input.estado,
		req.app.locals.usuario
	]
	//call Model.login function
	modulo.save(params, function (err, modulos) {
		if (err) return res.json({err})
		return res.json({modulos})
	})
});
router.post('/delete_modulo', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_modulo]
	//call Model.login function
	modulo.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;