var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const ubigeo = require('../models/ubigeo')
// define the home page route
router.post('/get_ubigeos', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.ubigeo_busqueda]
	ubigeo.getUbigeos(params, function (err, ubigeos,num_filas) {
		if (err) return res.json({err})
		return res.json({ubigeos,num_filas})
	})
});

router.post('/save_ubigeo', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.cod_departamento,
        input.cod_provincia, 
        input.cod_distrito,
        input.departamento,
        input.provincia, 
        input.distrito
	]
	//call Model.login function
	ubigeo.save(params, function (err, ubigeos) {
		if (err) return res.json({err})
		return res.json({ubigeos})
	})
});


module.exports = router;