var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevo} from './nuevo'
function Ver(ubigeos) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Ubigeos</span>
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="ubigeo_busqueda" type="text" class="validate">
                          <label for="ubigeo_busqueda">Ingrese el nombre del departamento, provincia o distrito</label>
                        </div>
                    </div>
                    <div class="row">
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Opc.</th>
                                    <th>Departamento</th>
                                    <th>Provincia</th>
                                    <th>Distrito</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${ubigeos.map(u=> yo`
                                <tr>
                                    <td>
                                        <a onclick=${()=>nuevo(u)} class="dropdown-button btn teal accent-3 btn-floating btn-small">
                                        <i class="material-icons">edit</i>
                                        </a>
                                        <a class="dropdown-button btn red accent-3 btn-floating btn-small">
                                        <i class="material-icons">delete</i>
                                        </a>
                                    </td>
                                    <td>${u.departamento}</td>
                                    <td>${u.provincia}</td>
                                    <td>${u.distrito}</td>
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
        <a href="#!" class="collection-item active">Todos los Ubigeos</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nuevo Ubigeo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function ubigeos() {
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
            ubigeo_busqueda: ''
        })
    }
    fetch('http://localhost:5000/ubigeos_api/get_ubigeos', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(res.ubigeos)
            }
            HideLoader()
        })
    //Ver()
}

export { ubigeos }