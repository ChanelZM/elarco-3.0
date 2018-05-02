/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var rect;

    function init(){
        rect = document.getElementById('section-work').getBoundingClientRect();

        if(window.innerWidth > 1000 && window.innerWidth > window.innerHeight){
            document.querySelector('.section__par.section-work-2').style.display = 'none';
            document.addEventListener('scroll', getScrollDistance);
        } else {
            document.querySelector('.section__par.section-work-2').style.display = 'block';
            document.removeEventListener('scroll', getScrollDistance);
        }
    }

    function getScrollDistance(){
        if (window.pageYOffset >= rect.top){
            document.removeEventListener('scroll', getScrollDistance);
            startAnimation();
        }
    }

    function startAnimation(){
        document.querySelector('.section-work-1').classList.add('fade-out');
        document.querySelector('.section__work-button').style.display = 'block';
        document.querySelector('.section__work-button').style.opacity = '0';

        setTimeout(function(){
            document.getElementById('section-work').classList.add('move');
        }, 1000);

        setTimeout(function(){
            document.querySelector('.section__par.section-work-2').style.display = 'block';
            document.querySelectorAll('.section-work-2')[0].classList.add('move-in');
            document.querySelectorAll('.section-work-2')[1].classList.add('move-in');
        }, 1500);
        setTimeout(function(){
            document.querySelector('.section__work-button').style.opacity = '1';
        }, 3000);
    }

    init();

    window.addEventListener('resize', init);
})();
