var express = require('express');
var router = express.Router();
var md5 = require('md5')
var printer = require("node-thermal-printer");
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
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.confirmar_pedido(params,input.productos,input.usuario_registro, function (err, pedido) {
		if (err) return res.json({err})
		req.io.sockets.emit('NUEVA_COMANDA', { cod_mesa: input.cod_mesa,usuario_registro:input.usuario_registro })
		
		const param = {
			cod_mesa:input.cod_mesa,
			usuario_registro:input.usuario_registro,
			productos:input.productos,
			razon_social:req.app.locals.datos_empresa.razon_social
		}
		//req.app.locals.impresoras_rutas
		ImpresionComanda(param,pedido[0].numero,0,req.app.locals.impresoras_rutas)
		return res.json({numero:pedido[0].numero,pedido_id:pedido[0].pedido_id})
	})
});
router.post('/save_pdf', function (req, res) {
	var fs = require('fs');
	const input = req.body
	var b64string = input.data
	var buf = Buffer.from(b64string, 'base64');
	fs.writeFile(__dirname + '/../../assets/media/'+input.nombre_pdf+'.pdf', buf , function(err) {
		if(err) {
			return res.json({respuesta:err});
		}else{
			return res.json({respuesta:'ok'})
			console.log("File saved successfully!");
		}
	});
	 
});


router.post('/get_numero_siguiente', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.cod_documento,input.nro_serie,input.cod_sucursal]
	const comprobante = require('../models/ecaja.comprobante')
	//call Model.login function
	comprobante.getNumeroSiguiente(params, function (err, numero) {
		if (err) return res.json({err})
		return res.json({numero})
	})
});


router.post('/finish_pedido', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.pedido_id,req.app.locals.usuario]

	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.finalizar_pedido(params, function (err, mensaje) {
		if (err) return res.json({err})
		return res.json({mensaje})
	})
});

router.post('/eliminar_pedido_detalle', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.pedido_id,input.id_detalle,req.app.locals.usuario]

	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.eliminar_pedido_detalle(params, function (err, mensaje) {
		if (err) return res.json({err})
		return res.json({mensaje})
	})
});

router.post('/actualizar_cantidad_pedido_detalle', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.pedido_id,input.id_detalle,input.cantidad,req.app.locals.usuario]

	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.actualizar_cantidad_pedido_detalle(params, function (err, mensaje) {
		if (err) return res.json({err})
		return res.json({mensaje})
	})
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
	const comprobante = require('../models/ecaja.comprobante')
	//call Model.login function
	comprobante.save(params, function (err, pedido) {
		if (err) return res.json({err})
		return res.json({resultado:pedido})
	})
});

