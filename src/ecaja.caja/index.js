var yo = require('yo-yo')
var empty = require('empty-element');
import {nuevaCaja} from './nuevo'
function Ver(cajas,paginas,pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Cajas</span>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input id="caja_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                        <label for="caja_busqueda" >Ingrese la caja para buscar</label>
                    </div>
                </div>
                <div id="div_tabla">                            
                    ${VerTabla(cajas,paginas,pagina_actual)}
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las cajas</a>
        <a href="#!" onclick="${()=>nuevaCaja()}" class="collection-item">Nueva Caja</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
    $(".dropdown-button").dropdown();
}
function Buscar(pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const caja_busqueda = document.getElementById('caja_busqueda').value.toUpperCase()
    fetchCajas(tamano_pagina,pagina_actual,caja_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.cajas,paginas,pagina_actual)) 
        }
    })
}
function VerTabla(cajas,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Nombre Caja</th>
                    <th>Sucursal</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${cajas.map(c=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>nuevaCaja(c)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${c.nombre_caja}</td>
                    <td>${c.nombre_sucursal}</td>
                    <td>
                        <span class="new badge ${c.estado=="ACTIVO"? 'blue':'red'}" data-badge-caption="${c.estado}"></span>
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
function fetchCajas(tamano_pagina,_numero_pagina,caja_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            caja_busqueda
        })
    }
    fetch('http://localhost:5000/ecaja_caja/get_cajas', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}
function cajas(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchCajas(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            //Mostrar Error en vez del console.log() !!!!Importanteee!
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.cajas,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { cajas }