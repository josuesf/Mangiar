var yo = require('yo-yo')
var empty = require('empty-element');

import {comprobantes} from './index'
import {inicio} from '../inicio'

var contador = 0 
function VerComprobante(comprobante){
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
                                        <select id="tipo_doc_ident" disabled>
                                            <option value="DNI">DNI</option>
                                            <option value="RUC">RUC</option>
                                        </select>
                                        <label>Tipo Documento</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;"  id="numero_doc" type="text" class="validate" >
                                        <label class="active" for="numero_doc" id="lnumero_doc" data-error="" data-success="">Nro. Doc.</label>
                                    </div>
                                </div>
                                <div class="row" id="divRazonSocial" style="display:none">
                                    <div class="input-field col s12">
                                        <input style="text-transform: uppercase;" id="razon_social" type="text" class="validate" data-length="120" >
                                        <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tamaño permitido" data-success="">Razon Social</label>
                                    </div>
                                </div>
                                <div class="row" id="divNombres">
                                    <div class="input-field col s12">
                                        <div class="row">
                                            <input style="text-transform: uppercase;" id="nombres" type="text" class="validate" data-length="40">
                                            <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tamaño permitido" data-success="">Nombres</label>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="row" id="divApellidos">
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;" id="a_paterno" type="text" class="validate" data-length="30">
                                        <label class="active" for="a_paterno" id="la_paterno" data-success="">Apellido Paterno</label>
                                    </div>
                                    <div class="input-field col s6">
                                        <input style="text-transform: uppercase;" id="a_materno" type="text" class="validate" data-length="30">
                                        <label class="active" for="a_materno" id="la_materno" data-success="">Apellido Materno</label>
                                    </div>
                                </div> 

                                <div class="row">
                                    <div class="input-field col s12">
                                        <div class="row">
                                            <input style="text-transform: uppercase;" id="direccion" type="text" class="validate">
                                            <label class="active">Direccion</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div class="col s4 m4 right">
                                <div class="card grey lighten-4">
                                    <div class="card-content">
                                        <div class="row">
                                            <div class="col s12 m12">
                                                <h5 id="tituloComprobante">R.U.C. 1111222234</h5>
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
                                <th class="center">Precio</th>
                                <th class="center">Total</th>
                            </tr>
                        </thead>
                        <tbody id="bodyComprobante">
                            
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
                                        <strong>Descuento(%): </strong>
                                    </p>
                                </td>
                                <td class="center">
                                    <p>
                                        <strong id="SumaTotal">0</strong>
                                    </p>
                                    <p>
                                    <strong id="Descuento" contenteditable="true" ></strong>
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>   </td>
                                <td>   </td>
                                <td class="right"><h5><strong>Total: </strong></h5></td>
                                <td class="center"><h5><strong id="totalGlobal">0</strong></h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <a class="waves-effect grey darken-4 btn" ><i class="material-icons left">print</i>Imprimir</a>
                </div>
            </div>
        </div>`
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el) 
    $('select').material_select()

    var sub_nav = yo `
    <div class="collection">
        <a href="#!" class="collection-item" onclick=${()=>inicio()}>Atras</a>
        <a href="#!" class="collection-item" onclick=${()=>comprobantes()}>Todos los comprobantes</a>
        <a href="#!" class="collection-item">Nuevo Comprobante</a>
    </div>`;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav) 
 
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
}



function nuevoComprobante(pcomprobante) {
    ShowLoader()
    VerComprobante(pcomprobante) 
    HideLoader()
}

export { nuevoComprobante }