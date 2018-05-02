/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var links = document.querySelectorAll('.half-part__sec-link'),
        buttons = document.querySelectorAll('.half-part__button'),
        screenWidth = 848;

    var i;

    function init(){
        document.querySelector('#china').classList.add('half-part_closed');

        if(window.innerWidth > window.innerHeight && window.innerWidth > screenWidth){
            //big Landscape
            document.querySelector('.split-wrap').classList.add('horizontal');
            addEventListeners(buttons, horizontalToggleAddress);
        } else if(window.innerWidth < window.innerHeight) {
            //portrait
            document.querySelector('.split-wrap').classList.add('vertical');
            addEventListeners(links, verticalToggleAddress);
        }

        toggleOrientation();
    }

    function toggleOrientation(){
        if(window.innerWidth > window.innerHeight && window.innerWidth > screenWidth){
            //Landscape
            document.querySelector('.split-wrap').className = 'split-wrap' + ' horizontal';
            addEventListeners(buttons, horizontalToggleAddress);
            removeEventListeners(links, verticalToggleAddress);
        } else if(window.innerWidth < window.innerHeight) {
            //portrait
            document.querySelector('.split-wrap').className = 'split-wrap' + ' vertical';
            removeEventListeners(buttons, horizontalToggleAddress);
            addEventListeners(links, verticalToggleAddress);
        } else {
            document.querySelector('.split-wrap').className = 'split-wrap';
            removeEventListeners(buttons, horizontalToggleAddress);
            removeEventListeners(links, verticalToggleAddress);
        }
    }

    function addEventListeners(arr, functionName){
        for(i = 0; i < arr.length; i++){
            arr[i].addEventListener('click', functionName);
        }

    }

    function removeEventListeners(arr, functionName){
        for(i = 0; i < arr.length; i++){
            arr[i].removeEventListener('click', functionName);
        }
    }

    function verticalToggleAddress(e){
        var id = e.target.href.split('#');

        if(id[1] == 'china'){
            document.querySelector('#china').classList.remove('half-part_closed');
            document.querySelector('#spain').classList.add('half-part_closed');
        } else if(id[1] == 'spain') {
            document.querySelector('#china').classList.add('half-part_closed');
            document.querySelector('#spain').classList.remove('half-part_closed');
        }
    }

    function horizontalToggleAddress(e){
        var id = e.target.href.split('#');

        if(id[1] == 'china'){
            // document.querySelector('#spain').style.margin = '0';
            document.querySelector('#spain .half-part__img').classList.add('half-part__img-bw');
            document.querySelector('#china .half-part__img').classList.remove('half-part__img-bw');
            document.querySelector('#spain').classList.remove('margin-open-barcelona');
            document.querySelector('#spain').classList.add('margin-open-china');
        } else if(id[1] == 'spain') {
            // document.querySelector('#spain').style.margin = '0';
            document.querySelector('#spain .half-part__img').classList.remove('half-part__img-bw');
            document.querySelector('#china .half-part__img').classList.add('half-part__img-bw');
            document.querySelector('#spain').classList.remove('margin-open-china');
            document.querySelector('#spain').classList.add('margin-open-barcelona');
        }
    }

    init();

    window.addEventListener('resize', toggleOrientation);

    for(i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('mouseenter', function(e){
            e.target.parentNode.querySelector('img').classList.remove('half-part__img-bw');

            if(e.target.hash == '#china' && document.querySelector('#spain.margin-open-barcelona')){
                document.querySelector('#spain').classList.remove('margin-open-barcelona');
                document.querySelector('#spain .half-part__img').classList.add('half-part__img-bw');
            }
            if(e.target.hash == '#spain' && document.querySelector('#spain.margin-open-china')){
                document.querySelector('#spain').classList.remove('margin-open-china');
                document.querySelector('#china .half-part__img').classList.add('half-part__img-bw');
            }
        });
        buttons[i].addEventListener('mouseleave', function(e){
            if(e.target.hash == '#china' && !document.querySelector('#spain.margin-open-china')){
                e.target.parentNode.querySelector('img').classList.add('half-part__img-bw');
            }
            if(e.target.hash == '#spain' && !document.querySelector('#spain.margin-open-barcelona')){
                e.target.parentNode.querySelector('img').classList.add('half-part__img-bw');
            }
        });
    }
})();
