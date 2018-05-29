var yo = require('yo-yo')
var empty = require('empty-element');
//var htmlToPdf = require('html-to-pdf');
import { Init,onActionLeft,onActionRight } from '../utils'

var contador = 0
 
function Ver(puntos_venta) {

    var rows = puntos_venta.length
    var el = ''
    if(rows<=4){
        el = yo`
        <div>
            <div class="row">
                ${puntos_venta.map(e=>yo` 
                        <div class="col m3"> 
                            <div class="card-container manual-flip">
                                <div class="card">
                                    <div class="front" title="${e.estado_accion}">
                                        <div class="header">
                                            <h5 class="motto">Punto de Venta</h5>
                                        </div>
                                        
                                        <div class="content">
                                            <div class="main">
                                                ${e.Nro_Cuentas>0?yo`
                                                    <div class="yellow ball-animation" style="text-align: -webkit-center;text-align: center;">
                                                        <h4 style="display:inline-block;">${e.Nro_Cuentas}</h4>
                                                    </div>`:yo`
                                                    <div class="yellow ball" style="text-align: -webkit-center;text-align: center;">
                                                        <h4 style="display:inline-block;"><i class="material-icons">airplay</i></h4>
                                                    </div>` 
                                                }
                                                <h3 class="name">${e.nombre_mesa}</h3>
                                                <p class="center white-text">${e.Mesero}</p>
                                            </div>
                                            <div id=${e.cod_mesa} class="footer" style="cursor:pointer" onclick=${()=>RotarCard(e.cod_mesa)}>
                                                Ver Detalles                                
                                            </div>
                                        </div>
                                    </div> 
                                    <div class="back" title="${e.estado_accion}">
                                        <div class="header">
                                            <h5 class="motto">Descripción</h5>
                                        </div>
                                        <div class="content">
                                            <div class="main">
                                                <div class="row">
                                                    <div class="col m12">
                                                        <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=${()=>VerDetalles(e,"R")}><i class="material-icons left">receipt</i> Comprobante</a>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col m12">
                                                        <a class="waves-effect  yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=${()=>VerDetalles(e,"D")}><i class="material-icons left">format_list_bulleted</i> Detalles</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="footer" style="cursor:pointer" onclick=${()=>RotarCard(e.cod_mesa)}>
                                                Atras
                                            </div>
                                        </div>
                                    </div>  
                                </div> 
                            </div>
                        </div>
                        `)}
            </div>
        </div>`; 
        //const numeroFilas = Math.floor(paginas/4) 
        
        var container = document.getElementById('contenido_principal')
        empty(container).appendChild(el);
        var sub_nav = yo `
        <div class="collection">
            <a href="#!" class="collection-item active">Todas las mesas</a>
            <a href="#!" class="collection-item">Mesas Ocupadas</a>
            <a href="#!" class="collection-item">Mesas Libres</a>
        </div>`;
    }else{
        var numero_filas = Math.trunc(rows/4)
        var sobrante = rows % 4
        el = yo`
        <div>
            ${Array.apply(null,Array(numero_filas)).map((a,x)=>yo`
                <div class="row">
                    ${puntos_venta.map((e,y)=>
                        y<((x+1)*4)?yo` 
                            <div class="col m3"> 
                                <div class="card-container manual-flip">
                                    <div class="card">
                                        <div class="front" title="${e.estado_accion}">
                                            <div class="header">
                                                <h5 class="motto">Punto de Venta</h5>
                                            </div>
                                            
                                            <div class="content">
                                                <div class="main">
                                                    ${e.Nro_Cuentas>0?yo`
                                                        <div class="yellow ball-animation" style="text-align: -webkit-center;text-align: center;">
                                                            <h4 style="display:inline-block;">${e.Nro_Cuentas}</h4>
                                                        </div>`:yo`
                                                        <div class="yellow ball" style="text-align: -webkit-center;text-align: center;">
                                                            <h4 style="display:inline-block;"><i class="material-icons">airplay</i></h4>
                                                        </div>` 
                                                    }
                                                    <h3 class="name">${e.nombre_mesa}</h3>
                                                    <p class="center white-text">${e.Mesero}</p>
                                                </div>
                                                <div id=${e.cod_mesa} class="footer" style="cursor:pointer" onclick=${()=>RotarCard(e.cod_mesa)}>
                                                    Ver Detalles                                
                                                </div>
                                            </div>
                                        </div> 
                                        <div class="back" title="${e.estado_accion}">
                                            <div class="header">
                                                <h5 class="motto">Descripción</h5>
                                            </div>
                                            <div class="content">
                                                <div class="main">
                                                    <div class="row">
                                                        <div class="col m12">
                                                            <a class="waves-effect yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=${()=>VerDetalles(e,"R")}><i class="material-icons left">receipt</i> Comprobante</a>
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col m12">
                                                            <a class="waves-effect  yellow black-text btn btn-small btn-block" style="font-size: 12px;width: 100%;padding: 0 0.5rem;" onclick=${()=>VerDetalles(e,"D")}><i class="material-icons left">format_list_bulleted</i> Detalles</a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="footer" style="cursor:pointer" onclick=${()=>RotarCard(e.cod_mesa)}>
                                                    Atras
                                                </div>
                                            </div>
                                        </div>  
                                    </div> 
                                </div>
                            </div>
                            `:yo``)}
                </div>`
            )}
           
        </div>`; 
        //const numeroFilas = Math.floor(paginas/4) 
        
        var container = document.getElementById('contenido_principal')
        empty(container).appendChild(el);
        var sub_nav = yo `
        <div class="collection">
            <a href="#!" class="collection-item active">Todas las mesas</a>
            <a href="#!" class="collection-item">Mesas Ocupadas</a>
            <a href="#!" class="collection-item">Mesas Libres</a>
        </div>`;

    }
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav) 
    //$(".dropdown-button").dropdown();
}
 
