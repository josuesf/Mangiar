var yo = require('yo-yo')
var empty = require('empty-element');

import { sucursales } from '../sucursales'
import {nuevaSucursal} from '../sucursales/nuevo'

import { almacenes } from '../almacenes'
import { nuevoAlmacen } from '../almacenes/nuevo'

import { puntos_ventas } from '../puntos_ventas'
import { nuevo_punto_venta } from '../puntos_ventas/nuevo'

import { documentos } from '../documentos'
import { nuevoDocumento } from '../documentos/nuevo'

import { personas } from '../personas'
import { nuevaPersona } from '../personas/nuevo'

import { ubigeos } from '../ubigeos'
import { nuevoUbigeo } from '../ubigeos/nuevo'

function menu_administracion() {
   
    var sub_nav = yo`
    <div class="row">
        <ul class="collapsible" data-collapsible="accordion">
            <li id="liSucursales">
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Sucursales
                </div>
                <div class="collapsible-body">
                    <li>
                        <div class="collapsible-header" onclick="${()=>sucursales()}" style="cursor:pointer">
                            Todas las sucursales
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onclick="${()=>nuevaSucursal()}" style="cursor:pointer">
                            Nueva sucursal
                        </div>
                    </li>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Almacenes
                </div>
                <div class="collapsible-body"  >
                    <li>
                        <div class="collapsible-header" onclick="${()=>almacenes()}" style="cursor:pointer">
                            Todos los almacenes
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onclick="${()=>nuevoAlmacen()}" style="cursor:pointer">
                            Nuevo almacen
                        </div>
                    </li>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Puntos de Ventas
                </div>
                <div class="collapsible-body"  >
                    <li>
                        <div class="collapsible-header" onclick="${()=>puntos_ventas()}" style="cursor:pointer">
                            Todos los puntos de ventas
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onclick="${()=>nuevo_punto_venta()}" style="cursor:pointer">
                            Nuevo punto de venta
                        </div>
                    </li>
                </div>
            </li>

            

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Documentos
                </div>
                <div class="collapsible-body"  >
                    <li>
                        <div class="collapsible-header" onclick="${()=>documentos()}" style="cursor:pointer">
                            Todos los documentos
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header"onclick="${()=>nuevoDocumento()}" style="cursor:pointer">
                            Nuevo documento
                        </div>
                    </li>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Personas
                </div>
                <div class="collapsible-body"  >
                    <li>
                        <div class="collapsible-header" onclick="${()=>personas()}" style="cursor:pointer">
                            Todas las personas
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onclick="${()=>nuevaPersona()}" style="cursor:pointer">
                            Nueva persona
                        </div>
                    </li>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Ubigeos
                </div>
                <div class="collapsible-body"  >
                    <li>
                        <div class="collapsible-header" onclick="${()=>ubigeos()}" style="cursor:pointer">
                            Todos los ubigeos
                        </div>
                    </li>
                    <li>
                        <div class="collapsible-header" onclick="${()=>nuevoUbigeo()}" style="cursor:pointer">
                            Nueva Ubigeo
                        </div>
                    </li>
                </div>
            </li>

        </ul>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('.collapsible').collapsible()
    empty(document.getElementById('contenido_principal'))
    //sucursales()
}

 
export { menu_administracion }