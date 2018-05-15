var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const cuenta = require('../models/cuenta')
// define the home page route
router.post('/get_cuentas', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.usuario_busqueda]
	//call Model.login function
	cuenta.getCuentas(params, function (err, cuentas , num_filas) {
		if (err) return res.json({err})
		return res.json({cuentas,num_filas})
	})
});
router.post('/save_cuenta', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.usuario_id,
		input.usuario,
		md5(input.contrasena+'_08'),
		input.email,
		input.telefono,
		input.foto_url,
		input.cod_perfil,
		input.cod_sucursal,
		input.estado,
		req.app.locals.usuario
	]
	//call Model.login function
	cuenta.save(params, function (err, cuentas) {
		if (err) return res.json({err})
		return res.json({cuentas})
	})
});
router.post('/delete_cuenta', function (req, res) {
    input = req.body
	//set params
	const params = [input.usuario_id]
	//call Model.login function
	cuenta.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;