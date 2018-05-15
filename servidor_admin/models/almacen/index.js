const db = require('../../../connectionbd')
module.exports = {
    getAlmacenes: (params, callback) => {
        db.query('SELECT * FROM fn_GetAlmacenes($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SaveAlmacen($1,$2,$3,$4,$5,$6)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    }
    //...More functions
}