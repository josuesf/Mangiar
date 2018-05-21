var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const almacen = require('../models/almacen')
// define the home page route
router.post('/get_almacenes', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.almacen_busqueda]
	almacen.getAlmacenes(params, function (err, almacenes,num_filas) {
		if (err) return res.json({err})
		return res.json({almacenes,num_filas})
	})
});

router.post('/save_almacen', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.almacen_id,
        input.almacen_cod, 
        input.descripcion,
        input.tipo,
        input.estado, 
        req.app.locals.usuario
	]
	//call Model.login function
	almacen.save(params, function (err, almacenes) {
		if (err) return res.json({err})
		return res.json({almacenes})
	})
});

router.post('/delete_almacen', function (req, res) {
    input = req.body
	//set params
	const params = [input.almacen_id]
	//call Model.login function
	almacen.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;