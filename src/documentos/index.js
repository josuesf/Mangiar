var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import {nuevoDocumento} from './nuevo'
function Ver(documentos,paginas,pagina_actual) {
    var el = yo`
        <div class="card horizontal">
            <div class="card-stacked">
                <div class="card-content">
                    <span class="card-title">Lista de Documentos</span>
                    <div class="row">
                        <div class="input-field col s12">
                            <i class="material-icons prefix">search</i>
                            <input id="documento_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                            <label for="documento_busqueda" >Ingrese el nombre del documento para buscar</label>
                        </div>
                    </div>
                    <div id="div_tabla">                            
                        ${VerTabla(documentos,paginas,pagina_actual)}
                    </div>                    
                </div>               
            </div>
        </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    /*var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todos los Documentos</a>
        <a href="#!" class="collection-item" onclick="${()=>nuevo()}">Nuevo Documento</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)*/
}

function Buscar(pagina_actual){
    // ShowLoader()
    const tamano_pagina = 5
    const documento_busqueda = document.getElementById('documento_busqueda').value.toUpperCase()
    fetchDocumentos(tamano_pagina,pagina_actual,documento_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.documentos,paginas,pagina_actual)) 
        }
    })
}

function VerTabla(documentos,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Descripción</th>
                    <th>Tipo</th>
                    <th>Formato</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${documentos.map(d=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>nuevoDocumento(d)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${d.descripcion_doc}</td>
                    <td>${d.tipo_doc}</td>
                    <td>${d.formato_doc}</td>
                    <td>
                        <span class="new badge ${d.estado=="ACTIVO"? 'blue':'red'}" data-badge-caption="${d.estado}"></span>
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

function fetchDocumentos(tamano_pagina,_numero_pagina,documento_busqueda,callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            documento_busqueda
        })
    }
    fetch(URL+'/documentos_api/get_documentos', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function documentos(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchDocumentos(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.documentos,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { documentos }