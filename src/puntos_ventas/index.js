var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevo_punto_venta} from './nuevo'
function Ver(puntos_ventas,paginas,pagina_actual) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Puntos de Venta</span>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">search</i>
                            <input id="punto_venta_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                            <label for="punto_venta_busqueda" >Ingrese el nombre del punto de venta para buscar</label>
                        </div>
                    </div>
                    <div id="div_tabla">                            
                        ${VerTabla(puntos_ventas,paginas,pagina_actual)}
                    </div>
                </div>
            </div>
        </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Puntos de Venta</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo_punto_venta()}">Nuevo Punto de Venta</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}

function Buscar(pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const punto_venta_busqueda = document.getElementById('punto_venta_busqueda').value.toUpperCase()
    fetchPuntosVentas(tamano_pagina,pagina_actual,punto_venta_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.puntos_ventas,paginas,pagina_actual)) 
        }
    })
}

function VerTabla(puntos_ventas,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Nombre</th>
                    <th>Sucursal</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${puntos_ventas.map(p=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>nuevo_punto_venta(p)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${p.nombre_punto}</td>
                    <td>${p.cod_sucursal}</td>
                    <td>
                        <span class="new badge ${p.estado=="ACTIVO"? 'blue':'red'}" data-badge-caption="${p.estado}"></span>
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

function fetchPuntosVentas(tamano_pagina,_numero_pagina,punto_venta_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            punto_venta_busqueda
        })
    }
    fetch('http://localhost:5000/puntos_ventas_api/get_puntos_ventas', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}


function puntos_ventas(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchPuntosVentas(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.puntos_ventas,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { puntos_ventas }