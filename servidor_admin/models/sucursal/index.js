const db = require('../../../connectionbd')
module.exports = {
    getSucursales: (params, callback) => {
        console.log(params)
        db.query('SELECT * FROM fn_GetSucursales($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT fn_getRowsSucursales($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SaveSucursal($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete:(params,callback)=>{
        db.query("SELECT * FROM fn_DeleteSucursal($1)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    get_sucursales_simple:(params,callback)=>{
        db.query("SELECT cod_sucursal,nombre FROM sucursal where estado=$1", params, (err, r) => {
            if (err) {
                console.log(err)
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}