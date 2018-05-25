var yo = require('yo-yo')
var empty = require('empty-element');
import { Init,onActionLeft } from '../utils'
 
function Ver(puntos_ventas,paginas) {
    var el =''
    if(paginas <= 4){
        el = yo `
            <div class="row">
                <p></p>
                <div class="row">
                    ${puntos_ventas.map(p=> yo`
                        <div class="col m3"> 
                            <div class="card">
                                <div class="main-card">
                                    <div class="card-custom">
                                        <div class="card-front">
                                            <article title="${p.estado=="ACTIVO"? 'item1':p.estado=="ESPERA"?'item2':'item3'}"><h1>${p.nombre_punto}</h1><div class="circle"></div></article>
                                        </div>
                                        <div class="card-back">
                                            <article title="${p.estado=="ACTIVO"? 'item1':p.estado=="ESPERA"?'item2':'item3'}"><h1>Detalles</h1>
                                                <div class="row"> 
                                                    <div class="section">
                                                        <a class="waves-effect waves-light btn-small">
                                                            <i class="material-icons left">local_printshop</i>Facturar
                                                        </a>
                                                    </div>
                                                    <div class="section">
                                                        <a class="waves-effect waves-light btn-small">
                                                            <i class="material-icons left">panorama_fish_eye</i>Ver más
                                                        </a>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    `)}
                </div>
            </div>`;
    }else{
        const numeroFilas = Math.floor(paginas/4)
        const restante = paginas % 4
        el = yo `
            <div class="container">
                ${Array.apply(null, Array(numeroFilas)).map(e=>yo`
                    <div class="row">
                        ${puntos_ventas.map(p=> yo`
                            <div class="col m3"> 
                                <div class="main-card">
                                    <div class="card-custom">
                                        <div class="card-front">
                                            <article title="${p.estado=="ACTIVO"? 'item1':p.estado=="ESPERA"?'item2':'item3'}"><h1>${p.nombre_punto}</h1><div class="row text-center"><div class="circle"></div></div></article>
                                        </div>
                                        <div class="card-back">
                                            <article title="${p.estado=="ACTIVO"? 'item1':p.estado=="ESPERA"?'item2':'item3'}"><h1>Detalles</h1>
                                                <div class="row"> 
                                                    <div class="section">
                                                        <a class="waves-effect waves-light btn-small">
                                                            <i class="material-icons left">local_printshop</i>Facturar
                                                        </a>
                                                    </div>
                                                    <div class="section">
                                                        <a class="waves-effect waves-light btn-small" onclick=${()=>VerDetallesPedido()}>
                                                            <i class="material-icons left">panorama_fish_eye</i>Ver más
                                                        </a>
                                                    </div>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `)}
                    </div>
                `)}
                <div class="row">
                    ${puntos_ventas.map(p=> yo`
                        <div class="col m3"> 
                            <div class="main-card">
                                <div class="card-custom">
                                    <div class="card-front">
                                        <article title="${p.estado=="ACTIVO"? 'item1':p.estado=="ESPERA"?'item2':'item3'}"><h1>${p.nombre_punto}</h1><div class="row text-center"><div class="circle"></div></div></article>
                                    </div>
                                    <div class="card-back">
                                        <article title="${p.estado=="ACTIVO"? 'item1':p.estado=="ESPERA"?'item2':'item3'}"><h1>Detalles</h1>
                                            <div class="row"> 
                                                <div class="section">
                                                    <a class="waves-effect waves-light btn-small">
                                                        <i class="material-icons left">local_printshop</i>Facturar
                                                    </a>
                                                </div>
                                                <div class="section">
                                                    <a class="waves-effect waves-light btn-small" onclick=${()=>VerDetallesPedido()}>
                                                        <i class="material-icons left">panorama_fish_eye</i>Ver más
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `)}
                </div>
            </div>`; 
    }
    //const numeroFilas = Math.floor(paginas/4) 
     
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo `
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las mesas</a>
        <a href="#!" class="collection-item">Mesas Ocupadas</a>
        <a href="#!" class="collection-item">Mesas Libres</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav) 
}

function fetchPuntosVentas(callback){
    const parametros = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            numero_pagina:null,
            tamano_pagina:null,
            punto_venta_busqueda:''
        })
    }
    fetch('http://localhost:5000/puntos_ventas_api/get_puntos_ventas', parametros)
        .then(req => req.json())
        .then(res => {
            callback(res)
        })
}

function inicio() {
    ShowLoader()
    fetchPuntosVentas(function(res){
        if (res.err) {
            console.log(res.err)
        } else {
            var paginas = parseInt(res.num_filas)
            Ver(res.puntos_ventas,paginas)
        }
        HideLoader()
    })
}


function VerDetallesPedido() {
    var el = yo`
    <div class="row"> 
            <h5 class="header">Detalle del pedido</h5>
            <div class="row">
                <form class="col s12">
                    <div class="row" id="divDetalles">

                        <div class="stage">
                            <div class="title">What Kind of Traveler Are You?</div>
                            <div id="stacked-cards-block" class="stackedcards stackedcards--animatable init">
                                <div class="stackedcards-container">
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/gQsq07/Adventure_and_Outdoor.png" width="100%" height="100%"/></div>
                                     
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular <br/> Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/jmEYL7/adventure_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/nsCynn/adventure_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/hmsL07/adventure_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/fXPg7n/Beach_and_Chill.png" width="100%" height="100%"/></div>
                                    <div class="card-titles">
                                        <h1>Beach <br/> and Chill</h1>
                                        <h3>12 Destinations</h3>
                                    </div>  
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/muiA07/beach_chill_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/emAOL7/beach_chill_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/invq07/beach_chill_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/c9gTnn/Romantic_Gateways.png" width="100%" height="100%"/></div>
                                    <div class="card-titles">
                                        <h1>Romantic <br/> Gateways</h1>
                                        <h3>15 Destinations</h3>
                                    </div>  
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/nQrkYS/romantic_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/ioqOL7/romantic_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/mXSESn/romantic_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/jY88nn/city_breaks.png" width="100%" height="100%"/></div>
                                    <div class="card-titles">
                                        <h1>City <br/> Breaks</h1>
                                        <h3>32 Destinations</h3>
                                    </div>  
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/myaetS/city_break_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/ciocf7/city_break_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/i2e5YS/city_break_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/eBNZSn/Family_Vacation.png" width="100%" height="100%"/></div>
                                    <div class="card-titles">
                                        <h1>Family <br/> Vancation</h1>
                                        <h3>20 Destinations</h3>
                                    </div>  
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/kEN3L7/family_vacation_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/iA8M7n/family_vacation_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/mXOcf7/family_vacation_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/epvM7n/Art_and_culture.png" width="100%" height="100%"/></div>
                                    <div class="card-titles">
                                        <h1>Art and <br/> Culture</h1>
                                        <h3>18 Destinations</h3>
                                    </div>  
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/kVPYL7/art_culture_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/dp4Tnn/art_culture_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/bu6KtS/art_culture_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-content">
                                    <div class="card-image"><img src="https://image.ibb.co/bXTXV7/Far_and_Away_2x.png" width="100%" height="100%"/></div>
                                    <div class="card-titles">
                                        <h1>Far and <br/> Away</h1>
                                        <h3>23 Destinations</h3>
                                    </div>  
                                    </div>
                                    <div class="card-footer">
                                    <div class="popular-destinations-text">Popular <br/> Destinations</div>
                                    <div class="popular-destinations-images">
                                        <div class="circle"><img src="https://image.ibb.co/fOYztS/far_away_1.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/izdXDS/far_away_2.jpg" width="100%" height="100%"/></div>
                                        <div class="circle"><img src="https://image.ibb.co/mqwKtS/far_away_3.jpg" width="100%" height="100%"/></div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="stackedcards--animatable stackedcards-overlay top"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png"  width="auto" height="auto"/></div>
                                <div class="stackedcards--animatable stackedcards-overlay right"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="auto" height="auto"/></div>
                                <div class="stackedcards--animatable stackedcards-overlay left"><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="auto" height="auto"/></div>
                            </div>
                            <div class="global-actions">
                                <div class="left-action" onclick=${()=>onActionLeft()}><img src="https://image.ibb.co/heTxf7/20_status_close_3x.png" width="26" height="26"/></div>
                                <div class="top-action"><img src="https://image.ibb.co/m1ykYS/rank_army_star_2_3x.png" width="18" height="16"/></div>
                                <div class="right-action"><img src="https://image.ibb.co/dCuESn/Path_3x.png" width="30" height="28"/></div>
                            </div>
                        </div>
                    
                        <div class="final-state hidden"><h2>Got it! We received your preferences! <br/> To submit again, press F5.</h2></div>
                        
                    </div>               
                                 
                </form>
            </div>
        </div>
    </div>`;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    Init()
}


export {
    inicio
}