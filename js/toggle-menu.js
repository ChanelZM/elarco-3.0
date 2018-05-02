/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var hamburgerIcon = document.querySelector('.top-nav__menu-icon'),
        navList = document.querySelector('.top-nav__list'),
        homeLink = document.querySelector('.top-nav__item.hidden'),
        header = document.querySelector('.header'),
        logo = document.querySelector('.header__logo'),
        body = document.querySelector('body');

    navList.style.opacity = 0;

    hamburgerIcon.removeAttribute('hidden');
    homeLink.classList.remove('hidden');

    navList.classList.add('hidden');
    header.classList.add('header_toggle');

    if(document.querySelector('#work')){
        logo.classList.add('header__logo_hidden');
    }

    function toggleMenu(){
        //Close menu
        if(navList.className.indexOf('hidden') < 0){
            body.style.overflow = 'auto';
            navList.style.opacity = 0;
            hamburgerIcon.querySelector('rect:nth-of-type(1)').style.transform = '';
            hamburgerIcon.querySelector('rect:nth-of-type(3)').style.transform = '';

            hamburgerIcon.classList.remove('top-nav__menu-icon_close');
            setTimeout(function(){
                navList.classList.add('hidden');
            }, 300);
        //Open menu
        } else {
            hamburgerIcon.classList.add('top-nav__menu-icon_close');
            navList.classList.remove('hidden');

            body.style.overflow = 'hidden';
            hamburgerIcon.querySelector('rect:nth-of-type(1)').style.transform = 'translateX(3px) rotate(41deg)';
            hamburgerIcon.querySelector('rect:nth-of-type(3)').style.transform = 'rotate(-41deg) translate(-10px, -2px)';
            setTimeout(function(){
                navList.style.opacity = 1;
            }, 1);

        }
    }

    hamburgerIcon.addEventListener('click', toggleMenu);
})();
