var yo = require('yo-yo')
var empty = require('empty-element');

var stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
var rotate = true; //Activate the elements' rotation for each move on stacked cards.
var items = 3; //Number of visible elements when the stacked options are bottom or top.
var elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
var useOverlays = true; //Enable or disable the overlays for swipe elements.
var maxElements; //Total of stacked cards on DOM.
var currentPosition = 0; //Keep the position of active stacked card.
var velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
var topObj; //Keep the swipe top properties.
var rightObj; //Keep the swipe right properties.
var leftObj; //Keep the swipe left properties.
var listElNodesObj; //Keep the list of nodes from stacked cards.
var listElNodesWidth; //Keep the stacked cards width.
var currentElementObj; //Keep the stacked card element to swipe.
var stackedCardsObj;
var isFirstTime = true;
var elementHeight;
var obj;
var elTrans;
var addMargin;
var i;
var rotateElement;
		
 
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



    obj = document.getElementById('stacked-cards-block');
    stackedCardsObj = obj.querySelector('.stackedcards-container');
    listElNodesObj = stackedCardsObj.children;
    
    topObj = obj.querySelector('.stackedcards-overlay.top');
    rightObj = obj.querySelector('.stackedcards-overlay.right');
    leftObj = obj.querySelector('.stackedcards-overlay.left');
		
    countElements();
    currentElement();
    changeBackground();
    listElNodesWidth = stackedCardsObj.offsetWidth;
    currentElementObj = listElNodesObj[0];
    updateUi();
    
    //Prepare elements on DOM
    addMargin = elementsMargin * (items -1) + 'px';
    
    if(stackedOptions === "Top"){

        for(i = items; i < maxElements; i++){
            listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
        }
        
        elTrans = elementsMargin * (items - 1);
        
        stackedCardsObj.style.marginBottom = addMargin;
        
    } else if(stackedOptions === "Bottom"){
        
        
        for(i = items; i < maxElements; i++){
            listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');
        }
        
        elTrans = 0;
        
        stackedCardsObj.style.marginBottom = addMargin;
        
    } else if (stackedOptions === "None"){
        
        for(i = items; i < maxElements; i++){
            listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
        }
        
        elTrans = 0;
    
    }
        
    for(i = items; i < maxElements; i++){
        listElNodesObj[i].style.zIndex = 0;
        listElNodesObj[i].style.opacity = 0;
        listElNodesObj[i].style.webkitTransform ='scale(' + (1 - (items * 0.04)) +') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
        listElNodesObj[i].style.transform ='scale(' + (1 - (items * 0.04)) +') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
    }
    
    if(listElNodesObj[currentPosition]){
        listElNodesObj[currentPosition].classList.add('stackedcards-active');
    }
    
    if(useOverlays){
        leftObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        leftObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        
        rightObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        rightObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        
        topObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        topObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        
    } else {
        leftObj.className = '';
        rightObj.className = '';
        topObj.className = '';
        
        leftObj.classList.add('stackedcards-overlay-hidden');
        rightObj.classList.add('stackedcards-overlay-hidden');
        topObj.classList.add('stackedcards-overlay-hidden');
    }
    
    //Remove class init
    setTimeout(function() {
        obj.classList.remove('init');
    },150);


}

function transformUi(moveX,moveY,opacity,elementObj) {
    requestAnimationFrame(function(){  
        var element = elementObj;
        
        // Function to generate rotate value 
        function RotateRegulator(value) {
           if(value/10 > 15) {
               return 15;
           }
           else if(value/10 < -15) {
               return -15;
           }
           return value/10;
        }
        
        if(rotate){
            rotateElement = RotateRegulator(moveX);
        } else {
            rotateElement = 0;
        }
        
        if(stackedOptions === "Top"){
            elTrans = elementsMargin * (items - 1);
            if(element){     
                element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.opacity = opacity;
            }
        } else if(stackedOptions === "Bottom" || stackedOptions === "None"){
            
            if(element){
                element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                element.style.opacity = opacity;
            }
        
        }
    });	  
};

function countElements() {
    maxElements = listElNodesObj.length;
    if(items > maxElements){
        items = maxElements;
    }
};

function currentElement() {
    currentElementObj = listElNodesObj[currentPosition];
};

function changeBackground() { 
    document.body.classList.add("background-" + currentPosition + "");
};

