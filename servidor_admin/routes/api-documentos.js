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
	documento.getDocumentos(params, function (err, documentos) {
		if (err) return res.json({err})
		return res.json({documentos})
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
        'ADMIN'
	]
	//call Model.login function
	documento.save(params, function (err, documentos) {
		if (err) return res.json({err})
		return res.json({documentos})
	})
});


module.exports = router;