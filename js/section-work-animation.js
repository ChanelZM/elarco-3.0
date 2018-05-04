/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var rect,
        i;

    var images = document.querySelectorAll('.img_movein'),
        animation = false;

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
        if (window.pageYOffset >= rect.top - 80 && animation == false){
            animation = true;
            document.removeEventListener('scroll', getScrollDistance);
            startAnimation();
        } else if (window.pageYOffset >= rect.top - 80){
            document.querySelector('.section-work-2.section__par').style.display = 'block';
        }
    }

    function startAnimation(){
        var count = 0;
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
        setTimeout(function(){
            images[0].style.right = '-100%';
        }, 2500);
        setInterval(function(){
            count++;
            images[count].style.right = '0';
            setTimeout(function(){
                images[count].style.right = '-100%';
                if(count == (images.length-1)){
                    count = -1;
                }
            }, 3000);
        }, 4000);
    }

    init();

    window.addEventListener('resize', init);
})();
