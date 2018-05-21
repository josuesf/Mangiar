const db = require('../../../connectionbd')
const md5 = require('md5')
module.exports = {
    getPerfiles: (params, callback) => {
        db.query('SELECT * FROM eseguridad.fn_GetPerfiles($1,$2,$3)', params, (err, r) => {
            if (err) {
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            db.query('SELECT eseguridad.fn_getRowsPerfil($1) AS Filas', [params[2]], (err, filas) => {
                if (err) {
                    return callback(err.name+":"+err.code+" "+err.routine, undefined)
                }
                callback(err, r.rows,filas.rows[0].filas)
            })
        })
    },
    getModulos: (params, callback) => {
        db.query('SELECT * FROM eseguridad.modulo', params, (err, r) => {
            if(err){
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    getModulosPerfil: (params, callback) => {
        db.query('SELECT p.cod_perfil, p.cod_modulo, m.nombre, p.nivel_acceso, p.estado from eseguridad.perfil_modulo p inner join eseguridad.modulo m on p.cod_modulo=m.cod_modulo where p.cod_perfil=$1', params, (err, r) => {
            if(err){
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
    save: (input, callback) => {
        params1 = [
            input.cod_perfil,
            input.nombre,
            input.descripcion,
            input.url_icono,
            input.estado,
            input.usuario_creacion
        ]
        db.query('SELECT * FROM eseguridad.fn_SavePerfil($1, $2, $3, $4, $5, $6)', params1, (err, r) => {
            if(err){
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            function SavePerfilModulo(input, i){
                params = [
                    input.modulosParam[i].cod_modulo,
                    input.cod_perfil,
                    input.modulosParam[i].nivel_acceso,
                    input.modulosParam[i].estado,
                    input.usuario_creacion
                ]
                if(i+1 == input.modulosParam.length){
                    
                    db.query('SELECT * FROM eseguridad.fn_SavePerfilModulo($1, $2, $3, $4, $5)', params, (err, r) => {
                        if(err){
                            return callback(err.name+":"+err.code+" "+err.routine, undefined)
                        }
                        callback(err, 'TODO CORRECTO')
                    })
                }else{
                    db.query('SELECT * FROM eseguridad.fn_SavePerfilModulo($1, $2, $3, $4, $5)', params, (err, r) => {
                        if(err){
                            return callback(err.name+":"+err.code+" "+err.routine, undefined)
                        }
                        SavePerfilModulo(input, i+1)
                    })
                }
            }
            SavePerfilModulo(input, 0)
        })
    },
    delete: (params, callback) => {
        db.query('SELECT * FROM eseguridad.fn_DeletePerfil($1)', params, (err, r) => {
            if(err){
                return callback(err.name+":"+err.code+" "+err.routine, undefined)
            }
            callback(err, r.rows)
        })
    },
}