var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { puntos_ventas } from './index'
function Ver(punto_venta,sucursales) {
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
                            <div class="input-field col s6" style="display:${punto_venta ? "none":"display"}">
                                <input style="text-transform: uppercase;" value="${punto_venta ? punto_venta.cod_punto_venta:''}" id="cod_punto_venta" type="text" class="validate">
                                <label class="active" id="lcod_punto_venta">Código Punto Venta</label>
                            </div>
                            <div class="input-field col s6">
                                <input style="text-transform: uppercase;" value="${punto_venta ? punto_venta.nombre_punto : ''}" id="nombre_punto" type="text">
                                <label for="nombre_punto" id="lnombre_punto" class="active">Nombre Punto Venta</label>
                            </div>
                            
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <select id="cod_sucursal"> 
                                    ${sucursales.map(e => yo`<option style="text-transform:uppercase" value="${e.cod_sucursal}" ${punto_venta?punto_venta.cod_sucursal==e.cod_sucursal?'selected':'':''}>${e.nombre}</option>`)}
                                        
                                </select>
                                <label>Código Sucursal</label>
                            </div>
                             <div class="input-field col s6">
                                <select id="estado_accion">
                                    <option value="LIBRE" ${punto_venta ? punto_venta.estado_accion=="LIBRE" ? 'selected': '' : ''}>LIBRE</option>
                                    <option value="OCUPADO" ${punto_venta ? punto_venta.estado_accion=="OCUPADO" ? 'selected': '' : ''}>OCUPADO</option>
                                    <option value="PENDIENTE" ${punto_venta ? punto_venta.estado_accion=="PENDIENTE" ? 'selected': '' : ''}>PENDIENTE</option>
                                </select>
                                <label>Estado de la acción</label>
                            </div>
                        </div>
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(punto_venta)} class="waves-effect waves-light btn">Guardar Punto de Venta</a>
                            </div>
                            ${punto_venta?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(punto_venta)} class="waves-effect waves-light btn red lighten-3">Eliminar Punto Venta</a>
                            </div>
                            `:yo``}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>puntos_ventas()}" class="collection-item">Todos los Puntos de Venta</a>
        <a href="#!" class="collection-item active">Nuevo Punto de Venta</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $('select').material_select();
}
function Guardar(p) {

    var props = {
        'cod_punto_venta':{},
        'nombre_punto':{}
    }
    if(!Validar(props))
        return;

    ShowLoader()
    const cod_punto_venta = p?p.cod_punto_venta:$('#cod_punto_venta').val().toUpperCase()
    const nombre_punto = $('#nombre_punto').val().toUpperCase()
    const cod_sucursal = $('#cod_sucursal').val()
    const estado_accion = $('#estado_accion').val()
    const usuario_accion = null
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
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
    console.log(parametros)
    fetch(URL+'/puntos_ventas_api/save_punto_venta', parametros)
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

function Eliminar(punto_venta) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_punto_venta = punto_venta.cod_punto_venta
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_punto_venta
            })
        }
        fetch(URL+'/puntos_ventas_api/delete_punto_venta', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletepuntoventa == 'Se elimino correctamente') {
                       puntos_ventas()
                    }
                }   
                HideLoader()
            })
    }
}

function nuevo_punto_venta(punto_venta) {
    ShowLoader()

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tamano_pagina:10,
            numero_pagina:1,
            sucursal_busqueda: ''
        })
    }
    fetch(URL+'/sucursales_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(punto_venta,res.sucursales)
            }
        })
    HideLoader()
}

export { nuevo_punto_venta }