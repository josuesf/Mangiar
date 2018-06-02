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
        const nro_cuentas = "(SELECT count(distinct d.pedido_id) from ecaja.pedido_detalle d inner join ecaja.pedido p on d.pedido_id=p.pedido_id and p.estado_pedido!='TERMINADO' where d.cod_punto_venta=pv.cod_punto_venta)"
        db.query('SELECT cod_punto_venta "cod_mesa",nombre_punto "nombre_mesa",estado_accion,'+nro_cuentas+' "Nro_Cuentas",usuario_accion "Mesero" FROM punto_venta pv where estado=$1 order by creado_en', ["ACTIVO"], (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    getCuentas:(params,callback)=>{
        db.query('SELECT distinct p.numero, p.nro_serie,p.pedido_id,d.cod_punto_venta FROM punto_venta pv inner join ecaja.pedido_detalle d on d.cod_punto_venta=pv.cod_punto_venta inner join ecaja.pedido p on d.pedido_id=p.pedido_id where pv.cod_punto_venta=$1 and p.estado_pedido=$2', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    getPedidoDetalle:(params,callback)=>{
        db.query('SELECT d.*, p.*,pers.*,pr.* FROM ecaja.pedido_detalle d inner join ecaja.pedido p on d.pedido_id=p.pedido_id left join eproductos.producto pr on d.producto_id=pr.producto_id left join persona pers on p.cod_persona=pers.cod_persona where d.pedido_id=$1 and d.cod_punto_venta=$2', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            } 
            callback(err, r.rows)
        })
    },
 
    //...More functions
}