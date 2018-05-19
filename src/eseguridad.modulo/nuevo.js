var yo = require('yo-yo')
var empty = require('empty-element');
import { modulos } from './index'
function Ver(modulo) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Nuevo Modulo</span>
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
                                    <input id="estado" checked="${modulo ? (modulo.estado == "ACTIVO" ? 'true' : 'false') : 'false'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                            <div class="col s6">
                                <label>Nivel</label>
                                <div class="switch">
                                    <label>
                                    No accede
                                    <input id="nivel" checked="${modulo ? (modulo.nivel == 1 ? 'true' : 'false') : 'false'}" type="checkbox">
                                    <span class="lever"></span>
                                    Accede
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            ${!modulo? yo`<div class="input-field col s6">
                                <input id="cod_modulo" type="text" class="validate">
                                <label for="cod_modulo" class="active" id="lcod_modulo">Codigo modulo</label>
                            </div>`:yo``}
                            <div class="input-field col s6">
                                <input value="${modulo ? modulo.nombre : ''}" id="nombre" type="text" class="validate">
                                <label for="nombre" class="active" id="lnombre">Nombre</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="ruta_modulo" type="text" value="${modulo? modulo.ruta_modulo:''}" class="validate">
                                <label for="ruta_modulo" class="active" id="lruta_modulo">Ruta del modulo</label>
                            </div>
                            <div class="input-field col s6">
                                <select id="tipo_modulo">
                                    <option value="MANTENIMIENTO" ${modulo? modulo.tipo_modulo=="MANTENIMIENTO"?'selected':'':'selected'}>Mantenimiento</option>
                                    <option value="PROCESO" ${modulo? modulo.tipo_modulo=="PROCESO"?'selected':'':''}>Proceso</option>
                                    <option value="REPORTE" ${modulo? modulo.tipo_modulo=="REPORTE"?'selected':'':''}>Reporte</option>
                                </select>
                                <label>Tipo de modulo</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="descripcion" type="text" value="${modulo? modulo.descripcion:''}" class="validate">
                                <label for="descripcion" class="active" id="ldescripcion">Descripcion</label>
                            </div>
                            <div class="input-field col s6">
                                <div class="file-field input-field">
                                    <div class="btn">
                                        <span>Imagen</span>
                                        <input type="file">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(modulo)} class="waves-effect waves-light btn">Guardar Usuario</a>
                            </div>
                            ${modulo?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(modulo)} class="waves-effect waves-light btn red lighten-3">Eliminar Usuario</a>
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
        <a href="#!" onclick="${()=>modulos()}" class="collection-item">Todos los usuarios</a>
        <a href="#!" class="collection-item active">Nuevo Usuario</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}

function Guardar(m) {
    var props = {
        'cod_modulo':{},
        'nombre':{},  
        'contrasena':{minLen:4}
    }
    if(!Validar(props))
        return;
    ShowLoader()
    const cod_modulo = m ? m.cod_modulo : document.getElementById('cod_modulo').value.toUpperCase()
    const nombre = document.getElementById('nombre').value.toUpperCase()
    const descripcion = document.getElementById('descripcion').value
    const ruta_modulo = document.getElementById('ruta_modulo').value
    const tipo_modulo = document.getElementById('tipo_modulo').value
    const imagen_url = null
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const nivel = document.getElementById('nivel').checked ? 1 : 0
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_modulo,
            nombre,
            descripcion,
            nivel,
            ruta_modulo,
            tipo_modulo,
            imagen_url,
            estado
        })
    }
    fetch('http://localhost:5000/modulos_api/save_modulo', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.modulos.length > 0) {
                    modulos()
                }
            }
            HideLoader()
        })
}
function Eliminar(m) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_modulo = m.cod_modulo
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_modulo,
            })
        }
        fetch('http://localhost:5000/modulos_api/delete_modulo', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletemodulo == 'Se elimino correctamente') {
                       modulos()
                    }
                }   
                HideLoader()
            })
    }
}
function nuevo(modulo) {
    console.log(modulo)
    ShowLoader()
    Ver(modulo)
    HideLoader()
}

export { nuevo }