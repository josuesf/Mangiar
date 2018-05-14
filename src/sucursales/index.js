var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevo} from './nuevo'
function Ver(sucursales) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Sucursales</span>
                    <div class="row">
                        <div class="input-field col s12">
                          <input id="sucursal_busqueda" type="text" class="validate">
                          <label for="sucursal_busqueda">Ingrese el nombre de sucursal</label>
                        </div>
                    </div>
                    <div class="row">
                        <table class="striped">
                            <thead>
                                <tr>
                                    <th>Opc.</th>
                                    <th>Nombre</th>
                                    <th>Dirección</th>
                                    <th>Telefono</th>
                                    <th>Correo</th>
                                    <th>Fax</th>
                                    <th>Tipo de sistema</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${sucursales.map(s=> yo`
                                <tr>
                                    <td>
                                        <a onclick=${()=>nuevo(s)} class="dropdown-button btn teal accent-3 btn-floating btn-small">
                                        <i class="material-icons">edit</i>
                                        </a>
                                        <a class="dropdown-button btn red accent-3 btn-floating btn-small">
                                        <i class="material-icons">delete</i>
                                        </a>
                                    </td>
                                    <td>${s.nombre}</td>
                                    <td>${s.direccion}</td>
                                    <td>${s.telefono}</td>
                                    <td>${s.correo}</td>
                                    <td>${s.fax}</td>
                                    <td>${s.tipo_sistema}</td>
                                    <td>${s.estado}</td>
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
        <a href="#!" class="collection-item active">Todas las Sucursales</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nueva Sucursal</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
}
function sucursales() {
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
            sucursal_busqueda: ''
        })
    }
    fetch('http://localhost:5000/sucursales_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(res.sucursales)
            }
            HideLoader()
        })
    //Ver()
}

export { sucursales }