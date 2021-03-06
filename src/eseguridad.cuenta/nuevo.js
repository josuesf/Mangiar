var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { cuentas } from './index'
function Ver(usuario,perfiles,sucursales) {
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
                                    <input id="estado" ${usuario ? (usuario.estado ? 'checked' : '') : 'checked'} type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${usuario ? usuario.usuario : ''}" id="usuario" type="text" class="validate">
                                <label class="active" id="lusuario">Usuario</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${usuario ? usuario.email : ''}" id="email" type="email" class="validate">
                                <label for="email" class="active" id="lemail">Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="contrasena" type="password" class="validate">
                                <label for="" class="active" id="lcontrasena">Contraseña</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${usuario ? usuario.telefono : ''}" id="telefono" type="text" class="">
                                <label for="" class="active">Telefono</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <select id="cod_perfil">
                                    <option value=null disabled selected></option>
                                    ${perfiles.map(p=>yo`
                                    <option value="${p.cod_perfil}" ${usuario?(usuario.cod_perfil==p.cod_perfil?'selected':''):''} >${p.nombre}</option>
                                    `)}
                                </select>
                                <label>Perfil</label>
                            </div>
                            <div class="input-field col s6">
                                <select id="cod_sucursal">
                                    <option value=null disabled selected></option>
                                    ${sucursales.map(p=>yo`
                                    <option value="${p.cod_sucursal}" ${usuario?(usuario.cod_sucursal==p.cod_sucursal?'selected':''):''} >${p.nombre}</option>
                                    `)}
                                </select>
                                <label>Sucursal</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(usuario)} class="waves-effect waves-light btn">Guardar Usuario</a>
                            </div>
                            ${usuario ? yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(usuario)} class="waves-effect waves-light btn red lighten-3">Eliminar Usuario</a>
                            </div>
                            `: yo``}
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
        <a href="#!" onclick="${() => cuentas()}" class="collection-item">Todos los usuarios</a>
        <a href="#!" class="collection-item active">Nuevo Usuario</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}

function Guardar(u) {
    var props = {
        'usuario': {},
        'email': {},
        'contrasena': { minLen: 4 }
    }
    if (!Validar(props))
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
    fetch(URL+'/cuentas_api/save_cuenta', parametros)
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
        fetch(URL+'/cuentas_api/delete_cuenta', parametros)
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
    ShowLoader()
    // const usuario_id = u.usuario_id
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({})
    }
    fetch(URL+'/cuentas_api/get_perfiles_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
               console.log(res.err)
            } else {
                Ver(usuario, res.perfiles, res.sucursales)
            }
            HideLoader()
        })
}

export { nuevo }