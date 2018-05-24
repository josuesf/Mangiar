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
                            <div class="input-field col s6" style="display:${sucursal ? "none":"display"}">
                                <input style="text-transform: uppercase;" id="cod_sucursal" type="text" class="validate" data-length="30">
                                <label class="active" for="cod_sucursal" id="lcod_sucursal" data-error="Código mayor al permitido" data-success="">Codigo Sucursal</label>
                            </div>
                            <div class="input-field col s6">
                                <input style="text-transform: uppercase;" value="${sucursal ? sucursal.nombre : ''}" id="nombre" type="text" class="validate" data-length="100">
                                <label class="active" for="nombre" id="lnombre" data-error="Es necesario llenar este campo" data-success="">Nombre</label>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.direccion : ''}" id="direccion" type="text" data-length="120">
                                <label class="active" for="direccion" id="ldireccion" data-error="Es necesario llenar este campo" data-success="">Dirección</label>
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
                                    <option value="escritorio">Escritorio</option>
                                </select>
                                <label>Tipo de Sistema</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.latitud : '0'}" id="latitud" type="text" class="validate">
                                <label for="latitud" class="active">Latitud</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${sucursal ? sucursal.longitud : '0'}" id="longitud" type="text" class="validate">
                                <label for="longitud" class="active">Longitud</label>
                            </div>
                            <div class="input-field col s6">
                                <select id="departamento" onchange="${()=>CambioDepartamento(sucursal,ubigeos)}">
                                    ${sucursal ? yo``:yo`<option value="">Seleccione un departamento</div>`}
                                    ${ubigeos.map(u=>
                                        yo`<option value="${u.cod_departamento}" ${sucursal ? sucursal.departamento == u.cod_departamento ? 'selected' : '' : ''}>${u.departamento}</option>`
                                    )}
                                </select>
                                <label id="ldepartamento">Departamento</label>
                            </div>
                        </div>
                         <div class="row">
                            <div class="col s6" id="divProvincia">
                                <div class="input-field col s12">
                                    <select id="provincia" onchange="${()=>CambioProvincia(sucursal,ubigeos)}">
                                        ${sucursal ? yo``:yo`<option value="">Seleccione una provincia</div>`}
                                        ${sucursal ?
                                            ubigeos.map(u=>
                                            yo`<option value="${u.cod_provincia}" ${sucursal ? sucursal.provincia == u.cod_provincia ? 'selected' : '' : ''}>${u.provincia}</option>`
                                        ):yo``}
                                    </select>
                                    <label id="lprovincia">Provincia</label>
                                </div>
                            </div>
                            <div class="col s6" id="divDistrito">
                                <div class="input-field col s12">
                                    <select id="distrito">
                                        ${sucursal ? yo``:yo`<option value="">Seleccione un distrito</div>`}
                                        ${sucursal ?
                                            ubigeos.map(u=>
                                            yo`<option value="${u.cod_distrito}" ${sucursal ? sucursal.distrito == u.cod_distrito ? 'selected' : '' : ''}>${u.distrito}</option>`
                                        ):yo``}
                                    </select>
                                    <label id="ldistrito">Distrito</label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(sucursal)} class="waves-effect waves-light btn">Guardar Sucursal</a>
                            </div>
                            ${sucursal?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(sucursal)} class="waves-effect waves-light btn red lighten-3">Eliminar Sucursal</a>
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
        <a href="#!" onclick="${()=>sucursales()}" class="collection-item">Todas las Sucursales</a>
        <a href="#!" class="collection-item active">Nueva Sucursal</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $('select').material_select();
}

function CambioDepartamento(sucursal,ubigeos){
    var cod_departamento =  $("#departamento").val()
    var blank = yo`
        <div class="input-field col s12">
            <select id="provincia">
                <option value="">Seleccione una provincia</div>
            </select>
            <label id="lprovincia">Provincia</label>
        </div>`

    var opts = document.getElementById('divProvincia')
    empty(opts).appendChild(blank)
    $('select').material_select();  

    if(cod_departamento!="-1"){
      
        var el = yo`
                <div class="input-field col s12">
                    <select id="provincia" onchange="${()=>CambioProvincia(sucursal,ubigeos)}">
                    <option value="">Seleccione una provincia</div>
                    ${ubigeos.map(u=>
                        u.cod_departamento==cod_departamento?yo`<option value="${u.cod_provincia}">${u.provincia}</option>`:yo``
                    )}
                    </select>
                    <label id="lprovincia">Provincia</label>
                </div>`
        
        var opts = document.getElementById('divProvincia')
        empty(opts).appendChild(el)
        $('select').material_select();

        CambioProvincia(sucursal,ubigeos)
    }
}

function CambioProvincia(sucursal,ubigeos){
    var cod_provincia =  $("#provincia").val()
    var blank = yo`
        <div class="input-field col s12">
            <select id="distrito">
                <option value="">Seleccione un distrito</div>
            </select>
            <label id="ldistrito">Distrito</label>
        </div>`

    var opts = document.getElementById('divDistrito')
    empty(opts).appendChild(blank)
    $('select').material_select();  
 
    var el = yo`
            <div class="input-field col s12">
                <select id="distrito">
                <option value="">Seleccione un distrito</div>
                ${ubigeos.map(u=>
                    u.cod_provincia==cod_provincia?yo`<option value="${u.cod_distrito}">${u.distrito}</option>`:yo``
                )}
                </select>
                <label id="ldistrito">Distrito</label>
            </div>`
    
    var opts = document.getElementById('divDistrito')
    empty(opts).appendChild(el)
    $('select').material_select();
}

function Guardar(s) {

    var props = {
        'cod_sucursal':{},
        'nombre':{maxLen:100},
        'direccion':{},
        'departamento':{},
        'provincia':{},
        'distrito':{}
    }
    if(!Validar(props))
        return;

    ShowLoader()
    const cod_sucursal = s?s.cod_sucursal:$('#cod_sucursal').val().toUpperCase()
    const nombre = $('#nombre').val().toUpperCase()
    const direccion = $('#direccion').val().toUpperCase()
    const telefono = $('#telefono').val()
    const correo = $('#correo').val()
    const fax = $('#fax').val()
    const tipo_sistema = $('#tipo_sistema').val()
    const latitud = $('#latitud').val().trim()==""?0:$('#latitud').val()
    const longitud = $('#longitud').val().trim()==""?0:$('#longitud').val()
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
    console.log(parametros)
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

function Eliminar(s) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_sucursal = s.cod_sucursal
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_sucursal,
            })
        }
        fetch('http://localhost:5000/sucursales_api/delete_sucursal', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletesucursal == 'Se elimino correctamente') {
                        sucursales()
                    }
                }
                HideLoader()
            })
    }
}
function nuevaSucursal(sucursal) {
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

export { nuevaSucursal }