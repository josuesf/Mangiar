var yo = require('yo-yo')
var empty = require('empty-element');

import { URL } from '../constantes_entorno/constantes'
import { empresas } from './index'
import { nuevaSucursal } from '../sucursales/nuevo'

function Ver(empresa,sucursales,paginas,pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">

                <div class="col s12">
                    <ul class="tabs">
                        <li class="tab col s3"><a class="active" href="#tab_empresa">Empresa</a></li>
                        ${empresa && yo`<li class="tab col s3"><a href="#tab_sucursales" onclick="${()=>CargarTabSucursales(empresa,sucursales,paginas,pagina_actual)}">Sucursales</a></li>`}
                    </ul>
                </div>

                <div id="tab_empresa" class="col s12">
                    <br><br>
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
                                        <input id="estado" ${empresa ? (empresa.estado=='ACTIVO' ? 'checked' : '') : 'checked'} type="checkbox">
                                        <span class="lever"></span>
                                        Activo
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6" style="display:${empresa ? "none":"display"}">
                                    <input style="text-transform: uppercase;" id="cod_empresa" type="text" class="validate">
                                    <label class="active" for="cod_empresa" id="lcod_empresa" data-error="" data-success="">Codigo Empresa</label>
                                </div>
                                <div class="input-field col s6">
                                    <input style="text-transform: uppercase;" value="${empresa ? empresa.nombre_corto: ''}" id="nombre_corto" type="text">
                                    <label class="active" for="nombre_corto" id="lnombre_corto" data-error="" data-success="">Nombre corto empresa</label>
                                </div>
                                
                            </div>
                            
                            <div class="row">
                                
                                <div class="input-field col s12">
                                    <input value="${empresa ? empresa.razon_social : ''}" id="razon_social" type="text" class="validate">
                                    <label for="razon_social" class="active" id="lrazon_social" data-error="" data-success="">Razon Social</label>
                                </div>
                            </div>
                            
                            <div class="row">
                                <div class="input-field col s12">
                                    <input value="${empresa ? empresa.descripcion : ''}" id="descripcion" type="text" class="validate">
                                    <label for="descripcion" class="active">Descripcion</label>
                                </div>
                                
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <input value="${empresa ? empresa.direccion : ''}" id="direccion" type="text" class="validate">
                                    <label for="direccion" class="active">Direccion</label>
                                </div>
                                
                            </div>
                            
                            <div class="row">
                                <div class="input-field col s6">
                                    <input value="${empresa ? empresa.telefono1 : ''}" id="telefono1" type="text" class="validate">
                                    <label for="telefono1" class="active">Telefono 1</label>
                                </div>
                                <div class="input-field col s6">
                                    <input value="${empresa ? empresa.telefono2 : ''}" id="telefono2" type="text" class="validate">
                                    <label for="telefono2" class="active">Telefono 2</label>
                                </div>
                                
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <input value="${empresa ? empresa.correo : ''}" id="correo" type="email" class="validate">
                                    <label for="correo" class="active">Correo</label>
                                </div>
                        
                            </div>

                            <div class="row">
                                <div class="input-field col s12">
                                    <input value="${empresa ? empresa.pagina_web : ''}" id="pagina_web" type="text" class="validate">
                                    <label for="pagina_web" class="active">Pagina Web</label>
                                </div>
                                
                            </div>

                            <div class="row">
                                <div class="col s6">
                                    <div class="row">
                                        <div class="col s12 file-field input-field">
                                            <div class="btn">
                                                <span>Cargar Imagen</span>
                                                <input type="file" id="url_imagen" onchange="${CambiarImagen}">
                                            </div>
                                            <div class="file-path-wrapper">
                                                <input class="file-path validate" type="text">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <img class="col s6 materialboxed" id="url_imagen_previa" src="${empresa ? 'public/images/' + empresa.url_imagen : ''}">
                                    </div>
                                </div>
                                <div class="col s6">
                                        <div class="row">
                                            <div class="col s12 file-field input-field">
                                                <div class="btn">
                                                    <span>Cargar Imagen Impresion</span>
                                                    <input type="file" id="url_imagen_impresion" onchange="${CambiarImagenImpresion}">
                                                </div>
                                                <div class="file-path-wrapper">
                                                    <input class="file-path validate" type="text">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <img class="col s6 materialboxed" id="url_imagen_impresion_previa" src="${empresa ? 'public/images/' + empresa.url_imagen_impresion : ''}">
                                        </div>
                                    </div>
                                </div>
                            <div class="row">
                                <div class="col s6">
                                    <a onclick=${() => Guardar(empresa)} class="waves-effect waves-light btn">Registrar Empresa</a>
                                </div>
                                ${empresa?yo`
                                <div class="col s6">
                                    <a onclick=${() => Eliminar(empresa)} class="waves-effect waves-light btn red lighten-3">Eliminar Empresa</a>
                                </div>
                                `:yo``}
                            </div>
                        </form>
                    </div>
                </div>
                ${empresa && yo`<div id="tab_sucursales" class="col s12"></div>`}
                
            </div>
        </div>
    </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    $('ul.tabs').tabs();
}


