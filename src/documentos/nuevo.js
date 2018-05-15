var yo = require('yo-yo')
var empty = require('empty-element');
import { documentos } from './index'
function Ver(documento) {
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
        <a onclick="${documentos}" class="collection-item">Todos los Documentos</a>
        <a href="#!" class="collection-item active">Nuevo Documento</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
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
function nuevo(documento) {
    ShowLoader()
    Ver(documento)
    HideLoader()
}

export { nuevo }