function VerDetalleSeleccion(){
    var el = yo`
    <div class="card">
        <div class="card-content">
            <span class="card-title center">Detalle del pedido 0001</span> 
            <div class="row">
                <div class="col m8">
                    <div class="row">
                        <div class="col s7 m7 offset-m3 persp">
                            <div class="card first">
                                <div class="card-image">
                                <img src="https://materializecss.com/images/sample-1.jpg">
                                <span class="card-title">Card Title</span>
                                </div>
                                <div class="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div class="card-action center">
                                    <a class="btn-floating btn-large waves-effect waves-light red darken-1"><i class="material-icons">close</i></a>
                                    <a class="btn-floating btn-large waves-effect waves-light green darken-1" onclick=${()=>Aceptar()}><i class="material-icons">check</i></a>
                                </div>
                            </div>
                            
                            <div class="card second">
                                <div class="card-image">
                                <img src="https://materializecss.com/images/office.jpg">
                                <span class="card-title">Card Title</span>
                                </div>
                                <div class="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div class="card-action center">
                                    <a class="btn-floating btn-large waves-effect waves-light red darken-1"><i class="material-icons">close</i></a>
                                    <a class="btn-floating btn-large waves-effect waves-light green darken-1" onclick=${()=>Aceptar()}><i class="material-icons">check</i></a>
                                </div>
                            </div>
                            <div class="card third">
                                <div class="card-image">
                                <img src="https://materializecss.com/images/office.jpg">
                                <span class="card-title">Card Title</span>
                                </div>
                                <div class="card-content">
                                <p>I am a very simple card. I am good at containing small bits of information.
                                I am convenient because I require little markup to use effectively.</p>
                                </div>
                                <div class="card-action center">
                                    <a class="btn-floating btn-large waves-effect waves-light red darken-1"><i class="material-icons">close</i></a>
                                    <a class="btn-floating btn-large waves-effect waves-light green darken-1" onclick=${()=>Aceptar()}><i class="material-icons">check</i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col m4">
                    <div class="row center">
                        <h5 class="header">Platillos y/o bebidas</h5>
                    </div>
                    <div class="row">
                        <div class="collection">
                            <a href="#!" class="collection-item">Alvin</a>
                        </div>
                    </div>
                </div>
            </div>              
        </div> 
    </div>`
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
}

