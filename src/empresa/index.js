var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { nuevaEmpresa } from './nuevo'
function Ver(empresas,paginas,pagina_actual) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Empresas</span>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">search</i>
                            <input id="empresa_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                            <label for="empresa_busqueda" >Ingrese el nombre de la empresa para buscar</label>
                        </div>
                    </div>
                    <div id="div_tabla">                            
                        ${VerTabla(empresas,paginas,pagina_actual)}
                    </div>                    
                </div>               
            </div>
        </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
}

function Buscar(pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const empresa_busqueda = document.getElementById('empresa_busqueda').value.toUpperCase()
    fetchEmpresas(tamano_pagina,pagina_actual,empresa_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.empresas,paginas,pagina_actual)) 
        }
    })
}

function VerTabla(empresas,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${empresas.map(e=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>nuevaEmpresa(e)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${e.razon_social}</td>
                    <td>${e.direccion}</td>
                    <td>
                        <span class="new badge ${e.estado=="ACTIVO"? 'blue':'red'}" data-badge-caption="${e.estado}"></span>
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

function fetchEmpresas(tamano_pagina,_numero_pagina,empresa_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            empresa_busqueda
        })
    }
    fetch(URL+'/empresa_api/get_empresas', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function empresas(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchEmpresas(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.empresas,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { empresas }