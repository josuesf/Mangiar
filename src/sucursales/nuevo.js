var yo = require('yo-yo')
var empty = require('empty-element');
import { sucursales } from './index'
function Ver(sucursal,ubigeos) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${sucursal ? 'Editar Sucursal' : 'Nueva Sucursal' }</span>
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
                                    <input id="estado" checked="${sucursal ? (sucursal.estado=='ACTIVO' ? '1' : '0') : '0'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            ${sucursal ? yo`` : yo`<div class="input-field col s6">
                                                    <input id="cod_sucursal" type="text" class="validate" data-length="30">
                                                    <label class="active">Codigo Sucursal</label>
                                                   </div>` }
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.nombre : ''}" id="nombre" type="text" class="validate" data-length="100">
                                <label class="active">Nombre</label>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.direccion : ''}" id="direccion" type="text" data-length="120">
                                <label class="active">Dirección</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.telefono : ''}" id="telefono" type="text" class="validate" data-length="12">
                                <label for="telefono" class="active">Teléfono</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.correo : ''}" id="correo" type="email" class="validate" data-length="40">
                                <label for="correo" class="active" data-error="Correo invalido" data-success="">Correo</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.fax : ''}" id="fax" type="text" class="validate" data-length="12">
                                <label for="fax" class="active">Fax</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <select id="tipo_sistema">
                                    <option value=null disabled selected></option>
                                </select>
                                <label>Tipo de Sistema</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.latitud : ''}" id="latitud" type="text" class="validate">
                                <label for="latitud" class="active">Latitud</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.longitud : ''}" id="longitud" type="text" class="validate">
                                <label for="longitud" class="active">Longitud</label>
                            </div>
                            <div class="input-field col s6">
                                <select id="departamento" onchange=${()=>CambioDepartamento(sucursal,ubigeos)}>
                                    <option value="-1">Seleccione un departamento</div>
                                    ${ubigeos.map(u=>
                                        yo`<option value="${u.cod_departamento}" ${sucursal ? sucursal.departamento == u.cod_departamento ? 'selected' : '' : ''}>${u.departamento}</option>`
                                    )}
                                </select>
                                <label>Departamento</label>
                            </div>
                        </div>
                         <div class="row">
                            <div class="input-field col s6">
                                <select id="provincia" onchange=${()=>CambioProvincia(sucursal,ubigeos)}>
                                </select>
                                <label>Provincia</label>
                            </div>
                            <div class="input-field col s6">
                                <select id="distrito">
                                </select>
                                <label>Distrito</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(sucursal)} class="waves-effect waves-light btn">Guardar Sucursal</a>
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
        <a onclick="${sucursales}" class="collection-item">Todas las Sucursales</a>
        <a href="#!" class="collection-item active">Nueva Sucursal</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}

function CambioDepartamento(sucursal,ubigeos){
    var cod_departamento =  $("#departamento").val()
    if(cod_departamento=="-1"){
        $("#provincia").val("")
        $("#distrito").val("")        
    }else{
        
        var html=''
        for(var i=0;i<ubigeos.length;i++){
            html = html + '<option value="'+ubigeos[i].cod_provincia+'">'+ubigeos[i].provincia+'</option>'
            //console.log(html)
            $('#provincia').html(html)
        }
        $('#provincia').html(html)
        //CambioProvincia(sucursal,ubigeos)
    }
}

function CambioProvincia(sucursal,ubigeos){
    var cod_provincia =  $("#provincia").val() 
    var el = yo`${ubigeos.map(u=>
                u.cod_provincia==cod_provincia?yo`<option value="${u.cod_distrito}" ${sucursal ? sucursal.distrito == u.cod_distrito ? 'selected' : '' : ''}>${u.cod_distrito}</option>`:yo``
            )}`
    $('#distrito').html(el)
}

function Guardar(s) {
    ShowLoader()
    const cod_sucursal = s?s.cod_sucursal:$('#cod_sucursal').val()
    const nombre = $('#nombre').val()
    const direccion = $('#direccion').val()
    const telefono = $('#telefono').val()
    const correo = $('#correo').val()
    const fax = $('#fax').val()
    const tipo_sistema = $('#tipo_sistema').val()
    const latitud = $('#latitud').val()
    const longitud = $('#longitud').val()
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
    const departamento = $('#departamento').val()
    const provincia = $('#provincia').val()
    const distrito = $('#distrito').val()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_sucursal,
            nombre, 
            direccion,
            telefono,
            correo, 
            fax,
            tipo_sistema,
            latitud,
            longitud,
            estado,
            departamento,
            provincia,
            distrito
        })
    }
    fetch('http://localhost:5000/sucursales_api/save_sucursal', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.sucursales.length > 0) {
                    sucursales()
                }
            }
            HideLoader()
        })
}
function nuevo(sucursal) {
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
            ubigeo_busqueda: ''
        })
    }
    fetch('http://localhost:5000/ubigeos_api/get_ubigeos', parametros)
        .then(req => req.json())
        .then(res => {
            //Ver(sucursal,res.ubigeos)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(sucursal,res.ubigeos)
            }
            HideLoader()
        })


    /*const parametros = {
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
                Ver(sucursal)
            }
            HideLoader()
        })*/
}

export { nuevo }