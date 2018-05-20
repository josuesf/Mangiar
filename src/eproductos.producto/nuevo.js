var yo = require('yo-yo')
var empty = require('empty-element');
import { productos } from './index'
var PRECIOS_ = []
function Ver(categorias,p) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
                <div class="card-content">
                    <div id="modal1" class="modal">
                        <div class="modal-content">
                            <h4>Nuevo Precio</h4>
                            <div class="row">
                                <div class="input-field col s4">
                                    <input value="" id="nombre_precio" type="text" class="validate">
                                    <label id="lnombre_precio" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Precio</label>
                                </div>
                                <div class="input-field col s4">
                                    <select id="cod_moneda">
                                        <option value="PEN" disabled selected>SOLES</option>
                                    </select>
                                    <label>Seleccione Moneda</label>
                                </div>
                                <div class="input-field col s4">
                                    <input value="" id="valor_precio" type="text" class="validate">
                                    <label id="lvalor_precio" class="active" data-error="Ejem: 10.00" data-success="Correcto">Valor Precio</label>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a href="#!" onclick="${()=>AgregarPrecio()}" class="waves-effect waves-green teal accent-4 btn">Agregar</a>
                        </div>
                    </div>
                <div class="col s12">
                    <ul class="tabs">
                        <li class="tab col s3"><a class="active" href="#tab_prin">Principal</a></li>
                        <li class="tab col s3"><a href="#tab_comb">Combinaciones</a></li>
                        <li class="tab col s3"><a href="#tab_part">Partes</a></li>
                    </ul>
                </div>
                <div id="tab_prin" class="col s12">
                    <br><br>
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
                                    <input onkeyup="${()=>GenerarCodigo()}" style="text-transform:uppercase" value="${p ? p.nombre : ''}" id="nombre" type="text" class="validate">
                                    <label id="lnombre" class="active" data-error="Ingrese nombre" data-success="Correcto">Nombre Producto</label>
                                </div>
                                <div class="input-field col s6">
                                    <input style="text-transform:uppercase" value="${p ? p.cod_producto : ''}" id="cod_producto" type="text" class="validate">
                                    <label id="lcod_producto" class="active" data-error="Ingrese codigo producto" data-success="Correcto">Codigo Producto</label>
                                </div>
                            </div>
                            <div class="row">
                                <div class="input-field col s6">
                                    <select id="cod_categoria">
                                        <option value="" disabled selected></option>
                                        ${categorias.map(c=>
                                        yo`<option value="${c.cod_categoria}" ${p?(p.cod_categoria==c.cod_categoria?'selected':''):''}>${c.nombre_categoria}</option>`
                                        )}
                                    </select>
                                    <label id="lcod_categoria">Seleccione Categoria</label>
                                </div>
                                <div class="input-field col s6">
                                    <input style="text-transform:uppercase" value="${p ? p.cod_marca : ''}" id="cod_marca" type="text" class="">
                                    <label id="" class="active"> Marca de Producto</label>
                                </div>
                            </div>
                            <div class="row">
                                <!-- <label>Precio(s)</label> -->
                                <a style="font-size:8pt;" 
                                    class="col s6 waves-effect waves-light btn white teal-text text-accent-4" 
                                    onclick="${()=>NuevoPrecio()}">
                                    <i class="material-icons left teal-text text-accent-4">add_box</i> Agregar Precio</a>
                                <table class="col s12 table">
                                    <thead>
                                        <td></td>
                                        <td><label>Nombre</label></td>
                                        <td><label>Moneda</label></td>
                                        <td><label>Valor</label></td>
                                    </thead>
                                    <tbody id="tprecios">
                                        ${PRECIOS_.map((p,i)=>
                                        yo`
                                        <tr id="${p.cod_precio}">
                                            <td>
                                                <div class="">
                                                    <a href="#!"  onclick="${()=>QuitarPrecio(p.cod_precio)}"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>
                                                    <a href="#!"  onclick="${()=>NuevoPrecio(p)}"><i class="material-icons indigo-text">edit</i></a>
                                                </div>
                                            </td>
                                            <td>${p.nombre_precio}</td>
                                            <td>SOLES</td>
                                            <td>${parseFloat(p.valor_precio).toFixed(2)}</td>
                                        </tr>
                                        `)}
                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
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
                <div id="tab_comb" class="col s12">Proximamente...</div>
                <div id="tab_part" class="col s12">Proximamente...</div>
                
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
    $('ul.tabs').tabs();
    $('.modal').modal();
}

