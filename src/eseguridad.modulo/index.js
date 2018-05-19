var yo = require('yo-yo')
var empty = require('empty-element');

import {nuevo} from './nuevo'

function Ver(modulos, paginas, pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Modulos</span>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input id="modulo_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                        <label for="modulo_busqueda" >Ingrese el nombre del modulo para buscar</label>
                    </div>
                </div>
                <div id="div_tabla">                            
                    ${VerTabla(modulos, paginas, pagina_actual)}
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los modulos</a>
        <a href="#!" onclick="${()=>nuevo()}" class="collection-item">Nuevo Modulo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)

    $(".dropdown-button").dropdown();
}

function Buscar(pagina_actual){
    const tamano_pagina = 5
    const modulo_busqueda = document.getElementById('modulo_busqueda').value.toUpperCase()
    fetchModulos(tamano_pagina,pagina_actual,modulo_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.modulos,paginas,pagina_actual)) 
        }
    })
}

function VerTabla(modulos, paginas, pagina_actual){
    return yo`
    <div>
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
                        <a onclick=${()=>nuevo(m)} class="dropdown-button btn teal accent-3 btn-floating">
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
            <li class="${(pagina_actual>1)?'waves-effect':'disabled'}">
                <a href="#!" onclick="${()=>(pagina_actual>1)?Buscar(pagina_actual-1):null}">
                    <i class="material-icons">chevron_left</i>
                </a>
            </li>
            ${((new Array(paginas)).fill(0)).map((p, i) => yo`<li class=${pagina_actual==(i+1)?'active indigo lighten-2':' waves-effect'}>
            <a href="#!" onclick="${()=>Buscar(i+1)}" >${i + 1}</a>
            </li>`)}
            <li class="${(pagina_actual<paginas)?'waves-effect':'disabled'}">
                <a href="#!" onclick="${()=>(pagina_actual<paginas)?Buscar(pagina_actual+1):null}">
                    <i class="material-icons">chevron_right</i>
                </a>
            </li>
        </ul>
    </div>`;
}

function fetchModulos(tamano_pagina,_numero_pagina,modulo_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            modulo_busqueda:modulo_busqueda
        })
    }
    fetch('http://localhost:5000/modulos_api/get_modulos', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function modulos(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchModulos(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.modulos,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { modulos }