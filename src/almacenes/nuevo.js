var yo = require('yo-yo')
var empty = require('empty-element');
import { almacenes } from './index'
function Ver(almacen) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${almacen ? 'Editar Almacén' : 'Nuevo Almacén' }</span>
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
                                    <input id="estado" checked="${almacen ? (almacen.estado=='ACTIVO' ? '1' : '0') : '0'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            <div class="input-field col s6  ${almacen ? 'hidden':''}">
                             <input style="text-transform: uppercase;" id="almacen_cod" value="${almacen ? almacen.almacen_cod:''}" type="text" class="validate" data-length="50">
                             <label for="almacen_cod" id="lalmacen_cod" class="active" data-error="Código mayor al permitido" data-success="">Codigo Almacén</label>
                            </div>
                            <div class="input-field col s6">
                                <input style="text-transform: uppercase;" value="${almacen ? almacen.descripcion : ''}" id="descripcion" type="text" data-length="200">
                                <label for="descripcion" id="ldescripcion" class="active" data-error="Descripción mayor al permitido" data-success="">Descripción</label>
                            </div>
                            
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <select id="tipo">
                                    <option value="PRINCIPAL" ${almacen ? almacen.tipo=="PRINCIPAL" ? 'selected': '' : ''}>PRINCIPAL</option>
                                    <option value="SECUNDARIO" ${almacen ? almacen.tipo=="SECUNDARIO" ? 'selected': '' : ''}>SECUNDARIO</option>
                                </select>
                                <label>Tipo</label>
                            </div>
                             
                        </div>
                        
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(almacen)} class="waves-effect waves-light btn">Guardar Almacén</a>
                            </div>
                            ${almacen?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(almacen)} class="waves-effect waves-light btn red lighten-3">Eliminar Almacén</a>
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
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>almacenes()}" class="collection-item">Todos los Almacenes</a>
        <a href="#!" class="collection-item active">Nuevo Almacén</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function Guardar(a) {
    var props = {
        'almacen_cod':{maxLen:50},
        'descripcion':{maxLen:200}
    }
    if(!Validar(props))
        return;

    ShowLoader()
    const almacen_id = a?a.almacen_id:-1
    const almacen_cod = $('#almacen_cod').val().toUpperCase()
    const descripcion = $('#descripcion').val().toUpperCase()
    const tipo = $('#tipo').val()
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            almacen_id,
            almacen_cod, 
            descripcion,
            tipo,
            estado
        })
    }

    fetch('http://localhost:5000/almacenes_api/save_almacen', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.almacenes.length > 0) {
                    almacenes()
                }
            }
            HideLoader()
        })
}
function Eliminar(a) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const almacen_id = a.almacen_id
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                almacen_id,
            })
        }
        fetch('http://localhost:5000/almacenes_api/delete_almacen', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletealmacen == 'Se elimino correctamente') {
                        almacenes()
                    }
                }
                HideLoader()
            })
    }
}
function nuevo(almacen) {
    ShowLoader()
    Ver(almacen)
    HideLoader()
}

export { nuevo }