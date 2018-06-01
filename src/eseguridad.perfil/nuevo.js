var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { perfiles } from './index'
function Ver(perfil, modulos) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${perfil?'Editar':'Nuevo'} Perfil</span>
                <div class="row">
                    <form class="col s12">
                        <div class="row" id="box_error" style="display:none;">
                            <div class="col s12">
                            <div class="card-panel  red lighten-2">
                                <span class="white-text" id="text_error"></span>
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <label>Estado</label>
                                <div class="switch">
                                    <label>
                                    Inactivo
                                    <input id="estado" checked="${perfil ?   (perfil.estado == 'ACTIVO' ? 'true' : 'false') : 'true'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            ${!perfil? yo`<div class="input-field col s6">
                                <input id="cod_perfil" type="text" style="text-transform:uppercase" class="validate">
                                <label for="cod_perfil" class="active" id="lcod_perfil">Codigo perfil</label>
                            </div>`:yo``}
                            <div class="input-field col s6">
                                <input value="${perfil ? perfil.nombre : ''}" id="nombre" type="text" class="validate">
                                <label for="nombre" class="active" id="lnombre">Nombre</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="descripcion" type="text" value="${perfil? perfil.descripcion:''}" class="validate">
                                <label for="descripcion" class="active" id="ldescripcion">Descripcion</label>
                            </div>
                            <div class="input-field col s6">
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>Icono</span>
                                        <input type="file">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <span class="card-title">Acceso a los modulos</span>
                        <br>
                        <div class="row">
                            <div class="col s6">
                                <span>Nombre del modulo</span>
                            </div> 
                            <div class="col s6">
                                <span>Nivel de acceso</span>
                            </div>  
                             
                        </div>
                        <hr>
                        ${modulos.map(m => yo`
                        <div>
                        <div class="row">
                            <div class="col s6">
                                <span>${m.nombre}</span>
                            </div> 
                            <div class="col s6">
                                <div class="switch">
                                    <label>
                                    No Accede
                                    <input id="nivel_acceso_${m.cod_modulo}" checked="${m.nivel_acceso != undefined ? (m.nivel_acceso == 1 ? 'true' : 'false') : 'true'}" type="checkbox">
                                    <span class="lever"></span>
                                    Accede
                                    </label>
                                </div>
                            </div>  
                             
                        </div>  
                        <hr>
                        </div>                      
                        `)}
                        <br>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(perfil, modulos)} class="waves-effect waves-light btn">Guardar Perfil</a>
                            </div>
                            ${perfil?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(perfil)} class="waves-effect waves-light btn red lighten-3">Eliminar Perfil</a>
                            </div>
                            `:yo``}
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>perfiles()}" class="collection-item">Todos los Perfiles</a>
        <a href="#!" class="collection-item active">${perfil?'Editar':'Nuevo'} Perfil</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}

function Guardar(p, modulos) {
    var props = {
        'cod_perfil':{},
        'nombre':{}
    }
    if(!Validar(props))
        return;
    
    const cod_perfil = p ? p.cod_perfil : document.getElementById('cod_perfil').value.toUpperCase()
    const nombre = document.getElementById('nombre').value.toUpperCase()
    const descripcion = document.getElementById('descripcion').value
    const url_icono = null
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const modulosParam = []
    for(var i = 0 ; i < modulos.length ; i++){
        var m = modulos[i]
        var idMod = 'nivel_acceso_'+m.cod_modulo
        modulosParam[i] = {
            cod_modulo: m.cod_modulo,
            nivel_acceso: document.getElementById(idMod).checked? 1:0,
            estado: 'ACTIVO'
        }
    }
    ShowLoader()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_perfil,
            nombre,
            descripcion,
            url_icono,
            estado,
            modulosParam
        })
    }
    fetch(URL+'/perfiles_api/save_modulos_perfil', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if(res.resp == "TODO CORRECTO"){
                    perfiles()
                }
            }
            HideLoader()
        })
}
function Eliminar(p) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_perfil =  p.cod_perfil
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_perfil,
            })
        }
        fetch(URL+'/perfiles_api/delete_perfil', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deleteperfil == 'Se elimino correctamente') {
                       perfiles()
                    }
                }   
                HideLoader()
            })
    }
}
function nuevo(perfil) {
    if(perfil){
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_perfil: perfil.cod_perfil
            })
        }
        ShowLoader()
        fetch(URL+'/perfiles_api/get_modulos_perfil', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    console.log(res.modulos)
                    Ver(perfil, res.modulos)
                }   
                HideLoader()
        })
    }else{
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        }
        ShowLoader()
        fetch(URL+'/perfiles_api/get_modulos', parametros)
            .then(req => req.json())
            .then(res => {
                console.log(res)
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    Ver(perfil, res.modulos)
                }   
                HideLoader()
        })
    }
}

export { nuevo }