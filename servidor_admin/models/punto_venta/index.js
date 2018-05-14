const db = require('../../../connectionbd')
module.exports = {
    getPuntosVentas: (params, callback) => {
        db.query('SELECT * FROM fn_GetPuntosVentas($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SavePuntoVenta($1,$2,$3,$4,$5,$6,$7)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    }
    //...More functions
}