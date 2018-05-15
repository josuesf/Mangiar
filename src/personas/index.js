var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevo} from './nuevo'
function Ver(personas) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Personas</span>
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="persona_busqueda" type="text" class="validate">
                          <label for="persona_busqueda">Ingrese el nombre de la persona</label>
                        </div>
                    </div>
                    <div class="row">
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Opc.</th>
                                    <th>Nombres</th>
                                    <th>A. Paterno</th>
                                    <th>A. Materno</th>
                                    <th>Tipo Doc.</th>
                                    <th>Doc.</th>
                                    <th>Naturaleza</th>
                                    <th>Direccion.</th>
                                    <th>Telefonos</th>
                                    <th>Correo</th>
                                    <th>Sexo</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${personas.map(p=> yo`
                                <tr>
                                    <td>
                                        <a onclick=${()=>nuevo(p)} class="dropdown-button btn teal accent-3 btn-floating btn-small">
                                        <i class="material-icons">edit</i>
                                        </a>
                                        <a class="dropdown-button btn red accent-3 btn-floating btn-small">
                                        <i class="material-icons">delete</i>
                                        </a>
                                    </td>
                                    <td>${p.nombres}</td>
                                    <td>${p.a_paterno}</td>
                                    <td>${p.a_materno}</td>
                                    <td>${p.tipo_doc_ident}</td>
                                    <td>${p.doc_ident}</td>
                                    <td>${p.tipo_persona}</td>
                                    <td>${p.direccion}</td>
                                    <td>${p.tel_fijo} / ${p.telf_movil}</td>
                                    <td>${p.correo}</td>
                                    <td>${p.sexo }</td>
                                </tr>
                                `)}
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <ul class="pagination">
                            <li class="disabled">
                                <a href="#!">
                                    <i class="material-icons">chevron_left</i>
                                </a>
                            </li>
                            <li class="active">
                                <a href="#!">1</a>
                            </li>
                            <li class="waves-effect">
                                <a href="#!">2</a>
                            </li>
                            <li class="waves-effect">
                                <a href="#!">3</a>
                            </li>
                            <li class="waves-effect">
                                <a href="#!">4</a>
                            </li>
                            <li class="waves-effect">
                                <a href="#!">5</a>
                            </li>
                            <li class="waves-effect">
                                <a href="#!">
                                    <i class="material-icons">chevron_right</i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card-action">
                    <a href="#">Guardar</a>
                </div>
            </div>
        </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las personas</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nueva Persona</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function personas() {
    ShowLoader()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tamano_pagina:10,
            numero_pagina:1,
            persona_busqueda: ''
        })
    }
    fetch('http://localhost:5000/personas_api/get_personas', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(res.personas)
            }
            HideLoader()
        })
    //Ver()
}

export { personas }