var yo = require('yo-yo')
var empty = require('empty-element');
import { nuevo } from './index'
function Ver(documento,serie,sucursales) {
    var el = yo`
    <div>
        <div class="modal-content">
            <h5 class="header">${serie ? 'Editar Serie' : 'Nueva Serie' }</h5>
            <div class="row">
                <form class="col s12">
                     
                    <div class="row">
                        <div class="col s6">
                            <label>Estado</label>
                            <div class="switch">
                                <label>
                                Inactivo
                                <input id="estado" checked="${serie ? (serie.estado=='ACTIVO' ? '1' : '0') : '0'}" type="checkbox">
                                <span class="lever"></span>
                                Activo
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="nro_serie" type="number" class="validate" value="${serie ?serie.nro_serie:''}">
                            <label class="active">Número Serie</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="nro_inicio" type="number" class="validate" value="${serie ?serie.nro_inicio:''}">
                            <label class="active">Número Inicio</label>
                        </div>
                    </div>
                        
                    <div class="row">
                        
                        <div class="input-field col s6">
                            <select id="cod_sucursal">
                                ${sucursales.map(u=>
                                    yo`<option value="${u.cod_sucursal}" ${serie ? serie.cod_sucursal == u.cod_sucursal ? 'selected' : '' : ''}>${u.cod_sucursal}</option>`
                                )}
                            </select>
                            <label>Sucursal</label>
                        </div>

                        <div class="input-field col s6">
                            <select id="esta_afecto">
                                <option value="1"  ${serie ? serie.esta_afecto == "1" ? 'selected' : '' : ''}>SI</option>
                                <option value="0" ${serie ? serie.esta_afecto == "0" ? 'selected' : '' : ''}>NO</option>
                            </select>
                            <label>Esta Afecto?</label>
                        </div>
                            
                    </div>
                    
                        
                    <div class="row">
                        <div class="col s6">
                            <a onclick=${() => Guardar(documento,serie)} class="waves-effect waves-light btn">Guardar Serie</a>
                        </div>
                        ${serie?yo`
                        <div class="col s6">
                            <a onclick=${() => Eliminar(documento,serie)} class="waves-effect waves-light btn red lighten-3">Eliminar Serie</a>
                        </div>
                        `:yo``}
                    </div>
                    
                </form>
            </div>
        </div>
    </div>`;
    var container = document.getElementById('modal')
    empty(container).appendChild(el);
    $('select').material_select();
    $('#modal').modal();
    $('#modal').modal('open'); 
}
 

function Eliminar(documento,serie) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_documento = documento.cod_documento
        const nro_serie = serie.nro_serie
        const nro_inicio = serie.nro_inicio
        const cod_sucursal = serie.cod_sucursal
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_documento,
                nro_serie,
                nro_inicio,
                cod_sucursal
            })
        }
        fetch('http://localhost:5000/documentos_api/delete_serie', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deleteserie == 'Se elimino correctamente') {
                        nuevo(documento)
                    }
                }   
                HideLoader()
                $("#modal").modal('close')
            })
    }
}

function Guardar(documento,serie) {
    const cod_documento = documento.cod_documento
    const nro_serie = $('#nro_serie').val()
    const nro_inicio = $('#nro_inicio').val()
    const cod_sucursal = $('#cod_sucursal').val()
    const esta_afecto = $("#esta_afecto").val()
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_documento,
            nro_serie, 
            nro_inicio,
            cod_sucursal,
            esta_afecto,
            estado
        })
    }
    fetch('http://localhost:5000/documentos_api/save_serie', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.series.length > 0) {
                    nuevo(documento)
                }
            }
            $("#modal").modal('close')
        })
}


function nuevaserie(documento,serie) {
    ShowLoader()

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tamano_pagina:500,
            numero_pagina:1,
            sucursal_busqueda: ''
        })
    }
    fetch('http://localhost:5000/sucursales_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            //Ver(sucursal,res.ubigeos) 
            Ver(documento,serie,res.sucursales)
            
            HideLoader()
        })

    HideLoader()
}

export { nuevaserie }