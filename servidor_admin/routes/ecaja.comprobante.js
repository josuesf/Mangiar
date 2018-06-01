var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const comprobante = require('../models/ecaja.comprobante')
// define the home page route
router.post('/get_comprobantes', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.comprobante_busqueda,input.numero_serie_busqueda]
	//call Model.login function
	comprobante.getComprobantes(params, function (err, comprobantes , num_filas) {
		if (err) return res.json({err})
		return res.json({comprobantes,num_filas})
	})
});

router.post('/get_details_comprobante', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina]
	//call Model.login function
	comprobante.getDetailsComprobante(params, function (err, comprobante) {
		if (err) return res.json({err})
		return res.json({comprobante})
	})
});

router.post('/save_caja', function (req, res) {
    const input = req.body
	//call Model account
	const params = [
		input.cod_documento,
		input.nro_serie,
		input.numero,
		input.cod_sucursal,
		input.pedido_id,
		input.cod_persona,
		input.nombre_cliente,
		input.direccion_cliente,
		input.concepto,
		input.total,
		input.impuesto,
		input.estado,
		input.obs,
		input.fecha,
		req.app.locals.usuario
	]
	 
	comprobante.save(params, function (err, comprobantes) {
        if (err) return res.json({err})
		return res.json({comprobantes})
	})
}); 

module.exports = router;