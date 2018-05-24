
const db = require('../../../connectionbd')
const fs = require('fs')
module.exports = {
    get: (params, callback) => {
        db.query('SELECT * FROM eproductos.fn_GetCategorias($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            db.query('SELECT eproductos.fn_getRowsCategoria($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name + ":" + err.code + " " + err.routine, undefined)
                }
                callback(err, r.rows, filas.rows[0].filas)
            })
        })
    },
    save: (params, images, callback) => {
        db.query("SELECT * FROM eproductos.fn_SaveCategoria($1,$2,$3,$4,$5)", params, (err, r) => {
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
            callback(err, r.rows)
        })
    },
    delete: (params, callback) => {
        db.query("SELECT eproductos.fn_DeleteCategoria($1) respuesta", params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    getActivos: (params, callback) => {
        db.query("select cod_categoria,nombre_categoria,imagen_url from eproductos.categoria where estado='ACTIVO'", params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}