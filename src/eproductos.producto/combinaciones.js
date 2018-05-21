var yo = require('yo-yo')
var empty = require('empty-element');
import { productos } from './index'
function Ver() {
    var el = yo`
    <div>
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
        <div class="col s7">
            <div class="card">
                <div class="card-stacked">
                    <div class="card-content">
                        <span>Combinaciones</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s5">
            <div class="card">
                <div class="card-stacked">
                    <div class="card-content">
                        <span>Combinaciones</span>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    var container = document.getElementById('tab_comb')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${() => productos()}" class="collection-item">Atras</a>
        <a href="#!" onclick="${() => nuevo()}" class="collection-item active">Nuevo Producto</a>
    </div>
        `;
    $('.modal').modal();
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
function combinaciones(producto_id) {
    ShowLoader()
    Ver()
    HideLoader()
    // const producto_id = u?u.producto_id:-1
    // const parametros = {
    //     method: 'POST',
    //     headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         producto_id,
    //     })
    // }
    // fetch('http://localhost:5000/eproductos_producto/find', parametros)
    //     .then(req => req.json())
    //     .then(res => {
    //         if (res.err) {
    //             $('#text_error').text(res.err)
    //             $('#box_error').show()
    //         } else {
    //             PRECIOS_ = res.precios
    //             Ver(res.categorias, u)
    //         }
    //         HideLoader()
    //     })
}

export { combinaciones }