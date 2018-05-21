var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const persona = require('../models/persona')
// define the home page route
router.post('/get_personas', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.persona_busqueda]
	persona.getPersonas(params, function (err, personas, num_filas) {
		if (err) return res.json({err})
		return res.json({personas,num_filas})
	})
});

router.post('/save_persona', function (req, res) {
    input = req.body
	//set params
	const params = [
		input.cod_persona,
        input.tipo_persona, 
        input.razon_social,
        input.nombres,
        input.a_paterno, 
        input.a_materno,
        input.tipo_doc_ident,
        input.doc_ident,
        input.fecha_nacimiento,
        input.sexo,
        input.direccion,
        input.tel_fijo,
        input.telf_movil,
        input.correo,
        input.estado,
        req.app.locals.usuario
	]
	//call Model.login function
	persona.save(params, function (err, personas) {
		if (err) return res.json({err})
		return res.json({personas})
	})
});

router.post('/delete_persona', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_persona]
	//call Model.login function
	persona.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;