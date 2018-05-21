var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const perfil = require('../models/perfil')
// define the home page route
router.post('/get_perfiles', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.perfil_busqueda]
	//call Model.login function
	perfil.getPerfiles(params, function (err, perfiles, num_filas) {
		if (err) return res.json({err})
		return res.json({perfiles, num_filas})
	})
});
router.post('/get_modulos', function (req, res) {
    input = req.body
	//set params
	const params = []
	//call Model.login function
	perfil.getModulos(params, function (err, modulos) {
		if (err) return res.json({err})
		return res.json({modulos})
	})
});
router.post('/get_modulos_perfil', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_perfil]
	//call Model.login function
	perfil.getModulosPerfil(params, function (err, modulos) {
		if (err) return res.json({err})
		return res.json({modulos})
	})
});
router.post('/save_modulos_perfil', function (req, res) {
    input = req.body
	//set params
	input['usuario_creacion'] = req.app.locals.usuario
	//call Model.login function
	perfil.save(input, function (err, resp) {
		if (err) return res.json({err})
		return res.json({resp})
	})
});
router.post('/delete_perfil', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_perfil]
	//call Model.login function
	perfil.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;