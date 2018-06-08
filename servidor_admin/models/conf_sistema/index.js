
const db = require('../../../connectionbd')
module.exports = {
    getVariales: (params, callback) => {
        db.query('SELECT * FROM conf_sistema where obs_variable=$1', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
}