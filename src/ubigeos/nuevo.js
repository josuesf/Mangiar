var yo = require('yo-yo')
var empty = require('empty-element');
import { ubigeos } from './index'
function Ver(ubigeo) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">${ubigeo ? 'Editar Ubigeo' : 'Nuevo Ubigeo' }</span>
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
                            <div class="input-field col s4">
                                <input style="text-transform: uppercase;" value="${ubigeo ? ubigeo.cod_departamento : ''}" id="cod_departamento" type="text" class="validate" data-length="2">
                                <label for="cod_departamento" id="lcod_departamento" class="active" data-error="Código mayor al permitido" data-success="">Codigo Departamento</label>
                            </div>
                            <div class="input-field col s4">
                                <input style="text-transform: uppercase;" value="${ubigeo ? ubigeo.cod_provincia : ''}" id="cod_provincia" type="text" data-length="2" class="validate">
                                <label for="cod_provincia" id="lcod_provincia" class="active" data-error="Código mayor al permitido" data-success="">Codigo Provincia</label>
                            </div>
                            <div class="input-field col s4">
                                <input style="text-transform: uppercase;" value="${ubigeo ? ubigeo.cod_distrito : ''}" id="cod_distrito" type="text" data-length="2" class="validate">
                                <label for="cod_distrito" id="lcod_distrito" class="active" data-error="Código mayor al permitido" data-success="">Codigo Distrito</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s4">
                                <input style="text-transform: uppercase;" value="${ubigeo ? ubigeo.departamento : ''}" id="departamento" class="validate" type="text">
                                <label for="departamento" class="active">Departamento</label>
                            </div>
                            <div class="input-field col s4">
                                <input style="text-transform: uppercase;" value="${ubigeo ? ubigeo.provincia : ''}" id="provincia" type="text" class="validate">
                                <label for="provincia" class="active">Provincia</label>
                            </div>
                            <div class="input-field col s4">
                                <input style="text-transform: uppercase;" value="${ubigeo ? ubigeo.distrito : ''}" id="distrito" type="text" class="validate">
                                <label for="distrito" class="active">Distrito</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col s6">
                                <a onclick=${() => Guardar(ubigeo)} class="waves-effect waves-light btn">Guardar Ubigeo</a>
                            </div>
                            ${ubigeo?yo`
                            <div class="col s6">
                                <a onclick=${() => Eliminar(ubigeo)} class="waves-effect waves-light btn red lighten-3">Eliminar Ubigeo</a>
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
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" onclick="${ubigeos}" class="collection-item">Todos los Ubigeos</a>
        <a href="#!" class="collection-item active">Nuevo Ubigeo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}
function Guardar(u) {
    var props = {
        'cod_departamento':{maxLen:2},
        'cod_distrito':{maxLen:2},
        'cod_provincia':{maxLen:2}
    }
    if(!Validar(props))
        return;
    ShowLoader()
    const cod_departamento = u?u.cod_departamento:$('#cod_departamento').val().toUpperCase()
    const cod_provincia = u?u.cod_provincia:$('#cod_provincia').val().toUpperCase()
    const cod_distrito = u?u.cod_distrito:$('#cod_distrito').val().toUpperCase()
    const departamento = $('#departamento').val().toUpperCase()
    const provincia = $('#provincia').val().toUpperCase()
    const distrito = $('#distrito').val().toUpperCase()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            cod_departamento,
            cod_provincia, 
            cod_distrito,
            departamento,
            provincia,
            distrito
        })
    }
    fetch('http://localhost:5000/ubigeos_api/save_ubigeo', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                if (res.ubigeos.length > 0) {
                    ubigeos()
                }
            }
            HideLoader()
        })
}


function Eliminar(ubigeo) {
    var txt;
    var r = confirm("Esta seguro de eliminar?");
    if (r == true) {
        ShowLoader()
        const cod_departamento = ubigeo.cod_departamento
        const cod_provincia = ubigeo.cod_provincia
        const cod_distrito = ubigeo.cod_distrito
        const parametros = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cod_departamento,
                cod_provincia,
                cod_distrito
            })
        }
        fetch('http://localhost:5000/ubigeos_api/delete_ubigeo', parametros)
            .then(req => req.json())
            .then(res => {
                if (res.err) {
                    $('#text_error').text(res.err)
                    $('#box_error').show()
                } else {
                    if (res.respuesta[0].fn_deleteubigeo == 'Se elimino correctamente') {
                       ubigeos()
                    }
                }   
                HideLoader()
            })
    }
}

function nuevoUbigeo(ubigeo) {
    ShowLoader()
    Ver(ubigeo)
    HideLoader()
}

export { nuevoUbigeo }