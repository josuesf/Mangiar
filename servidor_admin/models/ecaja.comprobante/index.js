const db = require('../../../connectionbd')
module.exports = {
    getComprobantes: (params, callback) => {
        db.query('SELECT * FROM ecaja.fn_GetComprobantes($1,$2,$3,$4)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT ecaja.fn_getRowsComprobantes($1,$2) AS Filas', [params[2],params[3]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    }, 
    save:(params,callback)=>{
        db.query('SELECT * from ecaja.fn_savecomprobantepedido($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) ', params, (err, r) => {
            if (err) {
                console.log(err)
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    getDetailsComprobante: (params, callback) => {
        db.query('SELECT * FROM ecaja.fn_GetComprobantes($1,$2,$3,$4)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT ecaja.fn_getRowsComprobantes($1,$2) AS Filas', [params[2],params[3]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    getNumeroSiguiente: (params, callback) => {
        db.query('SELECT * FROM ecaja.fn_GetNumeroSiguiente($1,$2,$3) AS NroSiguiente', params, (err, r) => {
            if (err) {
                return callback(err, undefined)
            }
            callback(err, r.rows[0].nrosiguiente) 
        })
    }, 

    /*delete:(params,callback)=>{
        db.query("SELECT * FROM ecaja.fn_DeleteCaja($1) respuesta", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },*/
    //...More functions
}