var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevo} from './nuevo'
function Ver(cuentas) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Usuarios</span>
                <table class="striped">
                    <thead>
                        <tr>
                            <th>Opc.</th>
                            <th>Usuario</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cuentas.map(c=> yo`
                        <tr>
                            <td>
                                <a onclick=${()=>nuevo(c)} class="dropdown-button btn teal accent-3 btn-floating">
                                <i class="material-icons">edit</i>
                                </a>
                            </td>
                            <td>${c.usuario}</td>
                            <td>${c.email}</td>
                            <td>${c.telefono}</td>
                            <td>${c.estado}</td>
                        </tr>
                        `)}
                    </tbody>
                </table>
                <ul class="pagination">
                    <li class="disabled">
                        <a href="#!">
                            <i class="material-icons">chevron_left</i>
                        </a>
                    </li>
                    <li class="active indigo lighten-2">
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
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los usuarios</a>
        <a onclick="${()=>nuevo()}" class="collection-item">Nuevo Usuario</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $(".dropdown-button").dropdown();
}
function cuentas() {
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
            usuario_busqueda:''
        })
    }
    fetch('http://localhost:5000/cuentas_api/get_cuentas', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(res.cuentas)
            }
            HideLoader()
        })
}

export { cuentas }