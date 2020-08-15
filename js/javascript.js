const navBtn = document.querySelector('.nav-btn');
const collapseNav = document.querySelector('.small-screen-navbar');
const prev = document.querySelector('#testimonials .fa-chevron-left');
const next = document.querySelector('#testimonials .fa-chevron-right');
const carousel = document.querySelector('#testimonials .client-carousel-wrapper');
const dots = document.querySelectorAll('#testimonials .carousel-dots span');
let count = 0;
let active = 1;


window.onload = function(){
	document.querySelector('#preloader').style.display = 'none';
	$('html, body').css({
	  'overflow-x': 'hidden',
	})
    document.querySelector('#showcase').style.transform = 'scale(1)';
	setTimeout(()=>{
	    document.querySelector('header').style.top = '0';
	}, 500)
	setTimeout(()=>{
	    document.querySelector('.showcase-title-wrap').style.left = '0';
	}, 1500)
    
    widescreenNavbar();
    collapseNavbar();
    tinySlider();
    clientCarousel();
    projects();

    $('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $(this).attr('href') ).offset().top
	    }, 1000);
	    return false;
	});

	$('#myModal').on('shown.bs.modal', function (e) { 
	  $("#video").attr('src' + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
	})
	$('#myModal').on('hide.bs.modal', function (e) {
	    $("#video").attr('src'); 
	})

}

function widescreenNavbar(){
	const wideNavbar = document.querySelector('#wide-screen-navbar');
	window.addEventListener('scroll',()=>{
      if(window.pageYOffset <= 200){
      	 wideNavbar.style.top = '-100px';
      }else{
      	 wideNavbar.style.top = '0';
      }
      achievmentCounter(window.pageYOffset);
    })
}

function collapseNavbar(){
	navBtn.addEventListener('click',()=>{
		if(collapseNav.style.top !== '100%'){
	       collapseNav.style.top = '100%';
	    }else{
	       collapseNav.style.top = '-200%';
	    }
	})
}

function activeNavbar(){
	const activeLists = document.querySelectorAll('#wide-screen-navbar a');
	activeLists.forEach(activeList =>{
        activeList.addEventListener('click', (e)=>{
	        for(let i = 0; i < activeLists.length; i++){
	            activeLists[i].classList.remove('active');
         	}
     	    e.target.classList.add('active');
	    })
	    	// activeNavList.classList.remove('active');
	    	// e.target.classList.add('active');
	})
}
activeNavbar();

function tinySlider(){
	const serivce = tns({
		container: ".service-carousel",
		items: 4,
		loop: true,
		nav: false,
		mouseDrag: true,
		swipeAngle: false,
		speed: 400,
		controlsContainer: ".customized-controls",
		responsive: {
			350:{
				items: 1,
			},
			640:{
		    items: 2,
			},
			840:{
				items: 3,
			},
			1110:{
				items: 4,
			},
		}
	})
	const brands = tns({
		container: ".brands-box",
		items: 5,
		loop: true,
		nav: false,
		swipeAngle: false,
		speed: 400,
		autoplay: true,
		autoplayTimeout: 3500,
		autoplayButton: false,
		autoplayButtonOutput: false,
		controls: false,
		responsive: {
			350:{
				items: 2,
			},
			640:{
		    items: 2,
			},
			840:{
				items: 3,
			},
			1110:{
				items: 5,
			},
		}
	})
}

function achievmentCounter(pagePosition){
	const counters = document.querySelectorAll('#achievment h1');
	let num = 4300;
	if(pagePosition >= num){
	    counters.forEach(counter =>{
		    if(counter.textContent === '0'){
		        largecounter(counter);
		        smallCounter(counter);
		    }else{
		    	return null;
		    }
	    })
	}
}

function largecounter(counter){
	if(counter.className === 'large-counter'){
		let increament = 0;
	    let interval = setInterval(updatCount,1);
	    function updatCount(){
		    if(increament < counter.getAttribute('data-counter')){
	          increament+=2;
	          counter.textContent = increament;
		    }else{
		   	  clearInterval(interval)
		    }
	    }
	}

}

function smallCounter(counter){
	if(counter.className === 'small-counter'){
	    let increament = 0;
	    let interval = setInterval(updatCount,120);
	    function updatCount(){
		    if(increament < counter.getAttribute('data-counter')){
	          increament++;
	          counter.textContent = increament;
		    }else{
		   	  clearInterval(interval)
		    }
	    }
	}
}

function projects(){
	let iso = new Isotope( '.grid', {
	  itemSelector: '.item',
	  layoutMode: 'fitRows'
	});

	let filtersElem = document.querySelector('.filters-button-group');
	filtersElem.addEventListener( 'click', event => {
	  let filterValue = event.target.getAttribute('data-filter');
	  iso.arrange({ filter: filterValue });
	});

	let buttonGroups = document.querySelectorAll('.button-group');
	buttonGroups.forEach(buttonGroup =>{
		buttonGroup.addEventListener( 'click', function( event ) {
			buttonGroup.querySelector('.active').classList.remove('active');
			event.target.classList.add('active');
		});
	})
}

function clientCarousel(){
    prev.addEventListener('click', ()=>{
    	count--;
    	active--;
    	if(count === -1){
    		count = 2;
    		active = 3;
            carousel.style.left = '-200%';
            for(i in dots){
            	dots[i].classList.remove('active');
			    dots[2].classList.add('active');
            }
    	}else{
    		dots.forEach(dot =>{
			    dot.classList.remove('active');
			    if(dot.className === `active-${active}`){
			        dot.classList.add('active');
			    }
    		})
            carousel.style.left = `-${count}00%`;
    	}
    })

    next.addEventListener('click', ()=>{
    	count++;
    	active++;
    	if(count === 3){
    		count = 0;
    		active = 1;
            carousel.style.left = '0';
            for(i in dots){
            	dots[i].classList.remove('active');
			    dots[0].classList.add('active');
            }
    	}else{
    		dots.forEach(dot =>{
			    dot.classList.remove('active');
			    if(dot.className === `active-${active}`){
			        dot.classList.add('active');
			    }
    		})
            carousel.style.left = `-${count}00%`;
    	}
    })
}