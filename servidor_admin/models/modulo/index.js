const db = require('../../../connectionbd')
const md5 = require('md5')
module.exports = {
    getModulos: (params, callback) => {
        db.query('SELECT * FROM eseguridad.fn_GetModulos($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
}