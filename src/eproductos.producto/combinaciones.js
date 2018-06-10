var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { productos } from './index'
var COMBINACIONES_PRODUCTO = []
var ITEMS = []
function Ver(combinaciones, combinaciones_producto, producto_id) {
    var el = yo`
    <div class="col s12">
        <div id="modalCombinaciones" class="modal col s6 modal-fixed-footer">
            <div class="modal-content">
                <h5>Combinaciones</h5>
                <div class="row">
                    <a style="font-size:8pt;" 
                    class="waves-effect waves-light btn white teal-text text-accent-4" 
                    onclick="${() => VerNuevaCombinacion()}">
                    <i class="material-icons left teal-text text-accent-4">add_box</i> Nueva Combinacion</a>
                    <ul class="collapsible" data-collapsible="accordion">
                        ${combinaciones.map(c => yo`<li>
                            <div class="collapsible-header" onclick="${() => AbrirCombinacion(c, "MOC")}">
                                <p>
                                <input onclick="${() => SeleccionarCombinacion(c, producto_id)}" type="checkbox" ${c.producto_id ? 'checked' : ''} class="filled-in" id="filled-in-box${c.combinacion_id}" />
                                <label for="filled-in-box${c.combinacion_id}"></label>
                                </p>

                                <i class="material-icons">remove_red_eye</i><a href="#!" onclick="${()=>EliminarCombinacion(c)}"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>
                                <a href="#!" onclick="${()=>VerEditarCombinacion(c)}"><i class="material-icons indigo-text">edit</i></a>${c.etiqueta_titulo}
                            </div>
                            <div class="collapsible-body" id="MOC${c.combinacion_id}">
                                
                            </div>
                        </li>`)}
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" onclick="${() => GuardarCombinaciones(producto_id)}" class="waves-effect waves-green teal accent-4 btn">Guardar</a>
            </div>
        </div>
        <div id="modalNuevaCombinacion" class="modal col s6 modal-fixed-footer">
            
        </div>
        <div id="modalAgregarItem" class="modal col s6 modal-fixed-footer">
            
        </div>
        <div id="modalSeleccionarProducto" class="modal col s6 modal-fixed-footer">
            
        </div>
        <br>
        <div class="col s8">
            
            <div class="row">
                <a style="font-size:8pt;" 
                class="waves-effect waves-light btn white teal-text text-accent-4" 
                onclick="${() => VerCombinaciones()}" id="editarCombinaciones">
                <i class="material-icons left teal-text text-accent-4">edit</i> Editar Combinaciones</a>
            </div>
            <div class="row">
                <ul class="collapsible" data-collapsible="accordion">
                    ${combinaciones_producto.map(c => yo`<li>
                        <div class="collapsible-header" onclick="${() => AbrirCombinacion(c, "COM")}">
                            <i class="material-icons">expand_more</i>${c.etiqueta_titulo}
                        </div>
                        <div class="collapsible-body" id="COM${c.combinacion_id}">
                            
                        </div>
                    </li>`)}
                </ul>
            </div>
        </div>
        <div class="col s4">
                <div class="row">
                    <i class="material-icons left deep-purple-text text-lighten-2">radio_button_checked</i> Obligatorio
                </div>
                <div class="row">
                    <i class="material-icons left deep-purple-text text-lighten-2">check_box</i> Opcionales
                </div>
                <div class="row">
                    <i class="material-icons left deep-purple-text text-lighten-2">add_box</i> Multiple
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
    $(document).ready(function () {
        $('.collapsible').collapsible();
    });
}
function SeleccionarCombinacion(c, producto_id) {
    var EstaSeleccionado = document.getElementById("filled-in-box" + c.combinacion_id).checked
    COMBINACIONES_PRODUCTO.filter(com => {
        if (com.combinacion_id == c.combinacion_id) {
            com.producto_id = EstaSeleccionado ? producto_id : null
        }
        return com;
    })
}

function EliminarCombinacion(combinacion){
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const combinacion_id = combinacion.combinacion_id
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                combinacion_id,
            })
        }
        fetch(URL+'/eproductos_combinacion/delete_combinacion', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    $('#modalNuevaCombinacion').modal('close');
                    $('#modalCombinaciones').modal('close');
                   combinaciones(PRODUCTO_ID_G, true)
                }
                HideLoader()
            })
        
    }
}

function GuardarCombinaciones(producto_id) {
    console.log(COMBINACIONES_PRODUCTO.filter(c => c.producto_id != null))
    ShowLoader()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            combinaciones_producto: COMBINACIONES_PRODUCTO.filter(c => c.producto_id != null),
            producto_id
        })
    }
    fetch(URL+'/eproductos_producto/save_combinaciones_producto', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                console.log(res.err)
            } else {
                $('#modalCombinaciones').modal('close');
                combinaciones(producto_id)
            }
            HideLoader()
        })
}
function VerEditarCombinacion(combinacion){
    var combinacion_id  = combinacion.combinacion_id
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            combinacion_id
        })
    }
    fetch(URL+'/eproductos_combinacion/get_combinacion_detalle', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                var it = res.items 
                ITEMS = []
                for(var i = 0 ; i < it.length ; i++){
                    var e = it[i]
                    var dic = {
                        'detalle_id': e.detalle_id,
                        'producto_id': e.producto_id,
                        'nombre_producto': e.nombre_producto + (e.producto_id?' - ' +e.producto_id:''),
                        'cod_moneda': e.cod_moneda,
                        'precio': e.precio
                    }
                    ITEMS.push(dic)
                }
                console.log(ITEMS)
                VerNuevaCombinacion(combinacion)
            }
            HideLoader()
        })
}

function VerCombinaciones() {
    $('#modalCombinaciones').modal('open');
}

function hideAlMenos(){
    var tipo = document.getElementById('tipo_combinacion').value
    var cant = document.getElementById('input_cantidad_minima')
    if(tipo == 'OBLIGATORIO'){
        cant.classList.add('hide')
    }else{
        cant.classList.remove('hide')
    }
}



function VerNuevaCombinacion(combinacion){
    $('#modalNuevaCombinacion').modal('open');
    if(combinacion == undefined)
        ITEMS = []
    var el = yo`
    <div>
        <div class="modal-content">
            <h5>${combinacion?'Editar':'Nueva'} Combinacion</h5>
            <div class="row">
                <div class="input-field col s12">
                    <input value="${combinacion ? combinacion.etiqueta_titulo : ''}" id="etiqueta_titulo" type="text" class="validate" placeholder="Elije sabores">
                    <label for="etiqueta_titulo" class="active" id="letiqueta_titulo">Etiqueta</label>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select id="tipo_combinacion" onchange="${(ev)=>hideAlMenos()}">
                        <option value="OBLIGATORIO" ${combinacion? combinacion.cantidad_maxima==0?'selected':'':'selected'}>Obligatorio</option>
                        <option value="OPCIONAL" ${combinacion? combinacion.cantidad_maxima==1?'selected':'':''}>Opcionales</option>
                        <option value="MULTIPLE" ${combinacion? combinacion.cantidad_maxima>=2?'selected':'':''}>Multiple</option>
                    </select>
                    <label>Tipo de combinacion</label>
                </div>
                <div class="input-field col s6" id="input_cantidad_minima">
                    <input value="${combinacion ? combinacion.cantidad_minima : ''}" id="cantidad_minima" type="text" class="validate" placeholder="Ejmp. 1, 2, 3">
                    <label for="cantidad_minima" class="active" id="lcantidad_minima">Seleccione al menos</label>
                </div>
            </div>
            <div class="row">
                <a style="font-size:8pt;" class="waves-effect waves-light btn white teal-text text-accent-4" 
                onclick="${() => VerAgregarItem()}">
                <i class="material-icons left teal-text text-accent-4">add</i> Agregar item</a>
            </div>
            <div id="tableItems">
                <table class="col s12 table">
                    <thead>
                        <td></td>
                        <td><label>Nombre</label></td>
                        <td><label>Moneda</label></td>
                        <td><label>Valor</label></td>
                    </thead>
                    <tbody id="titems">
                        ${ITEMS.map((it,i)=>
                        yo`
                        <tr id="${it.detalle_id}">
                            <td>
                                <div class="">
                                    <a href="#!" onclick="${()=>EliminarItem(it,i)}"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>
                                    <a href="#!" onclick="${()=>VerAgregarItem(it,i)}"><i class="material-icons indigo-text">edit</i></a>
                                </div>
                            </td>
                            <td>${it.nombre_producto}</td>
                            <td>SOLES</td>
                            <td>${parseFloat(it.precio).toFixed(2)}</td>
                        </tr>
                        `)}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" onclick="${()=>GuardarCombinacion(combinacion)}" class="waves-effect waves-green teal accent-4 btn">Guardar</a>
            <a href="#!" onclick="${()=>$('#modalNuevaCombinacion').modal('close')}" class="waves-effect waves-green red btn">Cancelar</a>
        </div>
    </div>
    `
    var container = document.getElementById('modalNuevaCombinacion')
    empty(container).appendChild(el);
    $('select').material_select();
    hideAlMenos()
}

function GuardarCombinacion(combinacion){
    var props = {
        'etiqueta_titulo': {},
    }
    if (!Validar(props) || ITEMS.length == 0)
        return;
    var combinacion_id = combinacion? combinacion.combinacion_id : -1
    var etiqueta_titulo = document.getElementById('etiqueta_titulo').value
    var cantidad_minima = document.getElementById('tipo_combinacion').value == 'OBLIGATORIO'? 1 : parseInt(document.getElementById('cantidad_minima').value)
    var cantidad_maxima = document.getElementById('tipo_combinacion').value == 'OBLIGATORIO'? 0 : document.getElementById('tipo_combinacion').value == 'OPCIONAL'? 1 : 50
    var estado = 'ACTIVO'

    for(var i = 0 ; i < ITEMS.length ; i++){
        if(ITEMS[i].producto_id != null){
            ITEMS[i].nombre_producto = ITEMS[i].nombre_producto.split(' - ')[0]
        }
    }
    console.log(ITEMS)
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            combinacion_id,
            etiqueta_titulo,
            cantidad_maxima,
            cantidad_minima,
            estado,
            ITEMS
        })
    }
    fetch(URL+'/eproductos_combinacion/save_combinacion', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                $('#modalNuevaCombinacion').modal('close');
                $('#modalCombinaciones').modal('close');
                combinaciones(PRODUCTO_ID_G,true);
            }
            HideLoader()
        })

}

function AbrirCombinacion(c, id_seccion) {
    const combinacion_id = c.combinacion_id
    var combinacion = document.getElementById(id_seccion + c.combinacion_id)
    var icono = ''
    if (parseInt(c.cantidad_maxima) == 0) {
        icono = 'radio_button_checked'
    } else if (parseInt(c.cantidad_maxima) == 1) {
        icono = 'check_box'
    } else {
        icono = 'add_box'
    }
    empty(combinacion)
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            combinacion_id
        })
    }
    fetch(URL+'/eproductos_producto/get_combinacion_detalle', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                //mostrar error
                console.log(res.err)
            } else {
                const combinacion_detalle = res.com_detalle
                combinacion.appendChild(yo`
                <table>
                    ${combinacion_detalle.map(d => yo`
                        <tr>
                            <td><i class="deep-purple-text text-lighten-2 material-icons">${icono}</i></td>
                            <td>${d.nombre_producto}</td>
                            <td>S/${parseFloat(d.precio).toFixed(2)}</td>
                        </tr>
                    `)}
                </table>
                `);
                if (id_seccion == 'ME') {
                    combinacion.appendChild(yo`
                <a style="font-size:8pt;" 
                class="waves-effect waves-light btn white red-text text-darken-2" 
                onclick="${() => EliminarCombinacion(combinacion_id)}">
                <i class="material-icons left red-text text-darken-2">delete</i> Eliminar Combinacion</a>
                `);
                }

            }
            // HideLoader()
        })


}

function EliminarItem(it, i){
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        if(it.detalle_id != -1){
            const detalle_id = it.detalle_id
            const parametros = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    detalle_id,
                })
            }
            fetch(URL+'/eproductos_combinacion/delete_combinacion_detalle', parametros)
                .then(req => req.json())
                .then(res => {
                    if (res.err) {
                        $('#text_error').text(res.err)
                        $('#box_error').show()
                    } else {
                        ITEMS.splice(i,1)
                        reloadTableItems()
                    }
                    HideLoader()
                })
        }else{
            ShowLoader()
            ITEMS.splice(i,1)
            reloadTableItems()
            HideLoader()
        }
    }
}
function VerAgregarItem(item,i){
    $('#modalAgregarItem').modal('open')
    var el = yo`
    <div>
        <div class="modal-content">
            <h5>${item?'Editar':'Agregar'} Item</h5>
            <div class="row">
                    <div class="input-field col s6">
                        <input type="text" value="${item? item.nombre_producto:''}" id="nombre_producto" style="text-transform:uppercase">
                        <label for="nombre_producto" class="active" id="lnombre_producto">Nombre del item</label>
                    </div>
                <div class="col s6">
                    <a href="#!" onclick="${()=>VerSeleccionarProducto()}" class="waves-effect waves-green teal accent-4 btn">Sel. Producto</a>
                </div>
            </div>
            <div class="row">
                <div class="input-field col s6">
                    <select id="cod_moneda">
                        <option value="PEN" selected>Soles</option>
                    </select>
                    <label>Tipo de moneda</label>
                </div>
                <div class="input-field col s6">
                    <input value="${item? item.precio:''}" id="precio" type="text" class="validate">
                    <label for="precio" id="lprecio" class="active" data-error="Ejem: 10.00" data-success="Correcto">Valor Precio</label>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <a href="#!" onclick="${()=>guardarItem(item,i)}" class="waves-effect waves-green teal accent-4 btn">${item? 'Guardar':'Agregar'}</a>
            <a href="#!" onclick="${()=>$('#modalAgregarItem').modal('close')}" class="waves-effect waves-green red btn">Cancelar</a>
        </div>
    </div>
    `
    function guardarItem(item){
        var props = {
            'nombre_producto': {},
            'precio': {}
        }
        if (!Validar(props))
            return;
        
        var selpe = midata[document.getElementById('nombre_producto').value]
        var it = {
            'detalle_id':item?item.detalle_id:-1,
            'nombre_producto': document.getElementById('nombre_producto').value.toUpperCase(),
            'cod_moneda': document.getElementById('cod_moneda').value,
            'precio': parseFloat(document.getElementById('precio').value).toFixed(2)
        }
        if(selpe != undefined){
            it['producto_id'] = selpe.producto_id
        }else{
            it['producto_id'] = null
        }
        if(item){
            ITEMS[i] = it
        }else{
            ITEMS.push(it)
        }
        reloadTableItems()
        $('#modalAgregarItem').modal('close')
    }

    var container = document.getElementById('modalAgregarItem')
    empty(container).appendChild(el);
    $('select').material_select();
    var midata = {}
    
    function VerSeleccionarProducto(){
        $('#modalSeleccionarProducto').modal('open')
        var el = yo`
        <div>
            <div class="modal-content">
                <h5>Seleccione el Producto</h5>
                <br>
                <br>
                <div class="row">
                    <div class="input-field col s12">
                        <input type="text" id="nombre_producto_sel" style="text-transform:uppercase" class="autocomplete">
                        <label for="nombre_producto_sel" class="active" id="lnombre_producto_sel">Busque el producto</label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <a href="#!" onclick="${()=>SeleccionarProducto()}" class="waves-effect waves-green teal accent-4 btn">Seleccionar</a>
                <a href="#!" onclick="${()=>$('#modalSeleccionarProducto').modal('close')}" class="waves-effect waves-green red btn">Cancelar</a>
            </div>
        </div>
        `
        var container = document.getElementById('modalSeleccionarProducto')
        empty(container).appendChild(el);
    
        function SeleccionarProducto(){
            var props = {
                'nombre_producto_sel': {},
            }
            if (!Validar(props))
                return;
            
            var selpe = midata[document.getElementById('nombre_producto_sel').value]
            if(selpe != undefined){
                var nombre = document.getElementById('nombre_producto_sel').value
                document.getElementById('nombre_producto').value = nombre;
                document.getElementById('lnombre_producto').classList.add('active');
                document.getElementById('precio').value = parseFloat(selpe.valor_precio).toFixed(2);
                document.getElementById('lprecio').classList.add('active');
                $('#modalSeleccionarProducto').modal('close')
            }
        }
    
        
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
            
        }
        
        fetch(URL+'/eproductos_producto/get_all_productos', parametros)
            .then(req => req.json())
            .then(res => {
                var pro = res.productos
                var data = {}
                for(var i = 0 ; i < pro.length ; i++){
                    var p = pro[i]
                    midata[p.nombre+" - "+p.producto_id] = p
                    data[p.nombre+" - "+p.producto_id] = null
                }
                $('input.autocomplete').autocomplete({
                    data,
                    limit: 5, 
                    minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
                  });
    
            })
    }
}

function reloadTableItems(){
    var table = yo`<table class="col s12 table">
    <thead>
        <td></td>
        <td><label>Nombre</label></td>
        <td><label>Moneda</label></td>
        <td><label>Valor</label></td>
    </thead>
    <tbody id="titems">
        ${ITEMS.map((it,i)=>
        yo`
        <tr id="${it.detalle_id}">
            <td>
                <div class="">
                    <a href="#!" onclick="${()=>EliminarItem(it,i)}"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>
                    <a href="#!"  onclick="${()=>VerAgregarItem(it,i)}"><i class="material-icons indigo-text">edit</i></a>
                </div>
            </td>
            <td>${it.nombre_producto}</td>
            <td>SOLES</td>
            <td>${parseFloat(it.precio).toFixed(2)}</td>
        </tr>
        `)}
    </tbody>
</table>`
    var container = document.getElementById('tableItems')
    empty(container).appendChild(table);
}

function VerTablaPrecios() {
    empty(document.getElementById('tprecios'))
    PRECIOS_.map((p, i) =>
        document.getElementById('tprecios').appendChild(yo`
        <tr id="${p.cod_precio}">
            <td>
                <div class="">
                    <a href="#!" onclick="${() => QuitarPrecio(p.cod_precio)}"><i class="material-icons red-text text-darken-1">indeterminate_check_box</i></a>
                    <a href="#!"  onclick="${() => NuevoPrecio(p)}"><i class="material-icons indigo-text">edit</i></a>
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
    if (PRECIOS_.length == 0) {
        NuevoPrecio()
        return;
    }
    ShowLoader()
    const producto_id = u ? u.producto_id : -1
    const nombre = document.getElementById('nombre').value.toUpperCase()
    const cod_producto = document.getElementById('cod_producto').value.toUpperCase()
    const alias = document.getElementById('nombre').value.substring(0, 25).toUpperCase()
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
            producto_id, nombre, cod_producto,
            alias, cod_marca, cod_categoria,
            imagen_url, estado, imagen_anterior,
            precios
        })
    }
    fetch(URL+'/eproductos_producto/save_producto', parametros)
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
        fetch(URL+'/eproductos_producto/delete_producto', parametros)
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
var PRODUCTO_ID_G;
function combinaciones(producto_id,modalopen) {
    PRODUCTO_ID_G = producto_id
    ShowLoader()
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
    fetch(URL+'/eproductos_producto/get_combinaciones', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                //mostrar error
                console.log(res.err)
            } else {
                COMBINACIONES_PRODUCTO = res.combinaciones
                Ver(res.combinaciones, res.combinaciones_producto, producto_id)
                if(modalopen){
                    document.getElementById("editarCombinaciones").click()
                }
            }
            HideLoader()
        })
}

export { combinaciones }