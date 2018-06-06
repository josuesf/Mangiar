const db = require('../../../connectionbd')
const fs = require('fs')
module.exports = {
    getEmpresas: (params, callback) => {
        db.query('SELECT * FROM fn_GetEmpresas($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT fn_getRowsEmpresa($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    getSucursales: (params, callback) => {
        db.query('SELECT * FROM fn_GetSucursales($1,$2,$3,$4)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT fn_getRowsSucursalesByEmpresa($1,$2) AS Filas', [params[2],params[3]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    save :(params, images,callback)=>{
        db.query("SELECT * FROM fn_SaveEmpresa($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }

            if (images.anteriorLogo != '' && images.anteriorLogo!='logo.png') {
                if (images.nuevoLogo != '' )
                    fs.unlink(__dirname + '/../../../public/images/' + images.anteriorLogo, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
            }
            if (images.nuevoLogo != '')
                fs.createReadStream(images.nuevoLogo).pipe(fs.createWriteStream(__dirname + '/../../../public/images/' + r.rows[0].url_imagen));


            if (images.anteriorLogoImpresion != '' && images.anteriorLogoImpresion!='logoImpresion.png') {
                if (images.nuevoLogoImpresion != '' )
                    fs.unlink(__dirname + '/../../../public/images/' + images.anteriorLogoImpresion, function (err) {
                        if (err) return console.log(err);
                        console.log('file deleted successfully');
                    });
            }
            if (images.nuevoLogoImpresion != '')
                fs.createReadStream(images.nuevoLogoImpresion).pipe(fs.createWriteStream(__dirname + '/../../../public/images/' + r.rows[0].url_imagen_impresion));

            callback(err, r.rows)
        })
    },
    saveSucursal:(params,callback)=>{
        db.query("SELECT * FROM fn_SaveEmpresaSucursal($1,$2,$3,$4) as RESPUESTA", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete:(params,callback)=>{
        db.query("SELECT * FROM fn_DeleteEmpresa($1) as RESPUESTA", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
   
}