function CambiarImagen() {
    document.getElementById('imagen_previa').src = document.getElementById('imagen_url').files[0].path
}
function NuevoPrecio(precio) {
    var cod_precio = document.getElementById('nombre_precio')
    if (precio) {
        var valor_precio = document.getElementById('valor_precio')
        cod_precio.setAttribute('disabled', '')
        cod_precio.value = precio.cod_precio
        valor_precio.value = parseFloat(precio.valor_precio).toFixed(2)
    }
    else {
        cod_precio.removeAttribute('disabled')
    }
    $('#modal1').modal('open');
}
function AgregarPrecio(){
    var props = {
        'nombre_precio': {},
        'valor_precio': {number_msg:'Ingrese monto valido'},
    }
    if (!Validar(props))
        return;
    var cod_precio = document.getElementById('nombre_precio')
    var cod_moneda = document.getElementById('cod_moneda')
    var valor_precio = document.getElementById('valor_precio')
    const nuevo_precio ={
        cod_unidad:'NIU',
        cod_precio:cod_precio.value.toUpperCase(),
        nombre_precio:cod_precio.value.toUpperCase(),
        cod_moneda:cod_moneda.value,
        valor_precio:parseFloat(valor_precio.value)
    }
    if(PRECIOS_.find(p=>p.cod_precio==cod_precio.value.toUpperCase())){
        PRECIOS_ = PRECIOS_.filter(p=>{
                if(p.cod_precio==cod_precio.value.toUpperCase()){
                    p.valor_precio = parseFloat(valor_precio.value)
                } 
                return p
            })
    }else{
        PRECIOS_ = PRECIOS_.concat(nuevo_precio)
    }
    
    $('#modal1').modal('close');
    VerTablaPrecios()
    cod_precio.value=''
    valor_precio.value=''
}

function QuitarPrecio(cod_precio){
    if(confirm('Desea eliminar este precio?')){
        PRECIOS_ = PRECIOS_.filter(p=>p.cod_precio!=cod_precio)
        VerTablaPrecios()
    }
}
function VerTablaPrecios(){
    empty(document.getElementById('tprecios'))
    PRECIOS_.map((p,i)=>
        document.getElementById('tprecios').appendChild(yo`
        <tr id="${p.cod_precio}">
            <td>
                <div class="">
                    <a href="#!" onclick="${()=>QuitarPrecio(p.cod_precio)}"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>
                    <a href="#!"  onclick="${()=>NuevoPrecio(p)}"><i class="material-icons indigo-text">edit</i></a>
                </div>
            </td>
            <td>${p.nombre_precio}</td>
            <td>SOLES</td>
            <td>${parseFloat(p.valor_precio).toFixed(2)}</td>
        </tr>
        `))
}
function GenerarCodigo(){
    var nombre_producto=document.getElementById('nombre').value
    document.getElementById('cod_producto').value = nombre_producto.substring(0,5).trim()
}
function Guardar(u) {
    var props = {
        'nombre': {},
        'cod_producto': {},
        'cod_categoria': {},
    }
    if (!Validar(props))
        return;
    if (PRECIOS_.length==0){
        NuevoPrecio()
        return;
    }
    ShowLoader()
    const producto_id = u ? u.producto_id : -1
    const nombre = document.getElementById('nombre').value.toUpperCase()
    const cod_producto = document.getElementById('cod_producto').value.toUpperCase()
    const alias = document.getElementById('nombre').value.substring(0,25).toUpperCase()
    const cod_marca = document.getElementById('cod_marca').value.toUpperCase()
    const cod_categoria = document.getElementById('cod_categoria').value.toUpperCase()
    const imagen_url = document.getElementById('imagen_url').files.length > 0 ? document.getElementById('imagen_url').files[0].path : ''
    const imagen_anterior = u ? u.imagen_url : ''
    const estado = document.getElementById('estado').checked ? 'ACTIVO' : 'INACTIVO'
    const precios = PRECIOS_
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            producto_id,nombre,cod_producto,
            alias,cod_marca,cod_categoria, 
            imagen_url, estado, imagen_anterior,
            precios
        })
    }
    fetch('http://localhost:5000/eproductos_producto/save_producto', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.productos.length > 0) {
                    productos()
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
        const producto_id = u.producto_id
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
        fetch('http://localhost:5000/eproductos_producto/delete_producto', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].respuesta == 'Se elimino correctamente') {
                        productos()
                    }
                }
                HideLoader()
            })
    }
}
function nuevo(u) {
    PRECIOS_ = []
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
                PRECIOS_ = res.precios
                Ver(res.categorias, u)
            }
            HideLoader()
        })
}

export { nuevo }