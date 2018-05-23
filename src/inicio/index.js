var yo = require('yo-yo')
var empty = require('empty-element');
function Ver() {
    var el = yo`
    <div class="row">
        <div class="col s12 m3">
            <ul class="cards">
        
                <li class="card-custom">
                <div class="row">
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                </div>
                </li>
                <li class="card-custom">
                <div class="row">
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                    
                </div>
                </li>
                <li class="card-custom">
                <div class="row">
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                </div>
                </li>
                <li class="card-custom">
                <div class="row">
                    <div class="card-content">
                        <p>I am a very simple card. I am good at containing small bits of information.</p>
                    </div>
                </div>
            
                </li>
            </ul>
        </div>
    </div>
        `;
    var container = document.getElementById('contenido_principal')
    empty(container).appendChild(el);
    var sub_nav = yo`
    <div class="collection">
        <a href="#!" class="collection-item active">Todas las mesas</a>
        <a href="#!" class="collection-item">Mesas Ocupadas</a>
        <a href="#!" class="collection-item">Mesas Libres</a>
    </div>
        `;
    var container = document.getElementById('sub_navegador_content')
    empty(container).appendChild(sub_nav)

    $('.cards').each(function(){

        var $this = $(this),
            $cards = $this.find('.card-custom'),
            $current = $cards.filter('.card--current'),
            $next;
    
        $cards.on('click',function(){
          if ( !$current.is(this) ) {
            $cards.removeClass('card--current card--out card--next');
            $current.addClass('card--out');
            $current = $(this).addClass('card--current');
            $next = $current.next();
            $next = $next.length ? $next : $cards.first();
            $next.addClass('card--next');
          }
        });
    
        if ( !$current.length ) {
          $current = $cards.last();
          $cards.first().trigger('click');
        }
    
        $this.addClass('cards--active');
    
      })
}
 

function inicio() {
    //Cargar Mesas
    Ver()
}

export { inicio }