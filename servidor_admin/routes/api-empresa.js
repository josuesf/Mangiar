var express = require('express');
var router = express.Router();
var md5 = require('md5')
//call Model account
const empresa = require('../models/empresa')
// define the home page route
router.post('/get_empresas', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.empresa_busqueda]
	empresa.getEmpresas(params, function (err, empresas,num_filas) {
		if (err) return res.json({err})
		return res.json({empresas,num_filas})
	})
});
 
router.post('/save_empresa', function (req, res) {
    
    input = req.body
	//set params
	const params = [
		input.cod_empresa,
		input.nombre_corto,
		input.ruc, 
        input.razon_social,
        input.descripcion,
        input.direccion, 
        input.telefono1, 
        input.telefono2, 
        input.correo, 
        input.pagina_web, 
        input.url_imagen != "" ? input.cod_empresa + Date.now() + '.png' : 'logo.png', 
        input.url_imagen_impresion != "" ? input.cod_empresa + Date.now() + '.png' : 'logoImpresion.png',
        input.estado,  
        req.app.locals.usuario
    ]
    
    const images = {
		nuevoLogo: input.url_imagen,
        anteriorLogo: input.imagen_anterior,
        nuevoLogoImpresion : input.url_imagen_impresion,
        anteriorLogoImpresion : input.imagen_anterior_impresion,
	}

	//call Model.login function
	empresa.save(params, images, function (err, empresas) {
		if (err) return res.json({ err })
		return res.json({ empresas })
	})
});
 
router.post('/delete_empresa', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_empresa]
	//call Model.login function
	empresa.delete(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});

router.post('/get_sucursales', function (req, res) {
    input = req.body
	//set params
	const params = [input.tamano_pagina,input.numero_pagina,input.cod_empresa,input.sucursal_busqueda]
	empresa.getSucursales(params, function (err, sucursales,num_filas) {
		if (err) return res.json({err})
		return res.json({sucursales,num_filas})
	})
});


router.post('/save_sucursal_empresa', function (req, res) {
    input = req.body
	//set params
	const params = [input.cod_empresa,input.cod_sucursal,input.estado,req.app.locals.usuario]
	empresa.saveSucursal(params, function (err, respuesta) {
		if (err) return res.json({err})
		return res.json({respuesta})
	})
});


module.exports = router;