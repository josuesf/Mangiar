var yo = require('yo-yo')
var empty = require('empty-element');

import { Init,onActionLeft,onActionRight } from '../utils'

var contador = 0 
 
function Ver(puntos_venta) {
 
    var  el = yo`
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
                                            <div id=${e.cod_mesa} class="footer" style="cursor:pointer" onclick=${()=>RotarCard(e.Nro_Cuentas,e.cod_mesa)}>
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
                                            <div class="footer" style="cursor:pointer" onclick=${()=>RotarCard(e.Nro_Cuentas,e.cod_mesa)}>
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
                            <a href="javascript:void(0);" class="collection-item" onclick=${()=>SeleccionarCuenta(e,tipo)}><i class="material-icons left">label_outline</i> CUENTA : ${i+1}</a>
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
    var el = yo` 
        <div class="card" id="divInvoice">
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
                                        <label>Tipo Documento</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" value="${pedido_detalle[0].doc_ident!=null?pedido_detalle[0].doc_ident:''}">
                                        <label class="active" for="numero_doc" id="lnumero_doc" data-error="" data-success="">Nro. Doc.</label>
                                    </div>
                                </div>
                                <div class="row" id="divRazonSocial" style="display:none">
                                    <div class="input-field col s12">
                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" value="${pedido_detalle[0].razon_social!=null?pedido_detalle[0].razon_social:''}">
                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tamaño permitido" data-success="">Razon Social</label>
                                    </div>
                                </div>
                                <div class="row" id="divNombres">
                                    <div class="input-field col s12">
                                        <div class="row">
                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40" value="${pedido_detalle[0].nombres!=null?pedido_detalle[0].nombres:''}">
                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tamaño permitido" data-success="">Nombres</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row" id="divApellidos">
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30" value="${pedido_detalle[0].a_paterno!=null?pedido_detalle[0].a_paterno:''}">
                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30" value="${pedido_detalle[0].a_materno!=null?pedido_detalle[0].a_materno:''}">
                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>
                                    </div>
                                </div> 

                                <div class="row">
                                    <div class="input-field col s12">
                                        <div class="row">
                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate" value="${pedido_detalle[0].direccion!=null?pedido_detalle[0].direccion:''}">
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
                                                <input style="text-transform: uppercase;"  id="numero" type="number" class="validate" value="0">
                                                <label class="active" for="numero" id="lnumero" data-error="" data-success="">Número</label>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="input-field col s12">
                                                <input value="" id="fecha" type="text" class="datepicker">
                                                <label for="fecha" class="active" for="fecha" id="lfecha" data-error="" data-success="">Fecha</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="row">
                    <table class="table table-hover" id="tablaComprobante">
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
                                    <td class="Detalle"><p style="display:none" class="pDetalle pValor">${e.descripcion_detalle}</p> <input style="text-transform: uppercase;" type="text" class="validate" value="${e.descripcion_detalle}" disabled></td>
                                    <td class="Cantidad"><p style="display:none" class="pCantidad pValor">${parseFloat(e.cantidad).toFixed(2)}</p><input style="text-transform: uppercase;" type="number" class="validate" value="${parseFloat(e.cantidad).toFixed(2)}" onkeyup="${()=>CambioCelda(pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD ",idFila+"-"+e.producto_id)}"></td>
                                    <td class="Moneda"><p style="display:none" class="pMoneda pValor">${e.cod_moneda=='PEN'?'S/ ':'USD'}</p><input style="text-transform: uppercase;" type="text" class="validate" value="${e.cod_moneda=='PEN'?'S/ ':'USD'}" disabled></td>
                                    <td class="Precio"><p style="display:none" class="pPrecio pValor">${e.precio}</p><input style="text-transform: uppercase;" type="number" class="validate" value="${e.precio}" onkeyup="${()=>CambioCelda(pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD ",idFila+"-"+e.producto_id)}"></td>
                                    <td class="Total"><p style="display:none" class="pTotal pValor">${(parseFloat(e.cantidad)*parseFloat(e.precio)).toFixed(2)}</p><input style="text-transform: uppercase;" type="number" class="validate" value="${(parseFloat(e.cantidad)*parseFloat(e.precio)).toFixed(2)}" disabled></td>
                                </tr>
                            `)}
                        </tbody>
                        <tbody>
                            
                            <tr>
                                <td>   </td>
                                <td>   </td>
                                <td>   </td>
                                <td class="right">
                                    <p>
                                        <strong>Subtotal: </strong>
                                    </p>
                                    <p>
                                        <strong>Descuento(%): </strong>
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
        container: 'body',
        selectMonths: true,
        selectYears: 200, 
        format: 'yyyy-mm-dd',
        monthsFull:["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Setiembre","Octubre","Noviembre","Diciembre"],
        monthsShort:["Ener","Feb","Mar","Abr","May","Jun","Jul","Agos","Set","Oct","Nov","Dic"],
        weekdaysFull:["Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sabado"],
        weekdaysShort:["Dom","Lun","Mar","Mie","Jue","Vie","Sab"],
        weekdaysLetter:["D","L","M","Mi","J","V","S"],
        today:"Hoy",
        clear:"Limpiar",
        close:"Ok"
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

    $("#"+idTR).find("td.Cantidad").find("p.pCantidad").text(Cantidad)
    $("#"+idTR).find("td.Precio").find("p.pPrecio").text(Precio)
    $("#"+idTR).find("td.Total").find("p.pTotal").text((parseFloat(Cantidad)*parseFloat(Precio)).toFixed(2))

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

    var props = {}
    if($("#tipo_doc_ident").val()=="DNI"){
        props = {
            'nombres':{maxLen:100},
            'a_paterno':{maxLen:100},
            'a_materno':{maxLen:100},
            'numero_doc':{maxLen:15},
            'fecha':{},
            'numero':{},
        }
    }else{
        props = {
            'razon_social':{maxLen:120},
            'numero_doc':{maxLen:15},
            'fecha':{},
            'numero':{},
        }
    }

    if(!Validar(props))
        return;


    var cod_documento = $("#cod_documento").val()
    var nro_serie = parseInt($("#nro_serie").val())
    var numero = parseInt($("#numero").val().trim()==""?"0":$("#numero").val().trim())
    var cod_sucursal = pedido_detalle[0].cod_sucursal
    var pedido_id = pedido_detalle[0].pedido_id
    var cod_persona = pedido_detalle[0].cod_persona
    var nombre_cliente = $("#divNombres").css("display")=="none"?$("#razon_social").val():$("#nombres").val()+" "+$("#a_paterno").val()+" "+$("#a_materno").val()
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
            
            var loc = window.location.pathname;
            var dir = loc.substring(0, loc.lastIndexOf('/'));
            var pdf =btoa(generateInvoice());

            const parametros = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data : pdf
                })
            }
            fetch('http://localhost:5000/ws/save_pdf', parametros)
                .then(req => req.json())
                .then(res => {
                    console.log(res)
                    if(res.respuesta=="ok"){
                        const winPDF = new BrowserWindow({
                            width: 800,
                            height: 600
                        })
                        PDFWindow.addSupport(winPDF) 
                        winPDF.loadURL(dir+'/assets/media/recibo.pdf')
                        inicio()
                    }
                })
        }
    })
}

function SeleccionarCuenta(cuenta,tipo){
    contador=0
    try{
        $('#modal-details').modal('close');
    }catch(e){}

    if(tipo=="R"){
        ShowLoader()
        fetchPedidoDetalle(cuenta,function(res){
            if (res.err) {
                console.log(res.err)
            } else {
                console.log(res)
                if(res.punto_venta.length>0)
                    VerInvoice(res.punto_venta)
            }
            HideLoader()
        })
    }else{
        //$('#modal-details').modal('close');
    }
}

function RotarCard(nro_cuentas,idBtn){
    if(nro_cuentas>0){
        var $card = $("#"+idBtn).closest('.card-container');
        if($card.hasClass('hover')){
            $card.removeClass('hover');
        } else {
            $card.addClass('hover');
        }
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


function generateInvoice() {
    $(".pValor").css("display","block")
    var companyJSON={
        CompanyName:'GRIFOS MARECELOS S.R.L SLSLL',
        CompanyRUC: "20101001010",
        CompanyAddress: "UVIMA 5 G9 SAN JERONIMO"
    };

    var company_logo = {
        src:null,//'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdgAAAGWCAIAAABU6QXSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAU/SURBVHhe7dQxAQAADMOg+TfdycgDIrgBkBIxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFATMQAMREDxEQMEBMxQEzEADERA8REDBATMUBMxAAxEQPERAwQEzFAanvaPG1kiWmMAQAAAABJRU5ErkJggg==',
        w: 80,
        h: 50
    };
      

    var fontSizes={
        HeadFontSize:16,
        TitleFontSize:12,
        SubTitleFontSize:11,
        NormalFontSize:10,
        SmallFontSize:8
    };
       
    var lineSpacing={
        MarginTop:25,
        MarginSeccionCliente :55,
        NormalSpacing:25,
    };
  
    var doc = new jsPDF('p', 'pt');
  
    var rightStartCol1=370;
    var rightStartCol2=450;


    var InitialstartX=40;
    var startX=50;
    var InitialstartY=40;
    var startY=0;

    var lineHeights=12;

    doc.setFontSize(fontSizes.SubTitleFontSize);
    doc.setFont('times');
    doc.setFontType('bold');

    if(company_logo.src!=null){
        doc.addImage(company_logo.src, 'PNG', startX,startY+=50, company_logo.w,company_logo.h);
        doc.textAlign(companyJSON.CompanyName, {align: "left"}, startX, startY+=15+company_logo.h);
    }else{
        doc.setFontSize(fontSizes.HeadFontSize);
        doc.setFontType('bold');
        doc.textAlign(companyJSON.CompanyName, {align: "left"}, startX, startY+=30+company_logo.h); 
        doc.setFontSize(fontSizes.SubTitleFontSize);
        doc.setFontType('normal');
        doc.textAlign(companyJSON.CompanyAddress, {align: "left"}, startX, startY+20); 
        startY+=30
    }

    doc.setLineWidth(1);
    doc.roundedRect(startX-10, startY+lineSpacing.MarginSeccionCliente-20, 520, 80, 3, 3); 

    doc.setFontSize(fontSizes.NormalFontSize);
    doc.setFontType('bold');
    doc.textAlign("SEÑOR(ES) :", {align: "left"}, startX, startY+=lineSpacing.MarginSeccionCliente);
    doc.setFontType('normal');
   // var w = doc.getStringUnitWidth('GSTIN') * NormalFontSize;
    doc.textAlign($("#tipo_doc_ident").val()=="DNI"?$("#nombres").val()+" "+$("#a_paterno").val()+" "+$("#a_materno").val():$("#razon_social").val(), {align: "left"}, 120, startY);
    
    doc.setFontType('bold');
    doc.textAlign($("#tipo_doc_ident").val()+" :", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign("47171096", {align: "left"}, 120, startY);

    doc.setFontType('bold');
    doc.textAlign("DIRECCION :", {align: "left"}, startX, startY+=lineSpacing.NormalSpacing);
    doc.setFontType('normal');
    doc.textAlign($("#direccion").val(), {align: "left"}, 120, startY);

    doc.setFont('helvetica');
    doc.setFontType('bold'); 
    doc.setFontSize(fontSizes.NormalFontSize);
    doc.textAlign("FECHA EMISION : ", {align: "left"},  rightStartCol1+60, startY-50);
    doc.textAlign($("#fecha").val(), {align: "left"}, rightStartCol1+70, startY-30);

 
    var tempY=InitialstartY;
 
    doc.setLineWidth(2);
    doc.roundedRect(360, tempY, 200, 100, 3, 3); 
    //doc.rect(230, tempY, 230, 180); 
    doc.setFont('helvetica');
    doc.setFontType('bold'); 
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.textAlign("R.U.C. "+companyJSON.CompanyRUC, {align: "left"},  rightStartCol1+30, tempY+=lineSpacing.MarginTop);
    doc.setFont('helvetica');
    doc.setFontType('bold'); 
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.textAlign($("#cod_documento option:selected").text(), {align: "left"},  rightStartCol1+10, tempY+=lineSpacing.NormalSpacing); 

    doc.setFont('helvetica');
    doc.setFontType('bold'); 
    doc.setFontSize(fontSizes.TitleFontSize);
    doc.textAlign("Serie "+$("#nro_serie").val(), {align: "left"},  rightStartCol1+20, tempY+=lineSpacing.NormalSpacing);
    doc.textAlign("Nº "+$("#numero").val(), {align: "left"},  rightStartCol1+100, tempY);


    var resd= doc.autoTableHtmlToJson(document.getElementById("tablaComprobante")); 

    doc.autoTable(resd.columns, resd.data, {
        startY: startY+30,
        startX: 80,
        margin: {horizontal: 30},
        headerStyles: {rowHeight: 12, fontSize: 7,valign: 'middle'},
        styles: {overflow: 'linebreak'},
        bodyStyles: {rowHeight: 12, fontSize: 8, valign: 'middle'}, 
        theme: 'plain',
        pageBreak: 'avoid',
    });
 
    return doc.output();
}

export {
    inicio
}