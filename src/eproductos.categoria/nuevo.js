var yo = require('yo-yo')
var empty = require('empty-element');
import { categorias } from './index'
function Ver(categoria) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Nueva Categoria</span>
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
                                    <input id="estado" ${categoria ? (categoria.estado=='ACTIVO' ? 'checked' : '') : 'checked'} type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            ${!categoria?yo`<div class="input-field col s6">
                                <input value="${categoria ? categoria.cod_categoria : ''}" id="cod_categoria" type="text" class="validate">
                                <label id="lcod_categoria" class="active" data-error="Ingrese codigo" data-success="Correcto">Codigo</label>
                            </div>`:yo``}
                            <div class="input-field col s6">
                                <input value="${categoria ? categoria.nombre_categoria : ''}" id="nombre_categoria" type="text" class="validate">
                                <label id="lnombre_categoria" class="active" data-error="Ingrese nombre valido" data-success="Correcto">Nombre Categoria</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col s6 file-field input-field">
                                <div class="btn">
                                    <span>Cargar</span>
                                    <input type="file" id="imagen_url" onchange="${CambiarImagen}">
                                </div>
                                <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <img class="col s6 materialboxed" id="imagen_previa" src="${categoria?'public/images/'+categoria.imagen_url:''}">
                        </div>
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(categoria)} class="waves-effect waves-light btn">Guardar Categoria</a>
                            </div>
                            ${categoria?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(categoria)} class="waves-effect waves-light btn red lighten-3">Eliminar Categoria</a>
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
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${()=>categorias()}" class="collection-item">Todos las categorias</a>
        <a href="#!" onclick="${()=>nuevo()}" class="collection-item active">Nueva Categoria</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}

function CambiarImagen(){
    document.getElementById('imagen_previa').src = document.getElementById('imagen_url').files[0].path
}

function Guardar(u) {
    var props = {
        'cod_categoria':{},
        'nombre_categoria':{},
    }
    if(!Validar(props))
        return;
    ShowLoader()
    const cod_categoria = u ? u.cod_categoria : document.getElementById('cod_categoria').value.toUpperCase()
    const nombre_categoria = document.getElementById('nombre_categoria').value.toUpperCase()
    const imagen_url = document.getElementById('imagen_url').files.length>0?document.getElementById('imagen_url').files[0].path:''
    const imagen_anterior = u?u.imagen_url : ''
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_categoria,
            nombre_categoria, imagen_url,estado,imagen_anterior
        })
    }
    fetch('http://localhost:5000/eproductos_categoria/save_categoria', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.categorias.length > 0) {
                    categorias()
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
        const cod_categoria = u.cod_categoria
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_categoria,
            })
        }
        fetch('http://localhost:5000/eproductos_categoria/delete_categoria', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                        categorias()
                    }
                }
                HideLoader()
            })
    }
}
function nuevo(categoria) {
    ShowLoader()
    Ver(categoria)
    HideLoader()
}

export { nuevo }