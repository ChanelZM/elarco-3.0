/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var projects = document.querySelectorAll('.project'),
        i;

    //Transition one picture into the other
    function toggleImage(e){
        var images = e.target.querySelectorAll('.project__image');

        if(images[0].className.indexOf('project__image_opacity-0')>= 0){
            images[0].classList.remove('project__image_opacity-0');
            images[1].classList.add('project__image_opacity-0');
        } else {
            images[0].classList.add('project__image_opacity-0');
            images[1].classList.remove('project__image_opacity-0');
        }
    }

    for(i = 0; i < projects.length; i++){
        projects[i].addEventListener('mouseenter', toggleImage);
        projects[i].addEventListener('mouseleave', toggleImage);
    }
})();
