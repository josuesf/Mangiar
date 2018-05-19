var yo = require('yo-yo')
var empty = require('empty-element');
import { productos } from './index'
function Ver(categorias,p) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Nuevo Producto</span>
                <div class="row">
                    <div class="row" id="box_error" style="display:none;">
                        <div class="col s12">
                        <div class="card-panel  red lighten-2">
                            <span class="white-text" id="text_error">yrty</span>
                        </div>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <div class="col s6">
                                <label>Estado</label>
                                <div class="switch">
                                    <label>
                                    Inactivo
                                    <input id="estado" ${p ? (p.estado == 'ACTIVO' ? 'checked' : '') : 'checked'} type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${p ? p.nombre : ''}" id="nombre" type="text" class="validate">
                                <label id="lnombre" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Producto</label>
                            </div>
                            <div class="input-field col s6">
                                <input value="${p ? p.cod_producto : ''}" id="cod_producto" type="text" class="validate">
                                <label id="lcod_producto" class="active" data-error="Ingrese codigo producto" data-success="Correcto">Codigo Producto</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <select id="cod_perfil">
                                    <option value=null disabled selected></option>
                                    ${categorias.map(c=>
                                    yo`<option value="${c.cod_categoria}" ${p?(p.cod_categoria==c.cod_categoria?'selected':''):''}>${c.nombre_categoria}</option>`
                                    )}
                                </select>
                                <label>Seleccione Categoria</label>
                            </div>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="row">
                            <div class="col s12 file-field input-field">
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
                            <img class="col s6 materialboxed" id="imagen_previa" src="${p ? 'public/images/' + p.imagen_url : ''}">
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <div class="col s6">
                    <a onclick=${() => Guardar(p)} class="waves-effect waves-light btn">Guardar Producto</a>
                </div>
                ${p ? yo`
                <div class="col s6">
                    <a onclick=${() => Eliminar(p)} class="waves-effect waves-light btn red lighten-3">Eliminar Producto</a>
                </div>
                `: yo``}
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${() => productos()}" class="collection-item">Atras</a>
        <a href="#!" onclick="${() => nuevo()}" class="collection-item active">Nuevo Producto</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}

function CambiarImagen() {
    document.getElementById('imagen_previa').src = document.getElementById('imagen_url').files[0].path
}

function Guardar(u) {
    var props = {
        'cod_categoria': {},
        'nombre_categoria': {},
    }
    if (!Validar(props))
        return;
    ShowLoader()
    const cod_categoria = u ? u.cod_categoria : document.getElementById('cod_categoria').value.toUpperCase()
    const nombre_categoria = document.getElementById('nombre_categoria').value.toUpperCase()
    const imagen_url = document.getElementById('imagen_url').files.length > 0 ? document.getElementById('imagen_url').files[0].path : ''
    const imagen_anterior = u ? u.imagen_url : ''
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_categoria,
            nombre_categoria, imagen_url, estado, imagen_anterior
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
function nuevo(u) {
    ShowLoader()
    const producto_id = u?u.producto_id:-1
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            producto_id,
        })
    }
    fetch('http://localhost:5000/eproductos_producto/find', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                Ver(res.categorias, u)
            }
            HideLoader()
        })
}

export { nuevo }