var yo = require('yo-yo')
var empty = require('empty-element');
import { nuevaserie } from './nueva_serie'
import { documentos } from './index'
function Ver(documento,series,paginas,pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${documento ? 'Editar Documento' : 'Nuevo Documento' }</span>
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
                                    <input id="estado" checked="${documento ? (documento.estado=='ACTIVO' ? '1' : '0') : '0'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            ${documento ? yo`` : yo`<div class="input-field col s6">
                                                    <input id="cod_documento" type="text" class="validate">
                                                    <label class="active">Codigo Documento</label>
                                                   </div>` }
                            <div class="input-field col s6">
                                <input value="${documento ? documento.descripcion_doc : ''}" id="descripcion_doc" type="text">
                                <label for="descripcion_doc" class="active">Descripcion</label>
                            </div>
                            
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${documento ? documento.tipo_doc : ''}" id="tipo_doc" type="text" class="validate">
                                <label for="tipo_doc" class="active">Tipo</label>
                            </div>

                            <div class="input-field col s6">
                                <input value="${documento ? documento.formato_doc : ''}" id="formato_doc" type="text" class="validate">
                                <label for="formato_doc" class="active">Formato</label>
                            </div>
                             
                        </div>
                        
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(documento)} class="waves-effect waves-light btn">Guardar Documento</a>
                            </div>
                            ${documento?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(documento)} class="waves-effect waves-light btn red lighten-3">Eliminar Documento</a>
                            </div>
                            `:yo``}
                        </div>
                        <div class="row">
                            ${documento?yo`
                            <div class="col s6">
                                <a onclick=${() => AgregarSerie(documento)} class="waves-effect waves-light btn blue accent-2 lighten-3">Agregar serie</a>
                            </div>
                            `:yo``}
                        </div>
                    </form>
                </div>
                ${documento?
                    yo`
                    <div class="row">
                        <form class="col s12">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">search</i>
                                <input id="serie_busqueda" onkeyup="${()=>BuscarSerie(documento,1)}" type="number" class="validate">
                                <label for="serie_busqueda" >Ingrese el numero de la serie para buscar</label>
                            </div>
                        </form>
                    </div>`: yo``
                }
                ${documento?
                    yo`
                    <div class="row">
                        <div class="input-field col s12">
                            <div id="div_tabla">                            
                                ${VerTablaSeries(documento,series,paginas,pagina_actual)}
                            </div>
                        </div>
                    </div>`: yo``
                }
            </div>
        </div>
    </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>documentos()}" class="collection-item">Todos los Documentos</a>
        <a href="#!" class="collection-item active">Nuevo Documento</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}

function VerTablaSeries(documento,series,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Nro Serie</th>
                    <th>Nro Inicio</th>
                    <th>Sucursal</th>
                    <th>Esta afectado</th>
                </tr>
            </thead>
            <tbody>
                ${series.map(s=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>AgregarSerie(documento,s)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${s.nro_serie}</td>
                    <td>${s.nro_inicio}</td>
                    <td>${s.cod_sucursal}</td>
                    <td>${s.esta_afecto}</td>
                </tr>
                `)}
            </tbody>
        </table>
        <ul class="pagination">
            <li class="${(pagina_actual>1)?'waves-effect':'disabled'}">
                <a href="#!" onclick="${()=>(pagina_actual>1)?BuscarSerie(documento,pagina_actual-1):null}">
                    <i class="material-icons">chevron_left</i>
                </a>
            </li>
            ${((new Array(paginas)).fill(0)).map((p, i) => yo`<li class=${pagina_actual==(i+1)?'active indigo lighten-2':' waves-effect'}>
            <a href="#!" onclick="${()=>BuscarSerie(documento,i+1)}" >${i + 1}</a>
            </li>`)}
            <li class="${(pagina_actual<paginas)?'waves-effect':'disabled'}">
                <a href="#!" onclick="${()=>(pagina_actual<paginas)?BuscarSerie(documento,pagina_actual+1):null}">
                    <i class="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>
    </div>`;
}

function fetchSeries(documento,tamano_pagina,_numero_pagina,serie_busqueda,callback){ 
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                numero_pagina:_numero_pagina||1,
                tamano_pagina,
                serie_busqueda,
                cod_documento_cod:documento?documento.cod_documento:''
            })
        }
        fetch('http://localhost:5000/documentos_api/get_series', parametros)
            .then(req => req.json())
            .then(res => {
                callback(res)
            }) 
}

function BuscarSerie(documento,pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const serie_busqueda = document.getElementById('serie_busqueda').value.toUpperCase()
    fetchSeries(documento,tamano_pagina,pagina_actual,serie_busqueda.length>0?serie_busqueda:null,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTablaSeries(documento,res.series,paginas,pagina_actual)) 
        }
    })
}

function Guardar(d) {
    ShowLoader()
    const cod_documento = d?d.cod_documento:$("#cod_documento").val()
    const descripcion_doc = $('#descripcion_doc').val()
    const tipo_doc = $('#tipo_doc').val()
    const formato_doc = $('#formato_doc').val()
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_documento,
            descripcion_doc, 
            tipo_doc,
            formato_doc,
            estado
        })
    }
    fetch('http://localhost:5000/documentos_api/save_documento', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.documentos.length > 0) {
                    documentos()
                }
            }
            HideLoader()
        })
}

function Eliminar(documento) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_documento = documento.cod_documento
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_documento
            })
        }
        fetch('http://localhost:5000/documentos_api/delete_documento', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletedocumento == 'Se elimino correctamente') {
                       documentos()
                    }
                }   
                HideLoader()
            })
    }
}

function AgregarSerie(documento,s){
    nuevaserie(documento,s)
}

function nuevo(documento,_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchSeries(documento,tamano_pagina,_numero_pagina,null,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(documento,res.series,paginas,_numero_pagina||1)
        }
        HideLoader()
    })

   // Ver(documento)
   // HideLoader()
}

export { nuevo }