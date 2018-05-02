/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var sections = document.querySelectorAll('.service-sldr__section'),
        links = document.querySelectorAll('.service-sldr__link'),
        images = document.querySelectorAll('.service-sldr__img-wrap');

    var count = 0;
        //var cur = parseInt(currentSlide.split('service-sldr-')[1]) + 1;

    var i,
        interval;

    function init(){
        sections[0].classList.add('service-sldr__section-active');
    }

    function getHash(e){
        e.preventDefault();

        var hash = e.target.hash;
        count = parseInt(hash.split('#service-sldr-')[1]) - 1;

        resetInterval();
        changeSlide(e.target.parentNode.parentNode.parentNode, hash);
    }

    function changeSlide(section, hash){
        for(i = 0; i < images.length; i++){
            images[i].classList.add('service-sldr__img-wrap_hidden');
            sections[i].classList.remove('service-sldr__section-active');
        }

        document.querySelector(hash).classList.remove('service-sldr__img-wrap_hidden');
        section.classList.add('service-sldr__section-active');
    }

    function startInterval(){
        count == 2 ? count = 0 : count++;
        changeSlide(sections[count], links[count].hash);
    };

    function resetInterval(){
        clearInterval(interval);

        interval = setInterval(function(){
            startInterval();
        }, 3000);
    };

    function checkScreenSize(){
        if(window.innerWidth >= 976){
            init();

            for(i = 0; i < links.length; i++){
                links[i].addEventListener('mouseenter', getHash);
            }

            if(!interval){
                interval = setInterval(startInterval, 3000);
            }
        }
    }

    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
})();
