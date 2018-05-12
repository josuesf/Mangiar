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
	cuenta.getCuentas(params, function (err, cuentas) {
		if (err) return res.json({err})
		return res.json({cuentas})
	})
});

module.exports = router;