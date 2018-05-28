var yo = require('yo-yo')
var empty = require('empty-element');
//var htmlToPdf = require('html-to-pdf');
import { Init,onActionLeft,onActionRight } from '../utils'
 
function Ver(puntos_venta) {
    var el = yo`
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
    </div>`; 
    //const numeroFilas = Math.floor(paginas/4) 
     
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo `
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las mesas</a>
        <a href="#!" class="collection-item">Mesas Ocupadas</a>
        <a href="#!" class="collection-item">Mesas Libres</a>
    </div>
        `;
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
                        ${cuentas.map(e=>yo` 
                            <a href="javascript:void(0);" class="collection-item" onclick=${()=>SeleccionarCuenta(e,tipo)}><i class="material-icons left">label_outline</i> CUENTA : ${e.nro_serie}-${e.numero}</a>
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
    var el = yo` 
        <div class="modal-content" id="divInvoice">
                <div class="row">
                    <div class="col m12 s12">
                        <div class="row">
                            <div class="col s6 m6">
                                <address>
                                    <strong>Nombre Empresa</strong>
                                    <br>
                                    Direccion
                                    <br>
                                    Pais y Ciudad
                                    <br>
                                    <abbr title="Phone">Telefono</abbr> ########
                                </address>
                            </div>
                            <div class="col s6 m6 right">
                                <p>
                                    <em>Fecha: </em>
                                </p>
                                <p>
                                    <em>Numero #: </em>
                                </p>
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
                                <th class="center">Precio</th>
                                <th class="center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pedido_detalle.map(e=>yo` 
                                <tr>
                                    <td class="col-md-9"><em>${e.descripcion_detalle}</em></td>
                                    <td class="col-md-1">${e.cantidad}</td>
                                    <td class="col-md-1 center">${e.cod_moneda=="PEN"?"S/ ":"USD "}${e.precio}</td>
                                    <td class="col-md-1 center">${parseFloat(e.cantidad)*parseFloat(e.precio)}</td>
                                </tr>
                            `)}
                            
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
                                        <strong>${pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD "}${pedido_detalle[0].total}</strong>
                                    </p>
                                    <p>
                                        <strong>${pedido_detalle[0].descuento==""?"0":pedido_detalle[0].descuento}</strong>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>   </td>
                                <td>   </td>
                                <td class="right"><h5><strong>Total: </strong></h5></td>
                                <td class="center"><h5><strong>${pedido_detalle[0].cod_moneda=="PEN"?"S/ ":"USD "}${pedido_detalle[0].total}</strong></h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <a class="waves-effect grey darken-4 btn" onclick=${()=>AceptarPedido(pedido_detalle)}><i class="material-icons left">check</i>Aceptar</a>
                </div>
        </div>
        `
        var container = document.getElementById('modal-details')
        empty(container).appendChild(el);
}

function AceptarPedido(pedido){
    fetchComprobante(pedido,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            console.log(res)
            $("#modal-details").modal("hide")
        }
    })
}

function SeleccionarCuenta(cuenta,tipo){
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
        $('#modal-details').modal('hide');
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

function fetchComprobante(pedido,callback){ 
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_documento: pedido.cod_documento,
            nro_serie: pedido.nro_serie,
            numero: pedido.numero,
            cod_sucursal: pedido.cod_sucursal,
            pedido_id: pedido.pedido_id,
            cod_persona:pedido.cod_persona,
            nombre_cliente:pedido.nombre_cliente,
            direccion_cliente:'',
            concepto:'',
            total:pedido.total,
            impuesto:0,
            estado:'EMITIDO',
            obs:'',
            fecha:'12-12-2018'
        })
    }
    fetch('http://localhost:5000/ws/get_pedido_detalle', parametros)
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