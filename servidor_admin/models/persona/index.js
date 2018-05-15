const db = require('../../../connectionbd')
module.exports = {
    getPersonas: (params, callback) => {
        db.query('SELECT * FROM fn_GetPersonas($1,$2,$3)', params, (err, r) => {
            console.log(r)
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    save :(params,callback)=>{
        db.query("SELECT * FROM fn_SavePersona($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)", params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    }
    //...More functions
}