router.post('/impresion_nota_venta', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.numero]
	const pedido = require('../models/ecaja.pedido')
	//call Model.login function
	pedido.getPedidobyNumero(params, function (err, pedido_encontrado) {
		if (err) return res.json({err})
		pedido.getPedidoDetallebyId([pedido_encontrado.pedido_id],function(err,detalle_pedido){
			if (err) return res.json({err})
			const param = {
				productos:detalle_pedido,
				total:pedido_encontrado.total,
				cod_mesa:detalle_pedido[0].cod_mesa,
				usuario_registro:pedido_encontrado.usuario_creacion
			}
			const datos_empresa = req.app.locals.datos_empresa
			ImpresionNotaVenta(param,pedido_encontrado.numero,datos_empresa,req.app.locals.impresora_principal)
			return;
		})
		return res.json({respuesta:'OK'})
	})
});
function ImpresionComanda(param, numero, posicion_impresora,IMPRESORAS_RUTAS) {
	if (IMPRESORAS_RUTAS.length > 0) {
		const productos = (param.productos.filter(p => p.almacen_cod == IMPRESORAS_RUTAS[posicion_impresora].nombre_variable)).filter(p => parseInt(p.producto_id) != 0)
		// var productos_detalles = (param.productos.filter(p => p.almacen_cod == IMPRESORAS_RUTAS[posicion_impresora].nombre_variable)).filter(p => parseInt(p.producto_id) == 0)
		var productos_detalles = (param.productos.filter(p => parseInt(p.producto_id) == 0))

		if (productos.length > 0) {
			//Impresion de Comanda
			
			printer.init({
				type: 'epson',
				interface: IMPRESORAS_RUTAS[posicion_impresora].valor_variable,//'tcp://192.168.1.188',
				removeSpecialCharacters: true,
			});
			//printer.setTypeFontB(); 
			printer.alignCenter()
			printer.bold(true);
			printer.setTextDoubleHeight();
			printer.println(param.razon_social)
			printer.bold(false);
			printer.setTextNormal();
			printer.drawLine();
			printer.println(param.cod_mesa + " - " + numero + " - " + param.usuario_registro)
			d = new Date()
			day = d.getDate(); month = d.getMonth() + 1; year = d.getFullYear()
			h = d.getHours(); m = d.getMinutes(); s = d.getSeconds()
			fecha_hora_actual = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)

			printer.println(fecha_hora_actual)
			printer.newLine();
			printer.tableCustom([
				{ text: "Cant.", align: "LEFT", width: 0.15, bold: true },
				{ text: "Producto", align: "LEFT", width: 0.75, bold: true }
			]);

			printer.drawLine();
			printer.bold(false);
			for (i = 0; i < productos.length; i++) {
				var found = productos_detalles.find(p => parseInt(p.id_referencia) == parseInt(productos[i].id_detalle));
				if (found) {
					printer.tableCustom([
						{ text: "(" + productos[i].cantidad + ")", align: "LEFT", width: 0.15 },
						{ text: productos[i].nombre.substring(0, 30), align: "LEFT", width: 0.75 }
					]);
					productos_detalles = productos_detalles.filter(p => {
						if (parseInt(p.id_referencia) == parseInt(productos[i].id_detalle)) {
							printer.tableCustom([
								{ text: "", align: "LEFT", width: 0.15 },
								{ text: p.cantidad + " " + p.nombre.substring(0, 30), align: "LEFT", width: 0.75 }
							]);
							return null
						} else {
							return p
						}
					})
				} else {
					printer.tableCustom([
						{ text: "(" + productos[i].cantidad + ")", align: "LEFT", width: 0.15 },
						{ text: productos[i].nombre.substring(0, 30), align: "LEFT", width: 0.75 }
					]);
				}

			}
			printer.cut();
			printer.execute(function (err) {
				if (err) {
					console.error("Print failed", err);
				} else {
					if (IMPRESORAS_RUTAS.length > posicion_impresora + 1) {
						ImpresionComanda(param, numero, posicion_impresora + 1,IMPRESORAS_RUTAS)
					}
					console.log("Print done");
				}
			});
		} else {
			if (IMPRESORAS_RUTAS.length > posicion_impresora + 1) {
				ImpresionComanda(param, numero, posicion_impresora + 1,IMPRESORAS_RUTAS)
			}
		}
	}
}
function ImpresionNotaVenta(param, numero,datos_empresa,impresora_principal) {
	const productos = param.productos.filter(p => (parseInt(p.id_referencia) == 0 || !p.id_referencia))
	var producto_detalles = param.productos.filter(p => parseInt(p.id_referencia) != 0)
	//Impresion de Comanda
	printer.init({
		type: 'epson',
		interface: impresora_principal,//'tcp://192.168.1.189',
		removeSpecialCharacters: true,
	});
	//printer.setTypeFontB(); 
	printer.alignCenter()
	printer.printImage(__dirname+'/../../public/'+datos_empresa.imagen_url, function (done) {
		printer.setTextNormal();
		printer.drawLine();
		printer.println(datos_empresa.razon_social)
		printer.println(datos_empresa.ruc)
		printer.println(datos_empresa.direccion)
		printer.drawLine();
		printer.println("NOTA VENTA " + numero)

		d = new Date()
		day = d.getDate(); month = d.getMonth() + 1; year = d.getFullYear()
		h = d.getHours(); m = d.getMinutes(); s = d.getSeconds()
		fecha_hora_actual = (day < 10 ? "0" + day : day) + "-" + (month < 10 ? "0" + month : month) + "-" + year + " " + (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + ":" + (s < 10 ? "0" + s : s)

		printer.println(fecha_hora_actual)
		printer.newLine();
		//Impresion de Nota de Venta
		printer.tableCustom([
			{ text: "Cant.", align: "LEFT", width: 0.12, bold: true },
			{ text: "Descripcion", align: "LEFT", width: 0.60, bold: true },
			{ text: "P.U", align: "LEFT", width: 0.12, bold: true },
			{ text: "SubT", align: "RIGHT", width: 0.13, bold: true }
		]);

		printer.drawLine();
		printer.bold(false);
		for (i = 0; i < productos.length; i++) {
			//Impresion de Nota de Venta
			var found = producto_detalles.filter(p => parseInt(p.id_referencia) == parseInt(productos[i].id_detalle));
			if (found) {
				total_sub_productos = found.reduce((a, b) => a + (parseFloat(b.precio_valor) * b.cantidad), 0)
				printer.tableCustom([
					{ text: "(" + productos[i].cantidad + ")", align: "LEFT", width: 0.12 },
					{ text: productos[i].nombre.substring(0, 25), align: "LEFT", width: 0.60 },
					{
						text: (parseFloat(productos[i].precio_valor) - total_sub_productos).toFixed(2),
						align: "LEFT", width: 0.12
					},
					{ text: (parseFloat(productos[i].precio_valor - total_sub_productos) * parseFloat(productos[i].cantidad)).toFixed(2), align: "RIGHT", width: 0.13 }
				]);
				producto_detalles = producto_detalles.filter(p => {
					if (parseInt(p.id_referencia) == parseInt(productos[i].id_detalle)) {
						printer.tableCustom([
							{ text: "", align: "LEFT", width: 0.12 },
							{ text: p.cantidad + " " + p.nombre.substring(0, 25), align: "LEFT", width: 0.60 },
							{
								text: (parseFloat(p.precio_valor)).toFixed(2),
								align: "LEFT", width: 0.12
							},
							{ text: (parseFloat(p.precio_valor) * parseFloat(p.cantidad)).toFixed(2), align: "RIGHT", width: 0.13 }
						]);
						return null
					} else {
						return p
					}
				})
			} else {
				printer.tableCustom([
					{ text: "(" + productos[i].cantidad + ")", align: "LEFT", width: 0.12 },
					{ text: productos[i].nombre.substring(0, 25), align: "LEFT", width: 0.60 },
					{
						text: (parseFloat(productos[i].precio_valor)).toFixed(2),
						align: "LEFT", width: 0.12
					},
					{ text: (parseFloat(productos[i].precio_valor) * parseFloat(productos[i].cantidad)).toFixed(2), align: "RIGHT", width: 0.13 }
				]);
			}

		}
		printer.drawLine();
		printer.alignRight();
		printer.println("Total: " + (parseFloat(param.total)).toFixed(2));
		printer.newLine();
		printer.drawLine();
		printer.println("Mesa:" + param.cod_mesa + " - Atencion:" + param.usuario_registro)
		printer.drawLine();
		printer.println(datos_empresa.agradecimiento)
		printer.println('Web: ' +datos_empresa.pagina_web)
		printer.println('Correo: '+datos_empresa.correo)
		printer.println('Telf: ' + datos_empresa.telefono)
		printer.cut();
		printer.execute(function (err) {
			if (err) {
				console.error("Print failed", err);
			} else {

				console.log("Print done");
			}
		});
	}); // Print PNG image (uses callback)

}


router.post('/get_reporte_by_anio_mes', function (req, res) {
    const input = req.body
	//call Model account
	const params = [input.anio,input.mes]
	const reporte = require('../models/reportes')
	//call Model.login function 
	reporte.getPedidosByAnioMes(params, function (err, datos) {
		if (err) return res.json({err})
		return res.json({datos})
	})
});


module.exports = router;