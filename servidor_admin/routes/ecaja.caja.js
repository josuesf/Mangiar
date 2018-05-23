var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const caja = require('../models/ecaja.caja')
// define the home page route
router.post('/get_cajas', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.caja_busqueda]
	//call Model.login function
	caja.getCajas(params, function (err, cajas , num_filas) {
		if (err) return res.json({err})
		return res.json({cajas,num_filas})
	})
});
router.post('/save_caja', function (req, res) {
    input = req.body
    //set params
	const params = [
        input.cod_caja,
        input.cod_sucursal,
        input.nombre_caja,
        md5(input.clave),
        input.observacion,
        input.nombre_ip,
		input.estado,
        req.app.locals.usuario
    ] 
	caja.save(params, function (err, cajas) {
        if (err) return res.json({err})
		return res.json({cajas})
	})
});
router.post('/delete_caja', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_caja]
	//call Model.login function
	caja.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;