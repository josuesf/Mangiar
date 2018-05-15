const db = require('../../../connectionbd')
module.exports = {
    getDocumentos: (params, callback) => {
        db.query('SELECT * FROM fn_GetDocumentos($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SaveDocumento($1,$2,$3,$4,$5,$6)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    }
    //...More functions
}