var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevaSucursal} from './nuevo'
function Ver(sucursales,paginas,pagina_actual) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Sucursales</span>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">search</i>
                            <input id="sucursal_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                            <label for="sucursal_busqueda" >Ingrese el nombre de la sucursal para buscar</label>
                        </div>
                    </div>
                    <div id="div_tabla">                            
                        ${VerTabla(sucursales,paginas,pagina_actual)}
                    </div>
                </div>
            </div>
        </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las Sucursales</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nueva Sucursal</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $(".dropdown-button").dropdown();*/
}

function Buscar(pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const sucursal_busqueda = document.getElementById('sucursal_busqueda').value.toUpperCase()
    fetchSucursales(tamano_pagina,pagina_actual,sucursal_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.sucursales,paginas,pagina_actual)) 
        }
    })
}

function VerTabla(sucursales,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Nombre</th>
                    <th>Dirección</th>
                    <th>Teléfono</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${sucursales.map(s=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>nuevaSucursal(s)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${s.nombre}</td>
                    <td>${s.direccion}</td>
                    <td>${s.telefono}</td>
                    <td>
                        <span class="new badge ${s.estado=="ACTIVO"? 'blue':'red'}" data-badge-caption="${s.estado}"></span>
                    </td>
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

function fetchSucursales(tamano_pagina,_numero_pagina,sucursal_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            sucursal_busqueda
        })
    }
    fetch('http://localhost:5000/sucursales_api/get_sucursales', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}


function sucursales(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchSucursales(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.sucursales,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { sucursales }