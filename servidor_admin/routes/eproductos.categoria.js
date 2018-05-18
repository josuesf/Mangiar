var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const categoria = require('../models/eproductos.categoria')
// define the home page route
router.post('/get_categorias', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.categoria_busqueda]
	//call Model.login function
	categoria.get(params, function (err, categorias , num_filas) {
		if (err) return res.json({err})
		return res.json({categorias,num_filas})
	})
});
router.post('/save_categoria', function (req, res) {
    input = req.body
    //set params
	const params = [
        input.cod_categoria,
        input.nombre_categoria,
        input.imagen_url!=""?input.cod_categoria+ Date.now()+'.png':'',
		input.estado,
        req.app.locals.usuario
    ]
    const images = {
        nueva:input.imagen_url,
        anterior:input.imagen_anterior
    }
	//call Model.login function
	categoria.save(params,images, function (err, categorias) {
        if (err) return res.json({err})
		return res.json({categorias})
	})
});
router.post('/delete_categoria', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_categoria]
	//call Model.login function
	categoria.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;