function updateUi() {
    requestAnimationFrame(function(){
        elTrans = 0;
        var elZindex = 5;
        var elScale = 1;
        var elOpac = 1;
        var elTransTop = items;
        var elTransInc = elementsMargin;

        for(i = currentPosition; i < (currentPosition + items); i++){
            if(listElNodesObj[i]){
                if(stackedOptions === "Top"){

                    listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');

                    if(useOverlays){
                        leftObj.classList.add('stackedcards-origin-top');
                        rightObj.classList.add('stackedcards-origin-top');
                        topObj.classList.add('stackedcards-origin-top'); 
                    }

                    elTrans = elTransInc * elTransTop;
                    elTransTop--;

                } else if(stackedOptions === "Bottom"){
                    listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');

                    if(useOverlays){
                        leftObj.classList.add('stackedcards-origin-bottom');
                        rightObj.classList.add('stackedcards-origin-bottom');
                        topObj.classList.add('stackedcards-origin-bottom');
                    }

                    elTrans = elTrans + elTransInc;

                } else if (stackedOptions === "None"){

                    listElNodesObj[i].classList.add('stackedcards-none', 'stackedcards--animatable');
                    elTrans = elTrans + elTransInc;

                }

                listElNodesObj[i].style.transform ='scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                listElNodesObj[i].style.webkitTransform ='scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                listElNodesObj[i].style.opacity = elOpac;
                listElNodesObj[i].style.zIndex = elZindex;

                elScale = elScale - 0.04;
                elOpac = elOpac - (1 / items);
                elZindex--;
            }
        }

    });
  
};

function removeNoTransition() {
    if(listElNodesObj[currentPosition]){
        
        if(useOverlays) {
            leftObj.classList.remove('no-transition');
            rightObj.classList.remove('no-transition');
            topObj.classList.remove('no-transition');
        }
        
        listElNodesObj[currentPosition].classList.remove('no-transition');
        listElNodesObj[currentPosition].style.zIndex = 6;
    }
    
};

function changeStages() {
    if(currentPosition == maxElements){
        //Event listener created to know when transition ends and changes states
        listElNodesObj[maxElements - 1].addEventListener('transitionend', function(){
          document.body.classList.add("background-7");
          document.querySelector('.stage').classList.add('hidden'); 
          document.querySelector('.final-state').classList.remove('hidden');
          document.querySelector('.final-state').classList.add('active');
          listElNodesObj[maxElements - 1].removeEventListener('transitionend', null, false); 
      });
    }
};

function setActiveHidden() {
    if(!(currentPosition >= maxElements)){
        listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
        listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
        listElNodesObj[currentPosition].classList.add('stackedcards-active');
    }		 
};

function onSwipeLeft() {
    removeNoTransition();
    transformUi(-1000, 0, 0, currentElementObj);
    if(useOverlays){
        transformUi(-1000, 0, 0, leftObj); //Move leftOverlay
        transformUi(-1000, 0, 0, topObj); //Move topOverlay
        resetOverlayLeft();
    }
    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
    changeBackground();
    changeStages();
    setActiveHidden();
};

function resetOverlayLeft() {
    if(!(currentPosition >= maxElements)){
        if(useOverlays){
            setTimeout(function(){
                
                if(stackedOptions === "Top"){
                    
                    elTrans = elementsMargin * (items - 1);
                
                } else if(stackedOptions === "Bottom" || stackedOptions === "None"){
                    
                    elTrans = 0;
                
                }
                
                if(!isFirstTime){
                    
                    leftObj.classList.add('no-transition');
                    topObj.classList.add('no-transition');
                    
                }
                
                requestAnimationFrame(function(){
                    
                    leftObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    leftObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    leftObj.style.opacity = '0';
                    
                    topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.opacity = '0';
                
                });
                
            },300);
            
            isFirstTime = false;
        }
    }
};


function onActionLeft() {
    if(!(currentPosition >= maxElements)){
        if(useOverlays) {
            leftObj.classList.remove('no-transition');
            topObj.classList.remove('no-transition');
            leftObj.style.zIndex = '8';
            transformUi(0, 0, 1, leftObj);

        }
        
        setTimeout(function() {
            onSwipeLeft();
            resetOverlayLeft();
        },300);
    }
};

export {
    inicio
}