var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import {nuevoComprobante} from './nuevo'
function Ver(comprobantes,paginas,pagina_actual) {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Lista de Comprobantes</span>
                <div class="row">
                    <div class="input-field col s12">
                        <i class="material-icons prefix">search</i>
                        <input id="comprobante_busqueda" onkeyup="${()=>Buscar(1)}" type="text" class="validate">
                        <label for="comprobante_busqueda" >Ingrese el comprobante para buscar</label>
                    </div>
                </div>
                <div id="div_tabla">                            
                    ${VerTabla(comprobantes,paginas,pagina_actual)}
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
    const comprobante_busqueda = document.getElementById('comprobante_busqueda').value.toUpperCase()
    fetchComprobantes(tamano_pagina,pagina_actual,comprobante_busqueda,function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            var tabla_content = document.getElementById('div_tabla')
            empty(tabla_content).appendChild(VerTabla(res.comprobantes,paginas,pagina_actual)) 
        }
    })
}
function VerTabla(comprobantes,paginas,pagina_actual){
    return yo`
    <div>
        <table class="striped">
            <thead>
                <tr>
                    <th>Opc.</th>
                    <th>Cod. Documento.</th>
                    <th>Serie</th>
                    <th>Numero</th>
                    <th>Fecha Emision</th>
                    <th>Cliente</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
                ${comprobantes.map(c=> yo`
                <tr>
                    <td>
                        <a onclick=${()=>nuevoComprobante(c)} class="dropdown-button btn teal accent-3 btn-floating">
                        <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>${c.comp_cod_documento}</td>
                    <td>${c.comp_nro_serie}</td>
                    <td>${c.comp_numero}</td>
                    <td>${c.fecha_emision}</td>
                    <td>${c.nombre_cliente}</td>
                    <td>
                        <span class="new badge ${c.comp_estado=="EMITIDO"? 'blue':'red'}" data-badge-caption="${c.comp_estado}"></span>
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
function fetchComprobantes(tamano_pagina,_numero_pagina,comprobante_busqueda,callback){
    var numero_serie_busqueda = -1
    if (comprobante_busqueda.match(/^[0-9]+$/)!=null){
        numero_serie_busqueda =parseInt(comprobante_busqueda)
        comprobante_busqueda ="" 
    } 

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:_numero_pagina||1,
            tamano_pagina,
            comprobante_busqueda,
            numero_serie_busqueda
        })
    }
    console.log("parametros comprobante")
    console.log(parametros)

    fetch(URL+'/ecaja_comprobante/get_comprobantes', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}
function comprobantes(_numero_pagina) {
    ShowLoader()
    const tamano_pagina = 5
    fetchComprobantes(tamano_pagina,_numero_pagina,'',function(res){
        if (res.err) {
            //Mostrar Error en vez del console.log() !!!!Importanteee!
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            paginas = parseInt(paginas / tamano_pagina) + (paginas % tamano_pagina != 0 ? 1 : 0)

            Ver(res.comprobantes,paginas,_numero_pagina||1)
        }
        HideLoader()
    })
}

export { comprobantes }