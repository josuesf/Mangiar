const db = require('../../../connectionbd')
module.exports = {
    getPedidobyPunto:(params,callback)=>{
        db.query('SELECT cod_punto_venta "Cod_Mesa",nombre_punto "Nom_Mesa",estado_accion "Estado_Mesa",0 "Nro_Cuentas",usuario_accion "Mesero" FROM punto_venta where estado=$1', ["ACTIVO"], (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}