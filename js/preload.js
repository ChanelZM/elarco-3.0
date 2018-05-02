/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    window.addEventListener('load', function(){
        document.querySelector('.loader-wrapper').classList.add('loaded');
        setTimeout(function(){
            document.querySelector('.loader-wrapper').classList.add('hidden');
        }, 1000);
    });
})();
