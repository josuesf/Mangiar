const db = require('../../../connectionbd')
module.exports = {
    getDocumentos: (params, callback) => {
        db.query('SELECT * FROM fn_GetDocumentos($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT fn_getRowsDocumentos($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    getSeries: (params, callback) => {
        db.query('SELECT * FROM fn_GetSeries($1,$2,$3,$4)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT fn_getRowsSeries($1,$2) AS Filas', [params[2],params[3]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },

    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SaveDocumento($1,$2,$3,$4,$5,$6)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },

    saveSerie :(params,callback)=>{
        db.query("SELECT * FROM fn_SaveSerie($1,$2,$3,$4,$5,$6,$7)", params, (err, r) => {
            if (err) {
                return callback(err, undefined)
            }
            callback(err, r.rows)
        })
    },

    deleteSerie:(params,callback)=>{
        db.query("SELECT * FROM fn_DeleteSerie($1,$2,$3,$4)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },

    delete:(params,callback)=>{
        db.query("SELECT * FROM fn_DeleteDocumento($1)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}