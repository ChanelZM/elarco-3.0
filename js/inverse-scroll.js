/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projects = document.querySelectorAll('.project'),
        left = document.querySelector('#left'),
        right = document.querySelector('#right'),
        amountOfProjects = document.querySelectorAll('#right .project');

    var lastScrollPosition = 0,
        position = 0;

    var i,
        startMargin,
        projectHeight,
        touchStart,
        touchMove;

    function init(){
        projectHeight = getHeight(projects[0]);
        startMargin = -(amountOfProjects.length * projectHeight) + projectHeight;
        left.style.marginTop = '0px';
        right.style.marginTop = startMargin + 'px';
    }

    function getHeight(elem){
        var rect = elem.getBoundingClientRect();
        return rect.height;
    }

    //When the user resizes the page or changes their orientation
    function adjustValues(){
        position = 0;
        //If its landscape, recalculate margins
        if(window.innerWidth > window.innerHeight){
            if('ontouchstart' in document.documentElement == false){
                document.querySelector('.reverse').classList.add('overflow_hidden');
            }
            //Timeout because the browser uses a transition for resizing/changing orientation which conflicts with calculating project height.
            setTimeout(function(){
                window.addEventListener('wheel', detectScrollDirection);
                window.addEventListener('touchstart', getTouchStart);
                window.addEventListener('touchmove', detectTouchDirection);

                projectHeight = getHeight(projects[0]);
                startMargin = -(amountOfProjects.length * projectHeight) + projectHeight;

                left.style.marginTop = '0px';
                right.style.marginTop = startMargin + 'px';
            }, 300);
        //If its portrait, remove inverse scrolling effect.
        } else {
            document.querySelector('.reverse').classList.remove('overflow_hidden');
            window.removeEventListener('wheel', detectScrollDirection);
            window.removeEventListener('touchstart', getTouchStart);
            window.removeEventListener('touchmove', detectTouchDirection);

            left.style.marginTop = '0px';
            right.style.marginTop = '0px';
        }
    }

    //Desktop detect scroll direction
    function detectScrollDirection(e){
        //If the user scrolls up and they're not in the beginning
        if(e.deltaY < 0 && position > 0){
            position--;
            //remove listener so the function won't be fired again
            window.removeEventListener('wheel', detectScrollDirection);
            smoothScroll();
        }
        //If the user scrolls down and they're not at the end
        if(e.deltaY > 0 && position < amountOfProjects.length - 1){
            position++;
            window.removeEventListener('wheel', detectScrollDirection);
            smoothScroll();
        }
    }

    function getTouchStart(e){
        touchStart = e.touches[0].clientY;
    }

    //Touch devices detect touch direction
    function detectTouchDirection(e){
        touchMove = e.touches[0].clientY;

        if(touchMove > touchStart && position > 0){
            position--;
            window.removeEventListener('touchmove', detectTouchDirection);
            smoothScroll();
        }
        if(touchMove < touchStart && position < amountOfProjects.length - 1){
            position++;
            window.removeEventListener('touchmove', detectTouchDirection);
            smoothScroll();
        }
    }

    //Adapt margin to get an invert scrolling effect.
    function smoothScroll(){
        left.style.marginTop = '-' + position * projectHeight + 'px';
        right.style.marginTop = (startMargin + (position * projectHeight)) + 'px';

        //Make it possible for the user to do it again
        setTimeout(function(){
            window.addEventListener('wheel', detectScrollDirection);
            window.addEventListener('touchmove', detectTouchDirection);
        }, 1100);
    }

    //Only fire when the user is in landscape mode
    if(window.innerWidth > window.innerHeight && 'ontouchstart' in document.documentElement == false){
        document.querySelector('.reverse').classList.add('overflow_hidden');

        init();

        window.addEventListener('wheel', detectScrollDirection);
        window.addEventListener('resize', adjustValues);
    } else if(window.innerWidth > window.innerHeight && 'ontouchstart' in document.documentElement == true){
        document.querySelector('.reverse').classList.add('overflow_hidden');

        init();

        window.addEventListener('touchstart', getTouchStart);
        window.addEventListener('touchmove', detectTouchDirection);
        window.addEventListener('resize', adjustValues);
    }
})();
