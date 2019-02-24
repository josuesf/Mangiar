const db = require('../../../connectionbd')
module.exports = {
    getPedidosByAnioMes: (params, callback) => {
        db.query('SELECT * from ecaja.GetVentasMes($1,$2)', params, (err, r) => {
             
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
     
}



//select pedido_id,id_detalle,cantidad,descripcion_detalle,precio,creado_en from ecaja.pedido_detalle where id_referencia='0'