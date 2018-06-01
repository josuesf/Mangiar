var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import {nuevo} from './nuevo'

function Ver(perfiles, paginas, pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Perfiles</span>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input id="perfil_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                        <label for="perfil_busqueda" >Ingrese el nombre del perfil para buscar</label>
                    </div>
                </div>
                <div id="div_tabla">                            
                    ${VerTabla(perfiles, paginas, pagina_actual)}
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los perfiles</a>
        <a href="#!" onclick="${()=>nuevo()}" class="collection-item">Nuevo Perfil</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)

    $(".dropdown-button").dropdown();
}

function Buscar(pagina_actual){
    const tamano_pagina = 5
    const perfil_busqueda = document.getElementById('perfil_busqueda').value.toUpperCase()
    fetchPerfiles(tamano_pagina,pagina_actual,perfil_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.perfiles,paginas,pagina_actual)) 
        }
    })
}

function VerTabla(perfiles, paginas, pagina_actual){
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
                ${perfiles.map(p=> yo`
                <tr>
                    <td>
                        <a onclick="${()=>nuevo(p)}" class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${p.cod_perfil}</td>
                    <td>${p.nombre}</td>
                    <td>${p.descripcion}</td>
                    <td>${p.estado}</td>
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

function fetchPerfiles(tamano_pagina, _numero_pagina, perfil_busqueda, callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            perfil_busqueda:perfil_busqueda
        })
    }
    fetch(URL+'/perfiles_api/get_perfiles', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function perfiles(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchPerfiles(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.perfiles,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { perfiles }