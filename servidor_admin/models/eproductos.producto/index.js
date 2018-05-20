
const db = require('../../../connectionbd')
const fs = require('fs')
module.exports = {
    get: (params, callback) => {
        db.query('SELECT * FROM eproductos.fn_GetProductos($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            db.query('SELECT eproductos.fn_getRowsProducto($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name + ":" + err.code + " " + err.routine, undefined)
                }
                callback(err, r.rows, filas.rows[0].filas)
            })
        })
    },
    save: (params, images, precios, callback) => {
        db.query("SELECT * FROM eproductos.fn_SaveProducto($1,$2,$3,$4,$5,$6,$7,$8,$9)", params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            if (images.anterior != '') {
                // fs.unlinkSync(__dirname + '/../../../public/images/'+images.anterior);
                if (images.nueva != '')
                    fs.unlink(__dirname + '/../../../public/images/' + images.anterior, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
            }
            if (images.nueva != '')
                fs.createReadStream(images.nueva).pipe(fs.createWriteStream(__dirname + '/../../../public/images/' + r.rows[0].imagen_url));
            //Una vez guardado el producto
            //Agregar o editar precios
            if (r.rows.length > 0) {
                const pi = r.rows[0].producto_id
                db.query("DELETE FROM eproductos.precios_producto where producto_id=$1", [pi], (err, r) => {
                    if (err) {
                        console.log(err)
                    }
                    for (var i = 0; i < precios.length; i++) {
                        var pprecios = [
                            pi,
                            precios[i].cod_unidad,
                            precios[i].cod_precio,
                            precios[i].nombre_precio,
                            precios[i].cod_moneda,
                            precios[i].valor_precio,
                            params[8]
                        ]
                        db.query("SELECT eproductos.fn_SavePrecioProducto($1,$2,$3,$4,$5,$6,$7) ", pprecios, (err, r) => {
                            if (err) {
                                console.log(err)
                            }
                            return;
                        })
                    }
                    return;
                })
                
            }
            callback(err, r.rows)
        })
    },
    delete: (params, callback) => {
        db.query("SELECT eproductos.fn_DeleteProducto($1) respuesta", params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    get_categorias: (callback) => {
        db.query("SELECT cod_categoria,nombre_categoria from eproductos.categoria where estado=$1", ["ACTIVO"], (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    get_precios: (params, callback) => {
        db.query("SELECT cod_unidad,cod_precio,nombre_precio,cod_moneda,valor_precio from eproductos.precios_producto where producto_id=$1 order by creado_en", params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    

    //...More functions
}