var yo = require('yo-yo')
var empty = require('empty-element');

import { menu_administracion } from '../menu'
import { productos } from '../eproductos.producto'
import { inicio } from '../inicio'
import { sub_navegador } from '../sub_navegador'
import { login } from '../login'
import {cuentas} from '../eseguridad.cuenta'
import { modulos } from '../eseguridad.modulo'
import { perfiles } from '../eseguridad.perfil'
import { personas } from '../personas'
function Ver(login,modulos_cuenta) {
    var el = login ? yo`
        <nav>
            <div class="nav-wrapper" style="background-color:#2c2c54">
                <ul class="right hide-on-med-and-down">
                    <li>
                        <a onclick="${() => inicio()}">Inicio</a>
                    </li>
                    <li>
                        <a class="dropdown-button" href="#!" data-activates="Opciones">Configuracion
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        ${login!='ADMIN' ?yo`<ul id="Opciones" class="dropdown-content">
                            ${modulos_cuenta.map(m=> m.nivel_acceso==1 ? yo`
                            <li>
                                <a onclick="${() => AbrirModulo(m.ruta_modulo)}">${m.nombre}</a>
                            </li>
                            `:null)}
                        </ul>`:
                        yo`<ul id="Opciones" class="dropdown-content">
                            <li>
                                <a onclick="${() => menu_administracion()}">ADMINISTRACION</a>
                            </li>
                            <li>
                                <a onclick="${() => personas()}">CLIENTES</a>
                            </li>
                            <li>
                                <a onclick="${() => productos()}">PRODUCTOS</a>
                            </li>
                            <li>
                                <a onclick="${() => cuentas()}">USUARIOS</a>
                            </li>
                            <li>
                                <a onclick="${() => modulos()}">MODULOS</a>
                            </li>
                            <li>
                                <a onclick="${() => perfiles()}">PERFILES</a>
                            </li>
                        </ul>`}
                    </li>
                    <!-- Dropdown Trigger -->
                    <li>
                        <a class="dropdown-button" href="#!" data-activates="sesion">${login}
                            <i class="material-icons right">arrow_drop_down</i>
                        </a>
                        <ul id="sesion" class="dropdown-content">
                            <li>
                                <a onclick="${() => CerrarSesion()}">Salir</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>` : yo`<div></div>`;
    var container = document.getElementById('navegador_content')
    empty(container).appendChild(el);
    $(".dropdown-button").dropdown();
}
function AbrirModulo(ruta_modulo){
    switch(ruta_modulo){
        case 'personas' : 
            personas()
            break;
        case 'productos': 
            productos()
            break;
        case 'cuentas':
            cuentas()
            break;
        case 'modulos':
            modulos()
            break
        case 'perfiles':
            perfiles()
            break
        case 'menu_administracion':
            menu_administracion()
            break
    }
}
function CerrarSesion() {
    Ver()
    sub_navegador()
    login()
}

function navegador(login,modulos_cuenta) {
    Ver(login,modulos_cuenta)
}

export { navegador }