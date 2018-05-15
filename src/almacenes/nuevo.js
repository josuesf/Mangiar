var yo = require('yo-yo')
var empty = require('empty-element');
import { almacenes } from './index'
function Ver(almacen) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${almacen ? 'Editar Almacen' : 'Nuevo Almacen' }</span>
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
                            <div class="input-field col s6">
                             <input id="almacen_cod" value="${almacen.cod}" type="text" class="validate">
                             <label class="active">Codigo Almacen</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${almacen ? almacen.descripcion : ''}" id="descripcion" type="text">
                                <label for="descripcion" class="active">Descripcion</label>
                            </div>
                            
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${almacen ? almacen.tipo : ''}" id="tipo" type="text" class="validate">
                                <label for="tipo" class="active">Tipo</label>
                            </div>
                             
                        </div>
                        
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(almacen)} class="waves-effect waves-light btn">Guardar Almacen</a>
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
        <a onclick="${almacenes}" class="collection-item">Todos los Almacenes</a>
        <a href="#!" class="collection-item active">Nuevo Almacen</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function Guardar(a) {
    ShowLoader()
    const almacen_id = a?a.almacen_id:'-1'
    const almacen_cod = $('#almacen_cod').val()
    const descripcion = $('#descripcion').val()
    const tipo = $('#tipo').val()
    const estado = $('#estado').val()
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
function nuevo(almacen) {
    ShowLoader()
    Ver(almacen)
    HideLoader()
}

export { nuevo }