var yo = require('yo-yo')
var empty = require('empty-element');
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
                                    <input id="estado" checked="${persona ? (persona.estado=='ACTIVO' ? '1' : '0') : '0'}" type="checkbox">
                                    <span class="lever"></span>
                                    Activo
                                    </label>
                                </div>
                            </div>
                        </div>
                         <div class="row">
                            ${persona ? yo`` : yo`<div class="input-field col s6">
                                                    <input id="cod_persona" type="text" class="validate">
                                                    <label class="active">Codigo Persona</label>
                                                   </div>` }
                            <div class="input-field col s6">
                                <input value="${persona ? persona.tipo_persona : ''}" id="tipo_persona" type="text">
                                <label for="tipo_persona" class="active">Tipo persona</label>
                            </div>
                            
                        </div>
                         
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.razon_social : ''}" id="razon_social" type="text" class="validate">
                                <label for="razon_social" class="active">Razon Social</label>
                            </div>
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.nombres : ''}" id="nombres" type="text" class="validate">
                                <label for="nombres" class="active">Nombres</label>
                            </div>

                        </div>

                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.a_paterno : ''}" id="a_paterno" type="text" class="validate">
                                <label for="a_paterno" class="active">Apellido Paterno</label>
                            </div>
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.a_materno : ''}" id="a_materno" type="text" class="validate">
                                <label for="a_materno" class="active">Apellido Materno</label>
                            </div>

                        </div>
                        <div class="row">
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.tipo_doc_ident : ''}" id="tipo_doc_ident" type="text" class="validate">
                                <label for="tipo_doc_ident" class="active">Tipo Doc.</label>
                            </div>
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.doc_ident : ''}" id="doc_ident" type="text" class="validate">
                                <label for="doc_ident" class="active">Doc.</label>
                            </div>

                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input value="${persona ? persona.direccion : ''}" id="direccion" type="text" class="validate">
                                <label for="direccion" class="active">Direccion</label>
                            </div>
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.fecha_nacimiento : ''}" id="fecha_nacimiento" type="text" class="datepicker">
                                <label for="fecha_nacimiento" class="active">Fecha Nac.</label>
                            </div>
                            
                        </div>

                         <div class="row">
                            <div class="input-field col s6">
                                <input value="${persona ? persona.tel_fijo : ''}" id="tel_fijo" type="text" class="validate">
                                <label for="tel_fijo" class="active">Telefono</label>
                            </div>
                            
                            <div class="input-field col s6">
                                <input value="${persona ? persona.telf_movil : ''}" id="telf_movil" type="text" class="validate">
                                <label for="telf_movil" class="active">Celular</label>
                            </div>
                            
                        </div>
                         <div class="row">
                            <div class="input-field col s6">
                                <input value="${persona ? persona.correo : ''}" id="correo" type="email" class="validate">
                                <label for="correo" class="active">Correo</label>
                            </div>
                             <div class="input-field col s6">
                                <input value="${persona ? persona.sexo : ''}" id="sexo" type="text" class="validate">
                                <label for="sexo" class="active">Sexo</label>
                            </div>
                        </div>
                        
                          
                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(persona)} class="waves-effect waves-light btn">Guardar Persona</a>
                            </div>
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
        <a onclick="${personas}" class="collection-item">Todas las Personas</a>
        <a href="#!" class="collection-item active">Nueva Persona</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function Guardar(p) {
    ShowLoader()
    const cod_persona = p?p.cod_persona:$("#cod_persona").val()
    const tipo_persona = $('#tipo_persona').val()
    const razon_social = $('#razon_social').val()
    const nombres = $('#nombres').val()
    const a_paterno = $('#a_paterno').val()
    const a_materno = $('#a_materno').val()
    const tipo_doc_ident = $('#tipo_doc_ident').val()
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
    fetch('http://localhost:5000/personas_api/save_persona', parametros)
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
function nuevo(persona) {
    ShowLoader()
    Ver(persona)
    HideLoader()
}

export { nuevo }