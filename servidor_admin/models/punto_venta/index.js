const db = require('../../../connectionbd')
module.exports = {
    getPuntosVentas: (params, callback) => {
        db.query('SELECT * FROM fn_GetPuntosVentas($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT fn_getRowsPuntosVentas($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SavePuntoVenta($1,$2,$3,$4,$5,$6,$7)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete:(params,callback)=>{
        db.query("SELECT * FROM fn_DeletePuntoVenta($1)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    getActivos:(params,callback)=>{
        db.query('SELECT cod_punto_venta "Cod_Mesa",nombre_punto "Nom_Mesa",estado_accion "Estado_Mesa",0 "Nro_Cuentas",usuario_accion "Mesero" FROM punto_venta where estado=$1', ["ACTIVO"], (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}