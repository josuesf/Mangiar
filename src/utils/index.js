var stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
var rotate = true; //Activate the elements' rotation for each move on stacked cards.
var items = 3; //Number of visible elements when the stacked options are bottom or top.
var elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
var useOverlays = true; //Enable or disable the overlays for swipe elements.
var maxElements; //Total of stacked cards on DOM.
var currentPosition = 0; //Keep the position of active stacked card.
var velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
var topObj; //Keep the swipe top properties.
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
                        topObj.classList.add('stackedcards-origin-top'); 
                    }

                    elTrans = elTransInc * elTransTop;
                    elTransTop--;

                } else if(stackedOptions === "Bottom"){
                    listElNodesObj[i].classList.add('stackedcards-bottom', 'stackedcards--animatable', 'stackedcards-origin-bottom');

                    if(useOverlays){
                        leftObj.classList.add('stackedcards-origin-bottom');
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
            topObj.classList.remove('no-transition');
        }
        
        listElNodesObj[currentPosition].classList.remove('no-transition');
        listElNodesObj[currentPosition].style.zIndex = 6;
    }
    
};


function changeStages() {
    if(currentPosition == maxElements){
        //Event listener created to know when transition ends and changes states
        /*listElNodesObj[maxElements - 1].addEventListener('transitionend', function(){
            document.body.classList.add("background-7");
            document.querySelector('.stage').classList.add('hidden'); 
            document.querySelector('.final-state').classList.remove('hidden');
            document.querySelector('.final-state').classList.add('active');
            listElNodesObj[maxElements - 1].removeEventListener('transitionend', null, false); 
        });*/
    }
};

function setActiveHidden() {
    if(!(currentPosition >= maxElements)){
        listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
        listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
        listElNodesObj[currentPosition].classList.add('stackedcards-active');
    }		 
};

function onSwipeRight() {
    removeNoTransition();
    transformUi(400, 0, 0, currentElementObj);
    if(useOverlays){
        transformUi(400, 0, 0, topObj); //Move topOverlay
        resetOverlayRight();
    }

    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
    changeStages();
    setActiveHidden();
};

function resetOverlays() {
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

            },300);	// wait for animations time
            
            isFirstTime = false;							
        }
    }
};

function resetOverlayRight() {
    if(!(currentPosition >= maxElements)){
        if(useOverlays){
            setTimeout(function(){
                
                if(stackedOptions === "Top"){
                    
                    elTrans = elementsMargin * (items - 1);
                
                } else if(stackedOptions === "Bottom" || stackedOptions === "None"){
                    
                    elTrans = 0;
                
                }
                
                if(!isFirstTime){
                    
                    
                    topObj.classList.add('no-transition');
                    
                }
                
                requestAnimationFrame(function(){
                     
                    
                    topObj.style.transform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.webkitTransform = "translateX(0) translateY(" + elTrans + "px) translateZ(0)";
                    topObj.style.opacity = '0';
                
                });

            },300);
            
            isFirstTime = false;
        }
    }
};

function onSwipeLeft(ob) {
    removeNoTransition();
    transformUi(-1000, 0, 0, currentElementObj);
    if(useOverlays){
        transformUi(-1000, 0, 0, leftObj); //Move leftOverlay
        transformUi(-1000, 0, 0, topObj); //Move topOverlay
        resetOverlayLeft();
        if (ob!=undefined)
            ob.style.zIndex = '1'
    }
    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
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

function Init(){



    stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
    rotate = true; //Activate the elements' rotation for each move on stacked cards.
    items = 3; //Number of visible elements when the stacked options are bottom or top.
    elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
    useOverlays = true; //Enable or disable the overlays for swipe elements.
    maxElements=0; //Total of stacked cards on DOM.
    currentPosition = 0; //Keep the position of active stacked card.
    velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
    topObj=''; //Keep the swipe top properties.
    leftObj=''; //Keep the swipe left properties.
    listElNodesObj=''; //Keep the list of nodes from stacked cards.
    listElNodesWidth=''; //Keep the stacked cards width.
    currentElementObj=''; //Keep the stacked card element to swipe.
    stackedCardsObj='';
    isFirstTime = true;
    elementHeight=0;
    obj='';
    elTrans='';
    addMargin='';
    i='';
    rotateElement='';

    
    obj = document.getElementById('stacked-cards-block');
    stackedCardsObj = obj.querySelector('.stackedcards-container');
    listElNodesObj = stackedCardsObj.children;
    
    topObj = obj.querySelector('.stackedcards-overlay.top');
    leftObj = obj.querySelector('.stackedcards-overlay.left');
		
    countElements();
    currentElement();
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
         
        topObj.style.transform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        topObj.style.webkitTransform = 'translateX(0px) translateY(' + elTrans + 'px) translateZ(0px) rotate(0deg)';
        
    } else {
        leftObj.className = '';
        topObj.className = '';
        
        leftObj.classList.add('stackedcards-overlay-hidden');
        topObj.classList.add('stackedcards-overlay-hidden');
    }
    
    //Remove class init
    setTimeout(function() {
        obj.classList.remove('init');
    },150);
}

function onSwipeTop(ob) {
    removeNoTransition();
    transformUi(0, -1000, 0, currentElementObj);
    if(useOverlays){
        transformUi(0, -1000, 0, leftObj); //Move leftOverlay
        transformUi(0, -1000, 0, topObj); //Move topOverlay
        resetOverlays();
        if (ob!=undefined)
            ob.style.zIndex = '1'
    }

    currentPosition = currentPosition + 1;
    updateUi();
    currentElement();
    changeStages();
    setActiveHidden();
};

function onActionTop() {
    if(!(currentPosition >= maxElements)){
        if(useOverlays) {
            leftObj.classList.remove('no-transition');
            topObj.classList.remove('no-transition');
            topObj.style.zIndex = '8';
            transformUi(0, 0, 1, topObj);
        }
        
        setTimeout(function(){
            onSwipeTop(topObj);
            resetOverlays();
        },300); //wait animations end
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
            onSwipeLeft(leftObj);
            resetOverlayLeft();
        },300);
    }
};

function onActionRight() {
    if(!(currentPosition >= maxElements)){
        if(useOverlays) {
            topObj.classList.remove('no-transition'); 
        }

        setTimeout(function(){
            onSwipeRight();
            resetOverlayRight();
        },300);
    }
};

export { Init , onActionLeft , onActionTop }