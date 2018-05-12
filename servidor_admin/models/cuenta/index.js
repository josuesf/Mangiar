
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
                    cuenta["contrasena"] = ''
                    callback(err, cuenta)
                }else{
                    callback('Verifique sus datos', undefined)    
                }
            } else {
                callback('No existe este usuario', undefined)
            }
        })
    },
    getCuentas: (params, callback) => {
        db.query('SELECT * FROM fn_GetCuentas($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}