function VerTablaSucursales(empresa,sucursales,paginas,pagina_actual){
    console.log(sucursales)
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${sucursales.map(s=> yo`
                <tr>
                    <td> 
                        <select id="${s.cod_sucursal}" onchange="${()=>InsertarRelacion(empresa,s)}">
                            <option value="ACTIVO" ${parseInt(s.flagEmpresaSucursal) != -1 || s.flagEmpresaSucursal != '-1'? 'selected': ''}>RELACIONADO</option>
                            <option value="INACTIVO" ${parseInt(s.flagEmpresaSucursal) == -1 || s.flagEmpresaSucursal == '-1'? 'selected': ''}>NO RELACIONADO</option>
                        </select>
                    </td>
                    <td>${s.nombre}</td>
                    <td>${s.direccion}</td>
                    <td>${s.telefono}</td>
                    <td>
                        <span class="new badge ${s.estado=="ACTIVO"? 'blue':'red'}" data-badge-caption="${s.estado}"></span>
                    </td>
                </tr>
                `)}
            </tbody>
        </table>
        <ul class="pagination">
            <li class="${(pagina_actual>1)?'waves-effect':'disabled'}">
                <a href="#!" onclick="${()=>(pagina_actual>1)?Buscar(empresa,pagina_actual-1):null}">
                    <i class="material-icons">chevron_left</i>
                </a>
            </li>
            ${((new Array(paginas)).fill(0)).map((p, i) => yo`<li class=${pagina_actual==(i+1)?'active indigo lighten-2':' waves-effect'}>
            <a href="#!" onclick="${()=>Buscar(empresa,mi+1)}" >${i + 1}</a>
            </li>`)}
            <li class="${(pagina_actual<paginas)?'waves-effect':'disabled'}">
                <a href="#!" onclick="${()=>(pagina_actual<paginas)?Buscar(empresa,pagina_actual+1):null}">
                    <i class="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>
    </div>`;
}


function CargarTabSucursales(empresa,sucursales,paginas,pagina_actual){
    var el = yo`
        <div class="row"> 
            <br><br>
            <div class="col-md-12">
                <div class="row">
                    <div class="col s12">
                        <a onclick=${() => nuevaSucursal()} class="waves-effect waves-light btn blue accent-2 lighten-3">Nueva Sucursal</a>
                    </div>
                </div> 
                <div class="row">
                    <form class="col s12">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">search</i>
                            <input id="sucursal_busqueda" onkeyup="${()=>Buscar(empresa,1)}" type="text" class="validate">
                            <label for="sucursal_busqueda" >Ingrese la sucursal para buscar</label>
                        </div>
                    </form>
                </div> 
                <div class="row">
                    <div class="input-field col s12">
                        <div id="div_tabla">                            
                            ${VerTablaSucursales(empresa,sucursales,paginas,pagina_actual)}
                        </div>
                    </div>
                </div> 
            </div>
        </div>`
    var container = document.getElementById('tab_sucursales')
    empty(container).appendChild(el);
    $('select').material_select();
}



function fetchSucursales(empresa,sucursal_busqueda,tamano_pagina,_numero_pagina,callback){ 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            cod_empresa:empresa?empresa.cod_empresa:'',
            sucursal_busqueda
        })
    }
    fetch(URL+'/empresa_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        }) 
}

function fetchRelacionarSucursal(empresa,sucursal,estado,callback){ 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_empresa:empresa?empresa.cod_empresa:'',
            cod_sucursal: sucursal.cod_sucursal,
            estado
        })
    }
    fetch(URL+'/empresa_api/save_sucursal_empresa', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        }) 
}



function CambiarImagen() {
    document.getElementById('url_imagen_previa').src = document.getElementById('url_imagen').files[0].path
}

function CambiarImagenImpresion(){
    document.getElementById('url_imagen_impresion_previa').src = document.getElementById('url_imagen_impresion').files[0].path
}


function InsertarRelacion(empresa,sucursal){
    var estado = $("#"+sucursal.cod_sucursal).val()
    fetchRelacionarSucursal(empresa,sucursal,estado,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            empresas()
        }
    }) 

}


function Buscar(empresa,pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const sucursal_busqueda = document.getElementById('sucursal_busqueda').value.toUpperCase()
    fetchSucursales(empresa,sucursal_busqueda,tamano_pagina,pagina_actual,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTablaSucursales(empresa,res.sucursales,paginas,pagina_actual)) 
        }
    })
}

function ValidarDimensionesImagen(callback){
    var image = null 
    var file = null
    var _URL = window.URL || window.webkitURL

    if ((file = document.getElementById('url_imagen_impresion').files[0])) {
        image = new Image();
        image.onload = function() {
            if(this.width==192 && this.height==192){
                callback('ACEPTADO') 
            }else{
                callback('RECHAZADO')
            }            
        };
        image.src = _URL.createObjectURL(file);
    }else{
        callback('VACIO')
    }
}

function Guardar(e) {

    var props = {
        'cod_empresa':{},
        'nombre_corto':{},
        'razon_social':{}
    }
 
    ValidarDimensionesImagen(function(variable){
        if(variable!="RECHAZADO" && !Validar(props)){
            Guardar_(e,variable)
        }else{
            alert("El tamaño de la imagen de impresion no es permitido debe tener las dimensiones de 192 X 192. Se procedera a guardar la informacion sin la imagen de impresion","Mensaje Informacion")
            Guardar_(e,variable)
        }
         
    })
}


function Guardar_(e,flag_dimension){
    ShowLoader()
 
    const cod_empresa = e?e.cod_empresa:$("#cod_empresa").val().toUpperCase()
    const nombre_corto = $("#nombre_corto").val().toUpperCase()
    const razon_social = $("#razon_social").val().toUpperCase()
    const descripcion = $("#descripcion").val().toUpperCase()
    const direccion = $("#direccion").val().toUpperCase()
    const telefono1 = $("#telefono1").val().toUpperCase()
    const telefono2 = $("#telefono2").val().toUpperCase()
    const correo = $("#correo").val()
    const pagina_actual = $("#pagina_web").val().toUpperCase()
    const url_imagen = document.getElementById('url_imagen').files.length > 0 ? document.getElementById('url_imagen').files[0].path : ''
    const imagen_anterior = e ? e.url_imagen : ''
    const url_imagen_impresion = flag_dimension!="ACEPTADO"?"":document.getElementById('url_imagen_impresion').files.length > 0 ? document.getElementById('url_imagen_impresion').files[0].path : ''
    const imagen_anterior_impresion = e ? e.url_imagen_impresion : ''
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
    
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_empresa,
            nombre_corto, 
            razon_social,
            descripcion,
            direccion,
            telefono1,
            telefono2,
            correo,
            pagina_actual,
            url_imagen,
            imagen_anterior,
            url_imagen_impresion,
            imagen_anterior_impresion,
            estado
        })
    }
    fetch(URL+'/empresa_api/save_empresa', parametros)
        .then(req => req.json())
        .then(res => {
            HideLoader()
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                empresas()
            }
             
        })
}

function Eliminar(empresa) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_empresa = empresa.cod_empresa
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_empresa
            })
        }
        fetch(URL+'/empresa_api/delete_empresa', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    empresas()
                }   
                HideLoader()
            })
    }
}

/*function AgregarSerie(documento,s){
    nuevaserie(documento,s)
}*/

function nuevaEmpresa(empresa,_numero_pagina) {
    ShowLoader()
    HideLoader()
    const tamano_pagina = 5
    fetchSucursales(empresa,'',tamano_pagina,_numero_pagina,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)
            Ver(empresa,res.sucursales,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { nuevaEmpresa }