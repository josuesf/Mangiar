var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevoUbigeo} from './nuevo'
function Ver(ubigeos,paginas,pagina_actual) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Ubigeos</span>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">search</i>
                            <input id="ubigeo_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                            <label for="ubigeo_busqueda" >Ingrese el nombre del ubigeo para buscar</label>
                        </div>
                    </div>
                    <div id="div_tabla">
                        ${VerTabla(ubigeos,paginas,pagina_actual)}
                    </div>
                </div>
            </div>
        </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Ubigeos</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevoUbigeo()}">Nuevo Ubigeo</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $(".dropdown-button").dropdown();
}

function VerTabla(ubigeos,paginas,pagina_actual){
    return yo`
    <div>
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
                        <a onclick=${()=>nuevoUbigeo(u)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${u.departamento}</td>
                    <td>${u.provincia}</td>
                    <td>${u.distrito}</td>
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

function Buscar(pagina_actual){
    const tamano_pagina = 5
    const ubigeo_busqueda = document.getElementById('ubigeo_busqueda').value.toUpperCase()
    fetchUbigeos(tamano_pagina,pagina_actual,ubigeo_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.ubigeos,paginas,pagina_actual)) 
        }
    })
}

function fetchUbigeos(tamano_pagina,_numero_pagina,ubigeo_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            ubigeo_busqueda:ubigeo_busqueda
        })
    }
    fetch('http://localhost:5000/ubigeos_api/get_ubigeos', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function ubigeos(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchUbigeos(tamano_pagina,_numero_pagina,'',function(res){
        console.log(res)
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.ubigeos,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
    
}

export { ubigeos }