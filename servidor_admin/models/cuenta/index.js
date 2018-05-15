
const db = require('../../../connectionbd')
const md5 = require('md5')
module.exports = {
    login: (params, callback) => {
        db.query('SELECT * FROM eseguridad.cuenta where usuario = $1', [params.usuario.toUpperCase()], (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            var cuenta = r.rowCount > 0 ? r.rows[0] : undefined
            if (cuenta != undefined) {
                if (cuenta.contrasena == md5(params.contrasena+'_08')) {
                    db.query('UPDATE eseguridad.cuenta SET ultimo_ingreso = now() where usuario_id=$1;',[cuenta.usuario_id],(err,respuesta)=>{
                        if (err) {
                            return callback(err.name+":"+err.code+" "+err.routine, undefined)
                        }
                        cuenta["contrasena"] = ''
                        callback(err, cuenta)
                    })
                }else{
                    callback('Verifique sus datos', undefined)    
                }
            } else {
                callback('No existe este usuario', undefined)
            }
        })
    },
    getCuentas: (params, callback) => {
        db.query('SELECT * FROM eseguridad.fn_GetCuentas($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT eseguridad.fn_getRowsCuenta($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM eseguridad.fn_SaveCuenta($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete:(params,callback)=>{
        db.query("SELECT * FROM eseguridad.fn_DeleteCuenta($1)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}