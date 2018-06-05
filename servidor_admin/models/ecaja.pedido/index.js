const db = require('../../../connectionbd')
module.exports = {
    getPedidobyPunto:(params,callback)=>{
        // var get_pedidos = 'SELECT d.pedido_id,p.numero,d.id_detalle,d.producto_id,d.id_referencia,';
        // get_pedidos+='d.almacen_cod,d.cantidad,d.descripcion_detalle nombre';
        // get_pedidos+=",'S/.' simbolo,d.precio valor_precio,"
        // get_pedidos+='d.cod_punto_venta cod_mesa,d.estado_detalle '
        // get_pedidos+=' FROM ecaja.pedido_detalle d inner join ecaja.pedido p on d.pedido_id=p.pedido_id d.cod_punto_venta=$1'
        db.query('SELECT * from eproductos.fn_GetPedidoByPunto($1) ', params, (err, r) => {
            if (err) {
                console.log(err)
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    confirmar_pedido:(params,producto_detalles,usuario_registro,callback)=>{
        db.query('SELECT * from eproductos.fn_SaveComanda($1,$2,$3,$4,$5,$6,$7)', params, (err, r) => {
            if (err) {
                console.log(err)
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            if(r.rows.length>0){
                const fila=r.rows[0]
                const numero=fila.numero
                const pedido_id=fila.pedido_id
                for(var i=0;i<producto_detalles.length;i++){
                    var item_detalle=[
                        pedido_id,
                        producto_detalles[i].id_detalle,
                        producto_detalles[i].producto_id,
                        producto_detalles[i].id_referencia?producto_detalles[i].id_referencia:'0',
                        producto_detalles[i].almacen_cod,
                        producto_detalles[i].cantidad,
                        producto_detalles[i].nombre,
                        producto_detalles[i].valor_precio,
                        producto_detalles[i].cod_mesa,
                        producto_detalles[i].estado_detalle,
                        usuario_registro
                    ]
                    db.query('SELECT * from eproductos.fn_SaveComanda_Detalle($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', item_detalle, (err, r) => {
                        return;
                    })
                }
            }
            callback(err, r.rows)
        })
    },
    getPedidobyNumero:(params,callback)=>{
        db.query('select pedido_id,numero,nombre_cliente,cod_moneda,total,usuario_creacion from ecaja.pedido where numero=$1', params, (err, r) => {
            if (err) {
                console.log(err)
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows[0])
        })
    },
    getPedidoDetallebyId:(params,callback)=>{
        db.query('select pedido_id,id_detalle,producto_id,id_referencia,almacen_cod,cantidad,descripcion_detalle nombre,precio precio_valor,cod_punto_venta cod_mesa from ecaja.pedido_detalle where pedido_id=$1', params, (err, r) => {
            if (err) {
                console.log(err)
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    //...More functions
}