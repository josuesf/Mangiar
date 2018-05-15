var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevo} from './nuevo'
function Ver(_cuentas,paginas,pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Usuarios</span>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input id="usuario_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                        <label for="usuario_busqueda" >Ingrese el nombre de usuario para buscar</label>
                    </div>
                </div>
                <div id="div_tabla">                            
                    ${VerTabla(_cuentas,paginas,pagina_actual)}
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los usuarios</a>
        <a href="#!" onclick="${()=>nuevo()}" class="collection-item">Nuevo Usuario</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual){
    // ShowLoader()
    const usuario_busqueda = document.getElementById('usuario_busqueda').value.toUpperCase()
    fetchCuentas(5,pagina_actual,usuario_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.cuentas,paginas,pagina_actual)) 
        }
    })
}
function VerTabla(_cuentas,paginas,pagina_actual){
    return yo`
    <div>
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
                ${_cuentas.map(c=> yo`
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
function fetchCuentas(tamano_pagina,_numero_pagina,usuario_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            usuario_busqueda:usuario_busqueda
        })
    }
    fetch('http://localhost:5000/cuentas_api/get_cuentas', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}
function cuentas(_numero_pagina) {
    ShowLoader()
    fetchCuentas(5,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.cuentas,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { cuentas }