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
                <span class="card-title">Reporte de ventas mensual</span>
                <div class="row col s6">
                    <div class="input-field">
                        <select>
                        <option value="" disabled selected>Seleccione Mes</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        </select>
                        <label>Seleccione Mes</label>
                        <a href="#" onclick="" class="btn">Generar</a>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
        <div class="collection">
            <a href="#!" class="collection-item active">Ventas mensual</a>
        </div>
            `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}
function Ingresar() {
    var props = {
        'usuario': {},
        'contrasena': {},
    }
    if (!Validar(props))
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
    fetch(URL + '/login_', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                $('#text_error').text(res.err)
                $('#box_error').show()
            } else {
                navegador(res.cuenta.usuario, res.modulos)
                inicio()
            }
            HideLoader()
        })

}
function reportes() {
    Ver();
}

export { reportes }