function VerSeleccionCuentas(cuentas,tipo){
    var el = yo`
        <div>
            <div class="modal-content">
                <div class="row center">
                    <h5 class="header">Elige una cuenta</h5>
                </div>
                <div class="row">
                    <div class="collection">
                        ${cuentas.map((e,i)=>yo` 
                            <a href="javascript:void(0);" class="collection-item" onclick=${()=>SeleccionarCuenta(e,tipo)}><i class="material-icons left">label_outline</i> CUENTA : ${i}</a>
                        `)}
                    </div>
                </div>
            </div>
        </div>
        `
        var container = document.getElementById('modal-details')
        empty(container).appendChild(el);
        $('#modal-details').modal();
        $('#modal-details').modal('open');
}

function VerInvoice(pedido_detalle){
    const idFila = contador
    try{
        $('#modal-details').modal('close');
    }catch(e){}

    var el = yo` 
        <div class="card">
            <div class="card-content">
                <div class="row">
                    <div class="col m12 s12">
                        <div class="row">
                            <div class="col s8 m8">
                                <div class="row">
                                    <div class="input-field col s6">
                                        <select id="tipo_doc_ident" onchange="${()=>CambioTipoDoc()}">
                                            <option value="DNI" ${pedido_detalle[0].tipo_doc_ident=="DNI"?'selected':''}>DNI</option>
                                            <option value="RUC" ${pedido_detalle[0].tipo_doc_ident=="RUC"?'selected':''}>RUC</option>
                                        </select>
                                        <label class="active">Tipo Documento</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" value="${pedido_detalle[0].doc_ident}">
                                        <label class="active">Nro. Doc.</label>
                                    </div>
                                </div>
                                <div class="row" id="divRazonSocial" style="display:none">
                                    <div class="input-field col s12">
                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" value="${pedido_detalle[0].razon_social}">
                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tamaño permitido" data-success="">Razon Social</label>
                                    </div>
                                </div>
                                <div class="row" id="divNombres">
                                    <div class="input-field col s12">
                                        <div class="row">
                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40" value="${pedido_detalle[0].nombres}">
                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tamaño permitido" data-success="">Nombres</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row" id="divApellidos">
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30" value="${pedido_detalle[0].a_paterno}">
                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30" value="${pedido_detalle[0].a_materno}">
                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>
                                    </div>
                                </div> 

                                <div class="row">
                                    <div class="input-field col s12">
                                        <div class="row">
                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate" value="${pedido_detalle[0].direccion}">
                                            <label class="active">Direccion</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col s4 m4 right">
                                <div class="card grey lighten-4">
                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col s12 m12 center">
                                                <h5 id="tituloComprobante">COMPROBANTE</h5>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col s12 m12" id="divTipoComprobante">
                                                <select id="cod_documento">
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col s6 m6" id="divSeries">
                                                <select id="nro_serie"> 
                                                </select>
                                            </div>
                                            <div class="col s6 m6">
                                                <input style="text-transform: uppercase;"  id="numero" type="number" class="validate" val="0">
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="input-field col s12">
                                                <input value="" id="fecha" type="text" class="datepicker">
                                                <label for="fecha" class="active">Fecha</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="row">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Moneda</th>
                                <th class="center">Precio</th>
                                <th class="center">Total</th>
                            </tr>
                        </thead>
                        <tbody id="bodyComprobante">
                            ${pedido_detalle.map(e=>yo` 
                                <tr id="${idFila}-${e.producto_id}">
                                    <td><input style="text-transform: uppercase;" type="text" class="validate" value="${e.descripcion_detalle}" disabled></td>
                                    <td class="Cantidad"><input style="text-transform: uppercase;" type="number" class="validate" value="${parseFloat(e.cantidad).toFixed(2)}" onkeyup="${()=>CambioCelda(pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD ",idFila+"-"+e.producto_id)}"></td>
                                    <td class="Moneda"><input style="text-transform: uppercase;" type="text" class="validate" value="${e.cod_moneda=='PEN'?'S/ ':'USD'}" disabled></td>
                                    <td class="Precio"><input style="text-transform: uppercase;" type="number" class="validate" value="${e.precio}" onkeyup="${()=>CambioCelda(pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD ",idFila+"-"+e.producto_id)}"></td>
                                    <td class="Total"><input style="text-transform: uppercase;" type="number" class="validate" value="${(parseFloat(e.cantidad)*parseFloat(e.precio)).toFixed(2)}" disabled></td>
                                </tr>
                            `)}
                        </tbody>
                        <tbody>
                            
                            <tr>
                                <td>   </td>
                                <td>   </td>
                                <td class="right">
                                    <p>
                                        <strong>Subtotal: </strong>
                                    </p>
                                    <p>
                                        <strong>Descuento: </strong>
                                    </p>
                                </td>
                                <td class="center">
                                    <p>
                                        <strong id="SumaTotal">${pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD "}${parseFloat(pedido_detalle[0].total).toFixed(2)}</strong>
                                    </p>
                                    <p>
                                    <strong id="Descuento" contenteditable="true" onkeyup="${()=>CambioDescuento(pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD ")}">${pedido_detalle[0].descuento=="" || pedido_detalle[0].descuento==null || empty(pedido_detalle[0].descuento)?"0":pedido_detalle[0].descuento}</strong>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>   </td>
                                <td>   </td>
                                <td class="right"><h5><strong>Total: </strong></h5></td>
                                <td class="center"><h5><strong id="totalGlobal">${pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD "}${parseFloat(pedido_detalle[0].total).toFixed(2)}</strong></h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <a class="waves-effect grey darken-4 btn" onclick=${()=>AceptarPedido(pedido_detalle)}><i class="material-icons left">check</i>Aceptar</a>
                </div>
            </div>
        </div>
        `
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el) 
    $('select').material_select()
    TraerTiposComprobantes(pedido_detalle[0].cod_sucursal)

    $('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200, 
        format: 'dd-mm-yyyy'
    });
    var $input = $('#fecha').pickadate()
    var picker = $input.pickadate('picker')
    picker.set('select', new Date())
    CambioTipoDoc()
}

