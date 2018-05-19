const db = require('../../../connectionbd')
const md5 = require('md5')
module.exports = {
    getModulos: (params, callback) => {
        db.query('SELECT * FROM eseguridad.fn_GetModulos($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT eseguridad.fn_getRowsModulo($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM eseguridad.fn_SaveModulo($1,$2,$3,$4,$5,$6,$7,$8,$9)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete:(params,callback)=>{
        db.query("SELECT * FROM eseguridad.fn_DeleteModulo($1)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
}