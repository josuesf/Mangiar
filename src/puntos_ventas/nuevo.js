var yo = require('yo-yo')
var empty = require('empty-element');
import { puntos_ventas } from './index'
function Ver(punto_venta) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${punto_venta ? 'Editar Punto de Venta' : 'Nuevo Punto de Venta' }</span>
                <div class="row">
                    <form class="col s12">
                        <div class="row" id="box_error" style="display:none;">
                            <div class="col s12">
                            <div class="card-panel  red lighten-2">
                                <span class="white-text" id = "text_error"></span>
                            </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col s6">
                                <label>Estado</label>
                                <div class="switch">
                                    <label>
                                    Inactivo
                                    <input id="estado" checked="${punto_venta ? (punto_venta.estado=='ACTIVO' ? '1' : '0') : '0'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            ${punto_venta ? yo`` : yo`<div class="input-field col s6">
                                                    <input id="cod_punto_venta" type="text" class="validate">
                                                    <label class="active">Codigo Punto Venta</label>
                                                   </div>` }
                            <div class="input-field col s6">
                                <input value="${punto_venta ? punto_venta.nombre_punto : ''}" id="nombre_punto" type="text">
                                <label for="nombre_punto" class="active">Nombre Punto Venta</label>
                            </div>
                            
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${punto_venta ? punto_venta.cod_sucursal : ''}" id="cod_sucursal" type="text" class="validate">
                                <label for="cod_sucursal" class="active">Codigo Sucursal</label>
                            </div>
                             <div class="input-field col s6">
                                <input value="${punto_venta ? punto_venta.estado_accion : ''}" id="estado_accion" type="text">
                                <label for="estado_accion" class="active">Estado de la acción</label>
                            </div>
                        </div>
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${punto_venta ? punto_venta.usuario_accion : ''}" id="usuario_accion" type="text" class="validate">
                                <label for="usuario_accion" class="active">Usuario de la acción</label>
                            </div>
                        </div>
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(punto_venta)} class="waves-effect waves-light btn">Guardar Punto de Venta</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a onclick="${puntos_ventas}" class="collection-item">Todos los Puntos de Venta</a>
        <a href="#!" class="collection-item active">Nuevo Punto de Venta</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function Guardar(p) {
    ShowLoader()
    const cod_punto_venta = p?p.cod_punto_venta:$('#cod_punto_venta').val()
    const nombre_punto = $('#nombre_punto').val()
    const cod_sucursal = $('#cod_sucursal').val()
    const estado_accion = $('#estado_accion').val()
    const usuario_accion = $('#usuario_accion').val()
    const estado = $('#estado').val()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_punto_venta,
            nombre_punto, 
            cod_sucursal,
            estado_accion,
            usuario_accion,
            estado
        })
    }
    fetch('http://localhost:5000/puntos_ventas_api/save_punto_venta', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.puntos_ventas.length > 0) {
                    puntos_ventas()
                }
            }
            HideLoader()
        })
}
function nuevo(punto_venta) {
    ShowLoader()
    Ver(punto_venta)
    HideLoader()
}

export { nuevo }