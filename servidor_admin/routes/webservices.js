var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const producto = require('../models/eproductos.producto')
// define the home page route
router.post('/login', function (req, res) {
    const input = req.body
	//call Model account
	const cuenta = require('../models/cuenta')
	//set params
	const params = { usuario: input.usuario, contrasena: input.contrasena }
	//call Model.login function
	cuenta.login(params, function (err, cuenta) {
		if (err) return res.json({err})
		return res.json({cuenta})
	})
});
router.post('/get_puntos_venta', function (req, res) {
    const input = req.body
	//call Model account
	const punto_venta = require('../models/punto_venta')
	//set params
	const params = [input.usuario]
	//call Model.login function
	punto_venta.getActivos(params, function (err, puntos_venta) {
		if (err) return res.json({err})
		return res.json({puntos_venta})
	})
});

router.post('/get_cuentas_by_punto_venta', function (req, res) {
    const input = req.body
	//call Model account
	const punto_venta = require('../models/punto_venta')
	//set params
	const params = [input.cod_punto_venta,"EN ATENCION"]
	//call Model.login function
	punto_venta.getCuentas(params, function (err, punto_venta) {
		if (err) return res.json({err})
		return res.json({punto_venta})
	})
});

router.post('/get_pedido_detalle', function (req, res) {
    const input = req.body
	//call Model account
	const punto_venta = require('../models/punto_venta')
	//set params
	const params = [input.pedido_id,input.cod_punto_venta]
	//call Model.login function
	punto_venta.getPedidoDetalle(params, function (err, punto_venta) {
		if (err) return res.json({err})
		return res.json({punto_venta})
	})
});

//get_categorias_todas
router.post('/get_categorias_todas', function (req, res) {
    const input = req.body
	//call Model account
	const categoria = require('../models/eproductos.categoria')
	//call Model.login function
	categoria.getActivos([], function (err, categorias) {
		if (err) return res.json({err})
		return res.json({categorias})
	})
});
router.post('/get_productos_todos', function (req, res) {
    const input = req.body
	//call Model account
	const producto = require('../models/eproductos.producto')
	//call Model.login function
	producto.get_productos_todos([], function (err, productos) {
		if (err) return res.json({err})
		return res.json({productos})
	})
});
//get_productos_by_mesa
router.post('/get_productos_by_mesa', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.cod_mesa]
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.getPedidobyPunto(params, function (err, productos_selec) {
		if (err) return res.json({err})
		return res.json({productos_selec})
	})
});
router.post('/get_combinaciones_producto', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.producto_id]
	const producto = require('../models/eproductos.producto')
	//call Model.login function
	producto.get_combinaciones_producto_detalle(params, function (err, combinaciones) {
		if (err) return res.json({err})
		return res.json({combinaciones})
	})
});
router.post('/get_precios_producto', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.producto_id]
	const producto = require('../models/eproductos.producto')
	//call Model.login function
	producto.get_precios(params, function (err, precios) {
		if (err) return res.json({err})
		return res.json({precios})
	})
});

router.post('/get_tipo_comprobantes', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.cod_sucursal]
	const documento = require('../models/documento')
	//call Model.login function
	documento.get_tipos_documentos(params, function (err, documentos) {
		if (err) return res.json({err})
		return res.json({documentos})
	})
});

router.post('/get_series_by_documento', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.cod_documento]
	const documento = require('../models/documento')
	//call Model.login function
	documento.get_series_by_documento(params, function (err, series) {
		if (err) return res.json({err})
		return res.json({series})
	})
});


router.post('/confirmar_ecaja_pedido', function (req, res) {
    const input = req.body
	//call Model account
	const params = [
		input.numero==''?-1:input.numero,
		input.nombre_cliente,
		input.cod_moneda,
		input.total,
		input.estado_pedido,
		input.cod_mesa,
		input.usuario_registro
	]
	console.log(params)
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.confirmar_pedido(params,input.productos,input.usuario_registro, function (err, pedido) {
		if (err) return res.json({err})
		return res.json({numero:pedido[0].numero,pedido_id:pedido[0].pedido_id})
	})
});

router.post('/save_pdf', function (req, res) {
	var fs = require('fs');
	const input = req.body
	var b64string = input.data
	var buf = Buffer.from(b64string, 'base64');
	fs.writeFile("assets/media/recibo.pdf", buf , function(err) {
		if(err) {
			return res.json({respuesta:err});
		}else{
			return res.json({respuesta:'ok'})
			console.log("File saved successfully!");
		}
	});
	/*const data = input.data

	var fs = require('fs');
	fs.writeFile("assets/media/recibo.pdf", data , function(err) {
		if(err) {
			return res.json({respuesta:err});
		}else{
			return res.json({respuesta:'ok'})
			console.log("File saved successfully!");
		}
	});*/
	 
});

router.post('/save_ecaja_comprobante', function (req, res) {
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
	console.log(params)
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.save_comprobante(params, function (err, pedido) {
		if (err) return res.json({err})
		return res.json({resultado:pedido})
	})
});
module.exports = router;