var yo = require('yo-yo')
var empty = require('empty-element');
import { cajas } from './index'
function Ver(caja,sucursales) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Nueva Caja</span>
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
                                    <input id="estado" ${caja ? (caja.estado=='ACTIVO' ? 'checked' : '') : 'checked'} type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            ${!caja?yo`<div class="input-field col s6">
                                <input value="${caja ? caja.cod_caja : ''}" id="cod_caja" type="text" class="validate">
                                <label id="lcod_caja" class="active" data-error="Ingrese codigo" data-success="Correcto">Codigo</label>
                            </div>`:yo``}
                            <div class="input-field col s6">
                                <input value="${caja ? caja.nombre_caja : ''}" id="nombre_caja" type="text" class="validate">
                                <label id="lnombre_caja" class="active" data-error="Ingrese nombre valido" data-success="Correcto">Nombre Caja</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <select id="cod_sucursal"> 
                                    ${caja ? yo``:yo`<option value="">Seleccione una sucursal</div>`}
                                    ${sucursales.map(e => yo`<option style="text-transform:uppercase" value="${e.cod_sucursal}" ${caja?caja.cod_sucursal==e.cod_sucursal?'selected':'':''}>${e.nombre}</option>`)} 
                                </select>
                                <label id="lcod_sucursal">Código Sucursal</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="clave" type="password" class="validate">
                                <label for="" class="active" id="lclave">Clave</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="observacion" class="materialize-textarea" value="${caja ? caja.observacion : ''}">
                                <label for="observacion" class="active">Observación</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="nombre_ip" type="text" class="validate" value="${caja ? caja.nombre_ip : ''}">
                                <label for="nombre_ip" class="active">Nombre IP</label>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(caja)} class="waves-effect waves-light btn">Guardar Caja</a>
                            </div>
                            ${caja?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(caja)} class="waves-effect waves-light btn red lighten-3">Eliminar Caja</a>
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
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>cajas()}" class="collection-item">Todos las Cajas</a>
        <a href="#!" onclick="${()=>nuevaCaja()}" class="collection-item active">Nueva Caja</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $('select').material_select();
}

function Guardar(u) {
    var props = {
        'cod_caja':{},
        'cod_sucursal':{},
        'nombre_caja':{},
        'clave':{minLen:4}
    }
    if(!Validar(props))
        return;
    ShowLoader()
    const cod_caja = u ? u.cod_caja : document.getElementById('cod_caja').value.toUpperCase()
    const cod_sucursal = document.getElementById('cod_sucursal').value.toUpperCase() 
    const nombre_caja = document.getElementById('nombre_caja').value.toUpperCase()
    const clave = document.getElementById('clave').value.toUpperCase()
    const observacion = document.getElementById('observacion').value.toUpperCase()
    const nombre_ip = document.getElementById('nombre_ip').value.toUpperCase()
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_caja,
            cod_sucursal,
            nombre_caja,
            clave,
            observacion,
            nombre_ip,
            estado
        })
    }
    fetch('http://localhost:5000/ecaja_caja/save_caja', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.cajas.length > 0) {
                    cajas()
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
        const cod_caja = u.cod_caja
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_caja
            })
        }
        fetch('http://localhost:5000/ecaja_caja/delete_caja', parametros)
            .then(req => req.json())
            .then(res => {
                console.log(res)
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                        cajas()
                    }
                }
                HideLoader()
            })
    }
}
function nuevaCaja(caja) {
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
    fetch('http://localhost:5000/sucursales_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(caja,res.sucursales)
            }
        })

    
    HideLoader()
}

export { nuevaCaja }