function LlenarTipoDocumentos(documentos){
    var el = yo`
        <select id="cod_documento">
        ${documentos.map(e => yo`
             <option value="${e.cod_documento}" onchange=${()=>TraerSeriesNumeros(e.cod_documento)}>${e.descripcion_doc}</option>
        `)}
        </select>` 
        
    var container = document.getElementById('divTipoComprobante')
    empty(container).appendChild(el)
    $('select').material_select()
}


function LlenarSeries(series){
    var el = yo`
        <select id="nro_serie">
        ${series.map(e => yo`
             <option value="${e.nro_serie}">${e.nro_serie}</option>
        `)}
        </select>`  
        
    var container = document.getElementById('divSeries')
    empty(container).appendChild(el)
    $('select').material_select()
}

function CambioCelda(moneda,idTR){
    var Cantidad = $("#"+idTR).find("td.Cantidad").find("input").val()
    var Precio = $("#"+idTR).find("td.Precio").find("input").val()
    $("#"+idTR).find("td.Total").find("input").val((parseFloat(Cantidad)*parseFloat(Precio)).toFixed(2))
    CalcularSuma(moneda)
}

function CambioTipoDoc(){
    if($("#tipo_doc_ident").val()=="DNI"){
        $("#divNombres").show()
        $("#divApellidos").show()
        $("#divRazonSocial").hide()
    }else{
        $("#divNombres").hide()
        $("#divApellidos").hide()
        $("#divRazonSocial").show()
    }
}

function CambioDescuento(moneda){
    var descuento = $("#Descuento").text()
    var total = parseFloat($("#SumaTotal").text().trim().replace("S/","").replace("USD",""))*parseFloat(descuento)/100
    $("#totalGlobal").text(moneda+" "+(parseFloat($("#SumaTotal").text().trim().replace("S/","").replace("USD",""))-total).toFixed(2))
}

function CalcularSuma(moneda){ 
    var suma = 0
    $('#bodyComprobante tr').each(function () {
        suma=suma+ parseFloat($(this).find("td.Total").find("input").val())
    })

    $("#SumaTotal").text(moneda+" "+suma)
    CambioDescuento(moneda)
}

