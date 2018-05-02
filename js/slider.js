/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var sliderWrap = document.querySelectorAll('.basic-sldr-wrap'),
        sliderNav = document.querySelectorAll('.basic-sldr__nav-link');

    var interval = setInterval(startInterval, 3000),
        sliders = {};

    var i,
        index,
        touchX,
        rect,
        current;

    function init(){
        //Create object with information of every slider
        for(i = 0; i < sliderWrap.length; i++){
            rect = sliderWrap[i].querySelector('.basic-sldr__slide').getBoundingClientRect();

            sliders[sliderWrap[i].id] = {
                width: rect.width,
                nav: sliderWrap[i].querySelectorAll('.basic-sldr__nav-link'),
                slider: sliderWrap[i].querySelector('.basic-sldr'),
                slide: sliderWrap[i].querySelector('.basic-sldr__slide'),
                current: 1
            };

            //The first navigation link will be white because its active
            fillColor(sliders[sliderWrap[i].id].nav[0], sliders[sliderWrap[i].id].nav);
        }
    }

    init();

    //When the window resizes the values will be changed according to how its styled in css
    function adjustValues(){
        init();

        for(i = 0; i < sliderWrap.length; i++){
            smoothScroll(sliders[sliderWrap[i].id].slider, 0, sliders[sliderWrap[i].id].width);
        }
    }

    //Making sure that only the active slide has an active link
    function fillColor(target, nav){
        for(index = 0; index < nav.length; index++){
            if(nav[index].className.indexOf('basic-sldr__nav-link-active') >= 0){
                nav[index].classList.remove('basic-sldr__nav-link-active');
            }
        }
        target.classList.add('basic-sldr__nav-link-active');
    }

    //Gets called only when scroll-snap-points isn't supported
    function getSlideNumber(e){
        e.preventDefault();

        //Process to retrieve the ID of the slider that has been clicked
        var splitId = e.target.hash.split('_'),
            id = splitId[0].split('#')[1];

        sliders[id].current = splitId[1];

        resetInterval();
        smoothScroll(sliders[id].slider, sliders[id].current, sliders[id].width);
    }

    function smoothScroll(slider, to, px){
        slider.scroll({
            top: 0,
            left: (to - 1) * px,
            behavior: 'smooth'
        });
    }

    // //Fallback for scroll-snap-points-x isn't supported
    if('scrollSnapPointsX' in document.body.style){
        console.log('Scroll snap works');
    } else {
        console.log('Scroll snap does not work');

        //For every slider on the page add event listeners
        for(i = 0; i < sliderWrap.length; i++){
            //Retrieve position of the finger
            sliders[sliderWrap[i].id].slider.addEventListener('touchstart', function(e){
                //e.preventDefault() otherwise the carousel acts weird when the user swipes too fast.
                e.preventDefault();
                touchX = e.changedTouches[0].pageX;
            });

            //After the users touch ends, retrieve the position again and decide if the user swiped right or left
            sliders[sliderWrap[i].id].slider.addEventListener('touchend', function(e){
                var sliderId = e.target.parentNode.id.split('_')[0];

                //User swiped left so go forth a slide
                if (e.changedTouches[0].pageX < touchX){
                    //Calculation so that the user cannot go to a slide that isn't there
                    sliders[sliderId].current = sliders[sliderId].current == sliders[sliderId].nav.length ? sliders[sliderId].current : sliders[sliderId].current + 1;

                    fillColor(sliders[sliderId].nav[sliders[sliderId].current - 1], sliders[sliderId].nav);
                    smoothScroll(sliders[sliderId].slider, sliders[sliderId].current, sliders[sliderId].width);
                //User swiped right so go back a slide
                } else {
                    //Calculation so that the user cannot go to a slide that isn't there
                    sliders[sliderId].current = sliders[sliderId].current == 1 ? sliders[sliderId].current :  sliders[sliderId].current - 1;

                    fillColor(sliders[sliderId].nav[sliders[sliderId].current - 1], sliders[sliderId].nav);
                    smoothScroll(sliders[sliderId].slider, sliders[sliderId].current, sliders[sliderId].width);
                }
                resetInterval();
            });

            for(index = 0; index < sliders[sliderWrap[i].id].nav.length; index++){
                sliders[sliderWrap[i].id].nav[index].addEventListener('click', getSlideNumber);
            }
        }
    }

    //Sliders change slide every three seconds
    function startInterval(){
        for(i = 0; i < sliderWrap.length; i++){
            var slider = sliders[sliderWrap[i].id];

            slider.current == slider.nav.length ? slider.current = 1 : slider.current++;

            fillColor(slider.nav[slider.current-1], slider.nav);
            smoothScroll(slider.slider, slider.current, slider.width);
        }
    };

    function resetInterval(){
        clearInterval(interval);

        interval = setInterval(function(){
            startInterval();
        }, 3000);
    };

    //When the user clicks a navigation link, make it active
    for(i = 0; i < sliderNav.length; i++){
        sliderNav[i].addEventListener('click', function(e){
            nav = sliders[e.target.hash.split('#')[1].split('_')[0]].nav;
            fillColor(e.target, nav);
        });
    }

    for(i = 0; i < sliderWrap.length; i++){
        sliders[sliderWrap[i].id].slider.addEventListener('scroll', function(e){
            e = e || window.event;
            e.preventDefault();
        });
    }

    window.addEventListener('resize', adjustValues);

})();
