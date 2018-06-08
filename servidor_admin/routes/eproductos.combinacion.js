var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const combinacion = require('../models/eproductos.combinacion')
const pro = require('../models/eproductos.producto')

router.post('/delete_combinacion_detalle', function (req, res) {
	input = req.body
	//set params
	var params = [parseInt(input.detalle_id)]
	//call Model.login function
	combinacion.delete_combinacion_detalle(params, function (err, respuesta) {
		if (err) return res.json({ err })
		return res.json({ respuesta })
	})
});
router.post('/delete_combinacion', function (req, res) {
	input = req.body
	//set params
	var params = [parseInt(input.combinacion_id)]
	//call Model.login function
	combinacion.delete_combinacion(params, function (err, respuesta) {
		if (err) return res.json({ err })
		return res.json({ respuesta })
	})
});
router.post('/save_combinacion', function (req, res){
    input = req.body

    input['usuario'] = req.app.locals.usuario

    combinacion.save_combinacion(input, function (err, respuesta) {
		if (err) return res.json({ err })
		return res.json({ respuesta })
	})
})
router.post('/get_combinacion_detalle', function (req, res){
    input = req.body
    var params = [input.combinacion_id]
    combinacion.get_combinacion_detalle(params, function (err, items){
        if(err) return res.json({err})
        return res.json({items})
    })
})
// router.post('/find', function (req, res) {
// 	input = req.body
// 	//set params
// 	const params = [input.producto_id]
// 	//call Model.login function
// 	producto.get_categorias(function (err, categorias) {
// 		if (err) return res.json({ err })
// 		producto.get_almacenes(function (err, almacenes) {
// 			if (err) return res.json({ err })
// 			producto.get_precios(params, function (err, precios) {
// 				return res.json({ categorias,almacenes, precios })
// 			})
// 		})
// 	})
// });
// router.post('/get_combinaciones', function (req, res) {
// 	input = req.body
// 	//set params
// 	const params = [input.producto_id]
// 	//call Model.login function
// 	producto.get_combinaciones(params, function (err, combinaciones) {
// 		if (err) return res.json({ err })
// 		producto.get_combinaciones_producto(params, function (err, combinaciones_producto) {
// 			if (err) return res.json({ err })
// 			return res.json({ combinaciones, combinaciones_producto })
// 		})
// 	})
// });
// router.post('/get_combinacion_detalle', function (req, res) {
// 	input = req.body
// 	//set params
// 	const params = [input.combinacion_id]
// 	//call Model.login function
// 	producto.get_combinacion_detalle(params, function (err, com_detalle) {
// 		if (err) return res.json({ err })
// 		return res.json({ com_detalle })
// 	})
// });
// router.post('/save_combinaciones_producto', function (req, res) {
// 	input = req.body
// 	//set params
// 	var params = input
// 	params.usuario = req.app.locals.usuario
// 	//call Model.login function
// 	producto.save_combinaciones_producto(params, function (err, respuesta) {
// 		if (err) return res.json({ err })
// 		return res.json({ respuesta })
// 	})
// });

module.exports = router;