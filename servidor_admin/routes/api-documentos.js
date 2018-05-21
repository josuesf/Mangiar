var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const documento = require('../models/documento')
// define the home page route
router.post('/get_documentos', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.documento_busqueda]
	documento.getDocumentos(params, function (err, documentos,num_filas) {
		if (err) return res.json({err})
		return res.json({documentos,num_filas})
	})
});

router.post('/get_series', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.serie_busqueda,input.cod_documento_cod]
	documento.getSeries(params, function (err, series,num_filas) {
		if (err) return res.json({err})
		return res.json({series,num_filas})
	})
});

router.post('/save_documento', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.cod_documento,
        input.descripcion_doc, 
        input.tipo_doc,
        input.formato_doc,
        input.estado, 
        req.app.locals.usuario
	]
	//call Model.login function
	documento.save(params, function (err, documentos) {
		if (err) return res.json({err})
		return res.json({documentos})
	})
});

router.post('/save_serie', function (req, res) {
    input = req.body
	//set params
	//'D0001',1,1,'IIIII','0','ACTIVO','ADMIN' 
	const params = [
		input.cod_documento,
        input.nro_serie, 
        input.nro_inicio,
		input.cod_sucursal,
		input.esta_afecto,
        input.estado, 
        req.app.locals.usuario
	]
	//call Model.login function
	documento.save(params, function (err, documentos) {
		if (err) return res.json({err})
		return res.json({documentos})
	})
});

router.post('/delete_documento', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_documento]
	//call Model.login function
	documento.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});

router.post('/delete_serie', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_documento,input.nro_serie,input.nro_inicio,input.cod_sucursal]
	//call Model.login function
	documento.deleteSerie(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;