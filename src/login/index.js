var yo = require('yo-yo')
var empty = require('empty-element');
import { URL } from '../constantes_entorno/constantes'
import { navegador } from '../navegador'
import { inicio } from '../Inicio'
function Ver() {
    var el = yo`
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Inicio de Sesion</span>
                <form class="col s12">
                    <div class="row" id="box_error" style="display:none;">
                        <div class="col s12">
                        <div class="card-panel  red lighten-2">
                            <span class="white-text" id = "text_error"></span>
                        </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="usuario" type="text" class="validate">
                            <label for="text" id="lusuario" data-error="" >Usuario</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="contrasena" type="password" class="validate">
                            <label for="password" id="lcontrasena">Contraseña</label>
                        </div>
                    </div>
                </form>
            </div>
            <div class="card-action">
                <a href="#" onclick="${() => Ingresar()}" class="btn">Ingresar</a>
            </div>
        </div>
    </div>
        `;
    return el
}
function Ingresar() {
    var props = {
        'usuario':{},
        'contrasena':{},
    }
    if(!Validar(props))
        return;
    ShowLoader()
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            usuario: document.getElementById('usuario').value,
            contrasena: document.getElementById('contrasena').value
        })
    }
    fetch(URL+'/login_', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                navegador(res.cuenta.usuario,res.modulos)
                inicio()
            }
            HideLoader()
        })

}
function login() {
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(Ver());
}

export { login }