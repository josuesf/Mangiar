var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const producto = require('../models/eproductos.producto')
// define the home page route
router.post('/get_productos', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.producto_busqueda]
	//call Model.login function
	producto.get(params, function (err, productos , num_filas) {
		if (err) return res.json({err})
		return res.json({productos,num_filas})
	})
});
router.post('/save_producto', function (req, res) {
    input = req.body
    //set params
	const params = [
        input.producto_id,
        input.cod_producto,
        input.cod_categoria,
        input.cod_marca,
        input.nombre,
        input.alias,
        input.imagen_url!=""?input.cod_producto+ Date.now()+'.png':'',
		input.estado,
        req.app.locals.usuario
    ]
    const images = {
        nueva:input.imagen_url,
        anterior:input.imagen_anterior
    }
	//call Model.login function
	producto.save(params,images, function (err, productos) {
        if (err) return res.json({err})
		return res.json({productos})
	})
});
router.post('/delete_producto', function (req, res) {
    input = req.body
	//set params
	const params = [input.producto_id]
	//call Model.login function
	producto.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;