function AceptarPedido(pedido_detalle){
    var cod_documento = $("#cod_documento").val()
    var nro_serie = parseInt($("#nro_serie").val())
    var numero = parseInt($("#numero").val().trim()==""?"0":$("#numero").val().trim())
    var cod_sucursal = pedido_detalle[0].cod_sucursal
    var pedido_id = pedido_detalle[0].pedido_id
    var cod_persona = pedido_detalle[0].cod_persona
    var nombre_cliente = $("#divNombres").css("display")=="none"?$("#razon_social").val():$("#nombres").val()+" "+$("#a_paterno")+" "+$("#a_materno")
    var direccion_cliente = $("#direccion").val()
    var concepto = "COMPROBANTE"
    var total = $("#totalGlobal").text().replace("S/","").replace("USD","")
    var impuesto = 0
    var estado = "EMITIDO"
    var obs = ""
    var fecha = $("#fecha").val()
    var params = {
        cod_documento,
		nro_serie,
		numero,
		cod_sucursal,
		pedido_id,
		cod_persona,
		nombre_cliente,
		direccion_cliente,
		concepto,
		total,
		impuesto,
		estado,
		obs,
		fecha,
    }
    fetchComprobante(params,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            console.log(res) 
            inicio()
        }
    })
}

function SeleccionarCuenta(cuenta,tipo){
    contador=0
    if(tipo=="R"){
        fetchPedidoDetalle(cuenta,function(res){
            if (res.err) {
                console.log(res.err)
            } else {
                console.log(res)
                if(res.punto_venta.length>0)
                    VerInvoice(res.punto_venta)
            }
        })
    }else{
        $('#modal-details').modal('close');
    }
}

function RotarCard(idBtn){
    var $card = $("#"+idBtn).closest('.card-container');
    if($card.hasClass('hover')){
        $card.removeClass('hover');
    } else {
        $card.addClass('hover');
    }
}


function VerDetalles(punto_venta,tipo){ 
    if(punto_venta.Nro_Cuentas==1){   
        fetchCuentas(punto_venta,function(res){
            if (res.err) {
                console.log(res.err)
            } else {
                SeleccionarCuenta(res.punto_venta[0],tipo)
            } 
        })
    }else{
        fetchCuentas(punto_venta,function(res){
            if (res.err) {
                console.log(res.err)
            } else {
                VerSeleccionCuentas(res.punto_venta,tipo)
            } 
        })
    }
}

function Aceptar(){
    $('.first').addClass('accept');
     
    /*var lastCard = $('<div />', {
        "class": 'card last-card'});
    setTimeout(function() {
      $('.card').first().remove();
      $('.card').each(function() {
      var newZ = parseInt($(this).css('transform').split(',')[14]) + 10;
      var newZIndex = parseInt($(this).css('z-index')) + 1;
      $(this).css({
        'transform': 'translate3d(-50%, -50%, ' + newZ + 'px)',
        'z-index': newZIndex
      });
  	});
      $('.cube').append(lastCard);
      
    }, 300);*/
}

function fetchComprobante(params,callback){ 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body: JSON.stringify(
            params
        )
    }
    fetch('http://localhost:5000/ws/save_ecaja_comprobante', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}


function fetchPedidoDetalle(cuenta,callback){ 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            pedido_id : cuenta.pedido_id,
            cod_punto_venta:cuenta.cod_punto_venta
        })
    }
    fetch('http://localhost:5000/ws/get_pedido_detalle', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function fetchDocumentos(cod_sucursal,callback){ 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_sucursal
        })
    }
    fetch('http://localhost:5000/ws/get_tipo_comprobantes', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function fetchSeriesNumeros(cod_documento,callback){ 
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
    fetch('http://localhost:5000/ws/get_series_by_documento', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}



function fetchCuentas(punto_venta,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_punto_venta:punto_venta.cod_mesa
        })
    }
    fetch('http://localhost:5000/ws/get_cuentas_by_punto_venta', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function fetchPuntosVentas(callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        })
    }
    fetch('http://localhost:5000/ws/get_puntos_venta', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function TraerTiposComprobantes(cod_sucursal){
    fetchDocumentos(cod_sucursal,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            if(res.documentos.length>0){
                LlenarTipoDocumentos(res.documentos)
                TraerSeriesNumeros(res.documentos[0].cod_documento)
            }
        }
    })
}

function TraerSeriesNumeros(cod_documento){
    fetchSeriesNumeros(cod_documento,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            if(res.series.length>0){
                LlenarSeries(res.series)
            }
        }
    })
}

function inicio() {
    ShowLoader()
    fetchPuntosVentas(function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            Ver(res.puntos_venta)
        }
        HideLoader()
    })
}

export {
    inicio
}