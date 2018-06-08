var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { personas } from './index'
function Ver(persona) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${persona ? 'Editar Persona' : 'Nueva Persona' }</span>
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
                                    <input id="estado" ${persona ? (persona.estado=='ACTIVO' ? 'checked' : '') : 'checked'} type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            
                            
                            <div class="input-field col s6">
                                <select id="tipo_doc_ident" onchange="${()=>CambioTipoDoc()}">
                                    <option value="DNI" ${persona ? persona.tipo_doc_ident == 'DNI'? 'selected': '' :'selected'}>DNI</option>
                                    <option value="RUC" ${persona ? persona.tipo_doc_ident == 'RUC'? 'selected': '' :''}>RUC</option>
                                </select>
                                <label>Tipo Documento</label>
                            </div>      

                            <div class="input-field col s6" style="display:${persona ? "none":"display"}">
                                <input style="text-transform: uppercase;"  id="cod_persona" type="text" class="validate">
                                <label class="active" for="cod_persona" id="lcod_persona" data-error="" data-success="">Código Persona</label>
                            </div>                          
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6" id="divRazonSocial">
                                <input style="text-transform: uppercase;" value="${persona ? persona.razon_social : ''}" id="razon_social" type="text" class="validate" data-length="120">
                                <label class="active" for="razon_social" id="lrazon_social" data-error="nombre mayor al tamaño permitido" data-success="">Razon Social</label>
                            </div>
                            
                            <div class="input-field col s6" id="divNombres">
                                <input style="text-transform: uppercase;" value="${persona ? persona.nombres : ''}" id="nombres" type="text" class="validate" data-length="40">
                                <label class="active" for="nombres" id="lnombres" data-error="nombre mayor al tamaño permitido" data-success="">Nombres</label>
                            </div>

                        </div>

                        <div class="row">
                            
                            <div class="input-field col s6" id="divAP">
                                <input style="text-transform: uppercase;" value="${persona ? persona.a_paterno : ''}" id="a_paterno" type="text" class="validate" data-length="30">
                                <label class="active" for="a_paterno" id="la_paterno" data-error="apellido mayor al tamaño permitido" data-success="">Apellido Paterno</label>
                            </div>
                            
                            <div class="input-field col s6" id="divAM">
                                <input style="text-transform: uppercase;" value="${persona ? persona.a_materno : ''}" id="a_materno" type="text" class="validate" data-length="30">
                                <label class="active" for="a_materno" id="la_materno" data-error="apellido mayor al tamaño permitido" data-success="">Apellido Materno</label>
                            </div>

                        </div>
                        <div class="row">
                             
                            <div class="input-field col s6">
                                <input value="${persona ? persona.doc_ident : ''}" id="doc_ident" type="text" class="validate" data-length="15">
                                <label class="active" for="doc_ident" id="ldoc_ident" data-error="numero mayor al tamaño permitido" data-success="">Numero Documento</label>
                            </div>

                            <div class="input-field col s6">
                                <input value="${persona ? persona.direccion : ''}" id="direccion" type="text" class="validate">
                                <label for="direccion" class="active">Dirección</label>
                            </div>

                        </div>
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.fecha_nacimiento : ''}" id="fecha_nacimiento" type="text" class="datepicker">
                                <label for="fecha_nacimiento" class="active">Fecha Nac.</label>
                            </div>

                            <div class="input-field col s6">
                                <input value="${persona ? persona.tel_fijo : ''}" id="tel_fijo" type="text" class="validate">
                                <label for="tel_fijo" class="active">Telefono</label>
                            </div>
                            
                        </div>

                         <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.telf_movil : ''}" id="telf_movil" type="text" class="validate">
                                <label for="telf_movil" class="active">Celular</label>
                            </div>

                            <div class="input-field col s6">
                                <input value="${persona ? persona.correo : ''}" id="correo" type="email" class="validate">
                                <label for="correo" class="active">Correo</label>
                            </div>
                            
                        </div>
                         <div class="row">
                            <div class="input-field col s6">
                                <select id="sexo">
                                    <option value="M" ${persona ? persona.sexo == 'M'? 'selected': '' :''}>Masculino</option>
                                    <option value="F" ${persona ? persona.sexo == 'F'? 'selected': '' :''}>Femenino</option>
                                </select>
                                <label>Sexo</label>
                            </div>     

                        </div>
                        
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(persona)} class="waves-effect waves-light btn">Guardar Persona</a>
                            </div>
                            ${persona?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(persona)} class="waves-effect waves-light btn red lighten-3">Eliminar Persona</a>
                            </div>
                            `:yo``}
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
        <a href="#!" onclick="${()=>personas()}" class="collection-item">Todas las Personas</a>
        <a href="#!" class="collection-item active">Nueva Persona</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();

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
    /*$('.datepicker').pickadate({
        selectMonths: true,
        selectYears: 200, 
        format: 'yyyy-mm-dd'
    });*/
    var $input = $('#fecha_nacimiento').pickadate()
    var picker = $input.pickadate('picker')
    picker.set('select', new Date())
    CambioTipoDoc()
}


function CambioTipoDoc(){

    if($("#tipo_doc_ident").val()=="RUC"){ 
        $("#divRazonSocial").show()
        $("#divNombres").hide()
        $("#divAP").hide()
        $("#divAM").hide()
    }else{
        $("#divRazonSocial").hide()
        $("#divNombres").show()
        $("#divAP").show()
        $("#divAM").show()
    }
}

function Guardar(p) {
    var props = {}
    if($("#tipo_doc_ident").val()=="DNI"){
        props = {
            'nombres':{maxLen:100},
            'a_paterno':{maxLen:100},
            'a_materno':{maxLen:100},
            'doc_ident':{maxLen:15}
        }
    }else{
        props = {
            'razon_social':{maxLen:120},
            'doc_ident':{maxLen:15}
        }
    }

    if(!Validar(props))
        return;

    ShowLoader()
    var cod_persona = p?p.cod_persona:$("#cod_persona").val().toUpperCase()
    if($("#cod_persona").val().trim()=="")
        cod_persona = $('#doc_ident').val()
    const tipo_persona = null
    const razon_social = $('#razon_social').val().toUpperCase()
    const nombres = $('#nombres').val().toUpperCase()
    const a_paterno = $('#a_paterno').val().toUpperCase()
    const a_materno = $('#a_materno').val().toUpperCase()
    const tipo_doc_ident =  $("#tipo_doc_ident").val()
    const doc_ident = $('#doc_ident').val()
    const fecha_nacimiento = $('#fecha_nacimiento').val()
    const sexo = $('#sexo').val()
    const direccion = $('#direccion').val()
    const tel_fijo = $('#tel_fijo').val()
    const telf_movil = $('#telf_movil').val()
    const correo = $('#correo').val()
    const estado = $("#estado").is(':checked')? 'ACTIVO' : 'INACTIVO'
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_persona,
            tipo_persona, 
            razon_social,
            nombres,
            a_paterno,
            a_materno,
            tipo_doc_ident,
            doc_ident,
            fecha_nacimiento,
            sexo,
            direccion,
            tel_fijo,
            telf_movil,
            correo,
            estado
        })
    }
    fetch(URL+'/personas_api/save_persona', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.personas.length > 0) {
                    personas()
                }
            }
            HideLoader()
        })
}

function Eliminar(persona) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_persona = persona.cod_persona
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_persona
            })
        }
        fetch(URL+'/personas_api/delete_persona', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deletepersona == 'Se elimino correctamente') {
                       personas()
                    }
                }   
                HideLoader()
            })
    }
}

function nuevaPersona(persona) {
    ShowLoader()
    Ver(persona)
    HideLoader()
}

export { nuevaPersona }