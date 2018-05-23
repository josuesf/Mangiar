const db = require('../../../connectionbd')
module.exports = {
    getCajas: (params, callback) => {
        db.query('SELECT * FROM ecaja.fn_GetCajas($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT ecaja.fn_getRowsCaja($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM ecaja.fn_SaveCaja($1,$2,$3,$4,$5,$6,$7,$8)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete:(params,callback)=>{
        db.query("SELECT * FROM ecaja.fn_DeleteCaja($1) respuesta", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}