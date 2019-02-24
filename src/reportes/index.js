var yo = require('yo-yo')
var empty = require('empty-element');
import {
    URL
} from '../constantes_entorno/constantes'
import {
    navegador
} from '../navegador'
import {
    inicio
} from '../Inicio'

const anios = ['1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030']

const mes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre']

function Ver() {
    var el = yo `
    <div class="card horizontal">
        <div class="card-stacked">
            <div class="card-content">
                <span class="card-title">Reporte de ventas mensual</span>
                <div class="row">
                    <div class="input-field col s12">
                        <div class="row col s5">
                            <div class="input-field">
                                <select id="Anio">
                                    <option value=''>Seleccione el año</option>
                                    ${anios.map((e,index,array)=>
                                        yo`<option value=${array[index]}>${array[index]}</option>`   
                                    )}
                                </select>
                                <label id="lAnio">Seleccione el año</label>
                            </div>
                        </div>
                        <div class="row col s5">
                            <div class="input-field">
                                <select id="Mes">
                                    <option value=''>Seleccione el mes</option>
                                    ${mes.map((e,index,array)=>
                                        yo`<option value=${index+1}>${array[index]}</option>`   
                                    )}
                                </select>
                                <label id="lMes">Seleccione Mes</label>
                            </div>
                        </div>
                        <div class="row col s2">
                            <a href="#" onclick="${()=>GenerarReporte()}" class="btn">Generar</a>
                        </div>
                    </div>
                </div>
                <div id="div_tabla">
                </div>
            </div>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo `
        <div class="collection">
            <a href="#!" class="collection-item active">Ventas mensual</a>
        </div>
            `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)
    $('select').material_select();
}

function VerTabla(datos) {
    console.log(datos)
    var contentTable = yo `
        <div> 
        <table class="striped" id="tablaDatos">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody>
                ${datos.map(d=> yo`
                <tr>
                    <td>${d.descripcion_detalle}</td>
                    <td>${d.cantidad}</td>
                </tr>
                `)}
            </tbody>
        </table>
        <div class="row">
            <a class="waves-effect black white-text btn btn-small" onclick=${()=>ImprimirReporte()}><i class="material-icons left">print</i> Imprimir Reporte</a>
        </div>
        </div>`;
    var container = document.getElementById('div_tabla')
    empty(container).appendChild(contentTable);
}

function ImprimirReporte() {

    var doc = new jsPDF('p', 'pt');
    var rest = doc.autoTableHtmlToJson(document.getElementById("tablaDatos"));

    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Mangiar - Reporte Ventas", 10, 20);
    doc.setFontSize(10);
    doc.setFontStyle('bold');
    doc.text("Del mes " + $("#Mes option:selected").text() + " del " + $("#Anio").val(), 10, doc.autoTableEndPosY() + 35);

    doc.setFontSize(10);
    doc.setFontStyle('bold');

    doc.autoTable(rest.columns, rest.data, {
        startY: 45,
        margin: {
            horizontal: 10
        },
        tableWidth: 'wrap',
        margin: {
            top: 10
        },
        styles: {
            cellPadding: 2
        },
        headerStyles: {
            rowHeight: 14,
            fontSize: 12,
            valign: 'middle'
        },
        
        theme: 'plain',
        pageBreak: 'avoid',
    });



    var loc = window.location.pathname;
    var dir = loc.substring(0, loc.lastIndexOf('/'));
    var pdf = btoa(doc.output());

    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            data: pdf,
            nombre_pdf: 'reporte'
        })
    }
    fetch(URL + '/ws/save_pdf', parametros)
        .then(req => req.json())
        .then(res => {
            console.log(res)
            if (res.respuesta == "ok") {
                const winPDF = new BrowserWindow({
                    width: 800,
                    height: 600
                })
                PDFWindow.addSupport(winPDF)
                winPDF.loadURL(dir + '/assets/media/reporte.pdf')
                inicio()
            }
        })


}

function GenerarReporte() {
    var props = {
        'Anio': {},
        'Mes': {},
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
            anio: parseInt($("#Anio").val()),
            mes: parseInt($("#Mes").val())
        })
    }
    fetch(URL + '/ws/get_reporte_by_anio_mes', parametros)
        .then(req => req.json())
        .then(res => {
            if (res.err) {
                console.log(res.err)
            } else {
                if (res.datos.length > 0)
                    VerTabla(res.datos)
            }
            HideLoader()
        })

}

function reportes() {
    Ver();
}

export {
    reportes
}