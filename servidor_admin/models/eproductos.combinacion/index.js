
const db = require('../../../connectionbd')
const fs = require('fs')
module.exports = {
    getAll: (params, callback) => {
        db.query('SELECT * FROM eproductos.producto', params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete_combinacion_detalle: (params, callback)=>{
        db.query('SELECT * FROM eproductos.fn_DeleteCombinacionDetalle($1)', params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    delete_combinacion: (params, callback)=>{
        db.query('SELECT * FROM eproductos.fn_DeleteCombinacion($1)', params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    get_combinacion_detalle: (params, callback)=>{
        db.query('SELECT * FROM eproductos.combinacion_detalle WHERE combinacion_id=$1', params, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    save_combinacion: (input, callback) => {
        var params1 = [input.combinacion_id, input.etiqueta_titulo, input.cantidad_minima, input.cantidad_maxima, input.estado, input.usuario]
        db.query('SELECT * FROM eproductos.fn_SaveCombinacion($1,$2,$3,$4,$5,$6)', params1, (err, r) => {
            if (err) {
                return callback(err.name + ":" + err.code + " " + err.routine, undefined)
            }
            input.combinacion_id = r.rows[0].combinacion_id
            function SaveCombinacionDetalle(input, i){
                params = [
                    input.ITEMS[i].detalle_id,
                    input.combinacion_id,
                    input.ITEMS[i].producto_id,
                    input.ITEMS[i].nombre_producto,
                    input.ITEMS[i].cod_moneda,
                    input.ITEMS[i].precio,
                    input.estado,
                    input.usuario
                ]
                if(i+1 == input.ITEMS.length){
                    
                    db.query('SELECT * FROM eproductos.fn_SaveCombinacionDetalle($1, $2, $3, $4, $5, $6, $7, $8)', params, (err, r) => {
                        if(err){
                            return callback(err.name+":"+err.code+" "+err.routine, undefined)
                        }
                        callback(err, 'TODO CORRECTO')
                    })
                }else{
                    db.query('SELECT * FROM eproductos.fn_SaveCombinacionDetalle($1, $2, $3, $4, $5, $6, $7, $8)', params, (err, r) => {
                        if(err){
                            return callback(err.name+":"+err.code+" "+err.routine, undefined)
                        }
                        SaveCombinacionDetalle(input, i+1)
                    })
                }
            }
            SaveCombinacionDetalle(input, 0)
        })  
    }
}

