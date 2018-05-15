var yo = require('yo-yo')
var empty = require('empty-element');

// import {nuevo} from './nuevo'

function Ver(modulos) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Modulos</span>
                <table class="striped">
                    <thead>
                        <tr>
                            <th>Opc.</th>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${modulos.map(m=> yo`
                        <tr>
                            <td>
                                <a class="dropdown-button btn teal accent-3 btn-floating">
                                <i class="material-icons">edit</i>
                                </a>
                            </td>
                            <td>${m.cod_modulo}</td>
                            <td>${m.nombre}</td>
                            <td>${m.descripcion}</td>
                            <td>${m.estado}</td>
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
        <a href="#!" class="collection-item active">Todos los modulos</a>
        <a class="collection-item">Nuevo Modulo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)

    $(".dropdown-button").dropdown();
}
function modulos() {
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
    fetch('http://localhost:5000/modulos_api/get_modulos', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                console.log(res.err)
            } else {
                Ver(res.modulos)
            }
            HideLoader()
        })
}

export { modulos }