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

import { cajas } from '../ecaja.caja'
import { nuevaCaja } from '../ecaja.caja/nuevo'

function menu_administracion() {
   
    var sub_nav = yo`
    <div class="row">
        <ul class="collapsible" data-collapsible="accordion">
            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Sucursales
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>sucursales()}" class="collection-item"> Todas las sucursales</a>
                        <a href="#!" onclick="${()=>nuevaSucursal()}" class="collection-item">Nueva sucursal</a>
                    </div>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Almacenes
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>almacenes()}" class="collection-item"> Todos los almacenes</a>
                        <a href="#!" onclick="${()=>nuevoAlmacen()}" class="collection-item">Nuevo almacen</a>
                    </div>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Puntos de Ventas
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>puntos_ventas()}" class="collection-item"> Todos los puntos de ventas</a>
                        <a href="#!" onclick="${()=>nuevo_punto_venta()}" class="collection-item">Nuevo punto de venta</a>
                    </div>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Documentos
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>documentos()}" class="collection-item"> Todos los documentos</a>
                        <a href="#!" onclick="${()=>nuevoDocumento()}" class="collection-item">Nuevo documento</a>
                    </div>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Personas
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>personas()}" class="collection-item"> Todas las personas</a>
                        <a href="#!" onclick="${()=>nuevaPersona()}" class="collection-item">Nueva Persona</a>
                    </div>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Ubigeos
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>ubigeos()}" class="collection-item"> Todos los ubigeos</a>
                        <a href="#!" onclick="${()=>nuevoUbigeo()}" class="collection-item">Nuevo ubigeo</a>
                    </div>
                </div>
            </li>

            <li>
                <div class="collapsible-header">
                    <i class="material-icons">expand_more</i>Cajas
                </div>
                <div class="collapsible-body">
                    <div class="collection">
                        <a href="#!" onclick="${()=>cajas()}" class="collection-item"> Todas las cajas</a>
                        <a href="#!" onclick="${()=>nuevaCaja()}" class="collection-item">Nueva caja</a>
                    </div>
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