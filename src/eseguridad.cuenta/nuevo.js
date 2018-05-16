var yo = require('yo-yo')
var empty = require('empty-element');
import { cuentas } from './index'
function Ver(usuario) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Nuevo Usuario</span>
                <div class="row">
                    <form class="col s12">
                        <div class="row" id="box_error" style="display:none;">
                            <div class="col s12">
                            <div class="card-panel  red lighten-2">
                                <span class="white-text" id="text_error">yrty</span>
                            </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <label>Estado</label>
                                <div class="switch">
                                    <label>
                                    Inactivo
                                    <input id="estado" checked="${usuario ? (usuario.estado ? '1' : '0') : '0'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${usuario ? usuario.usuario : ''}" id="usuario" type="text" class="validate">
                                <label class="active">Usuario</label>
                                <span class="helper-text hide" style="color:red" id="usuario-helper-text"></span>
                            </div>
                            <div class="input-field col s6">
                                <input value="${usuario ? usuario.email : ''}" id="email" type="email" class="validate">
                                <label for="email" class="active" data-error="Correo invalido" data-success="">Email</label>
                                <span class="helper-text hide" style="color:red" id="email-helper-text"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="contrasena" type="password" class="validate">
                                <label for="" class="active">Contraseña</label>
                                <span class="helper-text hide" style="color:red" id="contrasena-helper-text"></span>
                            </div>
                            <div class="input-field col s6">
                                <input value="${usuario ? usuario.telefono : ''}" id="telefono" type="text" class="validate">
                                <label for="" class="active">Telefono</label>
                                <span class="helper-text hide" style="color:red" id="telefono-helper-text"></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <select id="cod_perfil">
                                    <option value=null disabled selected></option>
                                </select>
                                <label>Perfil</label>
                            </div>
                            <div class="input-field col s6">
                                <select id="cod_sucursal">
                                    <option value=null disabled selected></option>
                                </select>
                                <label>Sucursal</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(usuario)} class="waves-effect waves-light btn">Guardar Usuario</a>
                            </div>
                            ${usuario?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(usuario)} class="waves-effect waves-light btn red lighten-3">Eliminar Usuario</a>
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
        <a href="#!" onclick="${()=>cuentas()}" class="collection-item">Todos los usuarios</a>
        <a href="#!" class="collection-item active">Nuevo Usuario</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}


function Validar(props){
    function showErrorMessage(id, mensaje){
        var helperText = document.getElementById(id+'-helper-text')
        helperText.innerHTML = mensaje
        helperText.classList.remove('hide')
    }
    function hideErrorMessage(id, mensaje){
        var helperText = document.getElementById(id+'-helper-text')
        helperText.innerHTML = mensaje
        helperText.classList.add('hide')
    }
    var res = true

    for(var id in props){
        var el = document.getElementById(id)
        var value = el.value
        var condiciones = props[id]
        if(value.length == 0){
            showErrorMessage(id, "Este campo es necesario.")
            res = false
            continue
        }
        if(condiciones.minLen && condiciones.minLen > value.length){
            showErrorMessage(id, "Se necesita un minimo de " + condiciones.minLen + " caracteres.")
            res = false
            continue
        }
        if(condiciones.maxLen && condiciones.maxLen < value.length){
            showErrorMessage(id, "Se usa un maximo de " + condiciones.maxLen + " caracteres.")
            res = false
            continue
        }
        if(condiciones.evaluador && !condiciones.evaluador(value)){
            showErrorMessage(id, condiciones.mensaje)
            res = false
            continue
        }
        hideErrorMessage(id, "")
    }
    return res
}

function Guardar(u) {
    var props = {
        'usuario':{
            'nombre': 'Usuario'
        },
        'email':{
            'nombre': 'Email'
        },
        'contrasena':{
            'nombre': 'Contrasena',
            'minLen': 8
        },
        'telefono':{
            'nombre': 'Telefono'
        }
    }
    if(!Validar(props))
        return;
    ShowLoader()
    const usuario_id = u ? u.usuario_id : '-1'
    const usuario = document.getElementById('usuario').value.toUpperCase()
    const email = document.getElementById('email').value
    const telefono = document.getElementById('telefono').value
    const contrasena = document.getElementById('contrasena').value
    const cod_perfil = document.getElementById('cod_perfil').value == 'null' ? null : document.getElementById('cod_perfil').value
    const cod_sucursal = document.getElementById('cod_sucursal').value == 'null' ? null : document.getElementById('cod_sucursal').value
    const foto_url = null
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario_id,
            usuario, email, telefono,
            contrasena, cod_perfil, cod_sucursal,
            foto_url, estado
        })
    }
    fetch('http://localhost:5000/cuentas_api/save_cuenta', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.cuentas.length > 0) {
                    cuentas()
                }
            }
            HideLoader()
        })
}
function Eliminar(u) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const usuario_id = u.usuario_id
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                usuario_id,
            })
        }
        fetch('http://localhost:5000/cuentas_api/delete_cuenta', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletecuenta == 'Se elimino correctamente') {
                        cuentas()
                    }
                }
                HideLoader()
            })
    }
}
function nuevo(usuario) {
    console.log(usuario)
    ShowLoader()
    Ver(usuario)
    HideLoader()
}

export { nuevo }