/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var rect;

    var animation = false;

    function init(){
        rect = document.getElementById('section-work').getBoundingClientRect();

        if(window.innerWidth > 1000 && window.innerWidth > window.innerHeight){
            document.addEventListener('scroll', getScrollDistance);
        } else {
            document.getElementById('section-work').classList.remove('animate');
            document.removeEventListener('scroll', getScrollDistance);
        }
    }

    function getScrollDistance(){
        if (window.pageYOffset >= rect.top - 80 && animation == false){
            animation = true;
            document.getElementById('section-work').classList.add('animate');
        }
    }

    init();

    window.addEventListener('resize', init);
})();
