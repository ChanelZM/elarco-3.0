/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
(function(){
    var gamesWrap = document.querySelector('.games'),
        gameSections = document.querySelectorAll('.games__game'),
        gameCompleteInfo = document.querySelectorAll('.games__game .section__content-wrap'),
        continueButtons = document.querySelectorAll('.games .game-continue'),
        startSection = document.querySelector('.games__start'),
        pauseSection = document.querySelector('.games__pause'),
        startButton = document.querySelector('.games .game-start'),
        blurDivs = document.querySelectorAll('.games .blur'),
        scrollDown = document.querySelector('.scroll-down');

    var count = 0,
        gamesRect = gameSections[0].getBoundingClientRect();

    var index;

    document.querySelector('.complete-sound').load();

    var games = {
        order: function(){
            var orderArchParts = document.querySelectorAll('.arch-order__part'),
                correctSounds = document.querySelectorAll('.doremifasol');

            var counts = 0,
                correctCombos = [
                    [1, 2, 3, 4, 5],
                    [2, 1, 4, 3, 5]
                ];

            var chosenCombo,
            i;

            for(i = 0; i < correctSounds.length; i++){
                correctSounds[i].load();
            }

            function checkIfRightPart(e){
                //Depending on the first arch part the user clicks, determine which combination will be used
                if(counts == 0){
                    if(e.target.id == '1'){
                        chosenCombo = correctCombos[0];
                    } else if(e.target.id == '2'){
                        chosenCombo = correctCombos[1];
                    }
                }
                if(counts == 2){
                    if(e.target.id == '4'){
                        chosenCombo = correctCombos[1];
                    } else if(e.target.id == '3'){
                        chosenCombo = correctCombos[0];
                    }
                }

                //If the user clicks the right part, turn part white
                if(e.target.id == chosenCombo[counts]){
                    correctSounds[counts].play();
                    counts++;
                    e.target.classList.add('white');
                    //Else start over again
                } else {
                    counts = 0;
                    document.querySelector('.wrong-sound').play();

                    for(i = 0; i < orderArchParts.length; i++){
                        orderArchParts[i].classList.remove('white');
                    }

                    //Feedback so the user knows the input was wrong
                    e.target.classList.add('vibrate');
                    setTimeout(function(){
                        e.target.classList.remove('vibrate');
                    }, 501);
                }

                //If you have completed the game, show description about keyword, remove event listeners
                if(counts == 5){
                    toggleGameInfo('order');

                    for(i = 0; i < orderArchParts.length; i++){
                        orderArchParts[i].removeEventListener('click', checkIfRightPart);
                    }
                }
            }

            for(i = 0; i < orderArchParts.length; i++){
                orderArchParts[i].addEventListener('click', checkIfRightPart);
            }
        },
        depth: function(){
            var arches = document.querySelectorAll('.arch-depth'),
                sound = document.querySelector('.sonar');

            var halfWidthArch,
                halfHeightArch,
                centerPositionX,
                centerPositionY,
                xCoor,
                yCoor,
                i;

            sound.load();

            //Function to get the position of the center of the arch in pixels.
            function getArchDimensions(){
                var dimensions = arches[0].getBoundingClientRect();

                halfWidthArch = dimensions.width /2;
                halfHeightArch = dimensions.height /2;
                centerPositionX = dimensions.left + halfWidthArch;
                centerPositionY = dimensions.top + halfHeightArch;
            }

            //Execute setArchPosition with the coordinates of the mouse on screen
            function getMousePosition(e){
                setArchPosition(e.pageX, e.pageY);
            }

            function setInitValues(){
                getTiltValues({beta: 20, gamma: 20});
            }

            //When the device has an Accelerometer, get the tilt values (how much a user flips his phone)
            function getTiltValues(e){
                //The Accelerometer returns negative and positive numbers, with Math.abs we convert them to positive numbers. 80 and 40 is the sensitivity, the variables hold the offset in pixels relative to the initial position
                var betaPx = Math.abs(centerPositionY / 80 * e.beta),
                gammaPx = Math.abs(centerPositionX / 40 * e.gamma);

                //With the calculated offset we create pixel coordinates relative to the viewport
                var yCoordinate = convertToPixels(e.beta, centerPositionY, betaPx),
                xCoordinate = convertToPixels(e.gamma, centerPositionX, gammaPx);

                setArchPosition(xCoordinate, yCoordinate);
            }

            //Calculates new coordinates of the furthest arch
            function convertToPixels(tiltValue, centerPosition, offSetPx){
                var newCoordinate;

                //If the tiltValue is negative, the svgs will be placed on the left/top part
                if(tiltValue < 0){
                    newCoordinate = centerPosition - offSetPx;
                } else if (tiltValue = 0){
                    //perfectly in the middle
                    newCoordinate = centerPosition;
                } else {
                    //Otherwise positive, the svgs will be placed on the right/bottom part.
                    newCoordinate = centerPosition + offSetPx;
                }

                return newCoordinate;
            }

            //Function that will reposition every arch between the given coordinates
            function setArchPosition(x, y){
                xCoor = x;
                yCoor = y;

                //Depending if the mouse is left/right/top/bottom to arch, range will be calculated
                var rangeX = x > centerPositionX ? centerPositionX - x : x- centerPositionX,
                rangeY = y > centerPositionY ? centerPositionY - y : y - centerPositionY;

                changePlaybackRate(rangeX, rangeY);

                for(i = 0; i < arches.length; i++){
                    var positionX = calcNewCoordinate(x, centerPositionX, rangeX, i),
                    positionY = calcNewCoordinate(y, centerPositionY, rangeY, i);

                    arches[i].style.left = positionX + 'px';
                    arches[i].style.top = positionY + 'px';
                    arches[i].style.opacity = 1 / arches.length * i;
                }
            }

            function changePlaybackRate(x, y){
                if(Math.abs(x) < (window.innerWidth/4) && Math.abs(y) < (window.innerHeight/4)){
                    sound.playbackRate = 3;
                } else if(Math.abs(x) < (window.innerWidth/4*1.5) && Math.abs(y) < (window.innerHeight/4*1.5)){
                    sound.playbackRate = 2;
                } else if(Math.abs(x) < (window.innerWidth/4*2) && Math.abs(y) < (window.innerHeight/4*2)){
                    sound.playbackRate = 1.5;
                } else {
                    sound.playbackRate = 1;
                }
            }

            //Depending on the position of the arch in the array arches, new coordinates are calculated within the given range
            function calcNewCoordinate(px, centerPosition, range, i){
                var newCoordinate;

                if(px > centerPosition){
                    newCoordinate = centerPosition - (range / arches.length * (i + 1));
                } else {
                    newCoordinate = centerPosition + (range / arches.length * (i + 1));
                }

                return newCoordinate;
            }

            function checkIfCompleted(){
                if((xCoor-5) <= centerPositionX && centerPositionX <= (xCoor+5) && (yCoor-5) <= centerPositionY && centerPositionY <= (yCoor+5) && window.pageYOffset < gamesRect.height/2){
                    document.querySelector('.arch30 .arch-depth__part').classList.add('done');
                    document.removeEventListener('mousemove', getMousePosition);
                    document.removeEventListener('mousemove', checkIfCompleted);
                    sound.pause();
                    sound.removeEventListener('ended', loopSound);

                    if (window.DeviceOrientationEvent && "ontouchstart" in document.documentElement == true){
                        window.removeEventListener('deviceorientation', getTiltValues);
                        window.removeEventListener('deviceorientation', checkIfCompleted);
                    }

                    for(i = 0; i < arches.length - 1; i++){
                        arches[i].classList.add('hidden');
                    }
                    //If you have completed the game, show description about keyword
                    toggleGameInfo('depth');
                }
            }

            getArchDimensions();
            sound.play();

            sound.addEventListener('ended', loopSound);
            document.addEventListener('mousemove', getMousePosition);
            document.addEventListener('mousemove', checkIfCompleted);

            if (window.DeviceOrientationEvent && "ontouchstart" in document.documentElement == true){
                window.addEventListener('deviceorientation', getTiltValues);
                setTimeout(function(){
                    window.addEventListener('deviceorientation', checkIfCompleted);
                }, 1000);
            }
        },
        intuition: function(){
            var arch = document.querySelector('.arch-intuition'),
            archPath = document.querySelector('.arch-intuition__part'),
            sound = document.querySelector('.ticking-sound'),
            archCoordinates = {};

            var soundInterval,
                lastDegrees,
                timeoutFinish = null;

            sound.load();

            function getArchCoordinates(elem, obj){
                var rect = elem.getBoundingClientRect();

                obj.x = rect.left + (rect.width / 2);
                obj.y = rect.top + (rect.height / 2);
            }

            function getZRotation(e){
                var degrees;

                //For iOS
                if(e.webkitCompassHeading){
                    degrees = e.webkitCompassHeading;
                    //Android etc.
                } else {
                    degrees = e.alpha;
                }

                rotateArch(degrees);
            }

            //Calculate distance between given element and mouse
            function calculateDistance(elemCoor, mouseX, mouseY) {
                return Math.floor(Math.sqrt(Math.pow(mouseX - elemCoor.x, 2) + Math.pow(mouseY - elemCoor.y, 2)));
            }

            //Mathematical calculation for degrees
            function calculateDegrees(adjacent, hypotenuse){
                var radianValue = Math.acos(adjacent / hypotenuse);

                Math.degrees = function(radians) {
                    return radians * (180 / Math.PI);
                };

                return Math.degrees(radianValue);
            }

            //Calculate the degree of rotation by using the mouse coordinates
            function calculateMouseDegrees(e){
                var adjacent = archCoordinates.y - e.pageY,
                hypotenuse = calculateDistance(archCoordinates, e.pageX, e.pageY),
                degrees = calculateDegrees(adjacent, hypotenuse);

                //Somehow when the angle is 0 or 180, the calculation gives back NaN, with this if statement NaN turns into a degree depending on mouse location
                if(e.pageY >= archCoordinates.y && isNaN(degrees)){
                    degrees = 180;
                } else if (e.pageY < archCoordinates.y && isNaN(degrees)){
                    degrees = 0;
                }

                //If mouse is on the right side, use positive degrees
                if(e.pageX > archCoordinates.x){
                    rotateArch(degrees);
                    //If mouse is on the left side, use negative degrees
                } else if(e.pageX < archCoordinates.x) {
                    rotateArch(-degrees);
                } else {
                    rotateArch(0);
                }
            }

            function rotateArch(degrees){
                degrees = Math.floor(degrees);

                playTickingSound(degrees);
                console.log(degrees);

                //If the user after half a second is still in the right position, consider it finished
                if(degrees <= 4 && degrees >= 0 && window.pageYOffset < gamesRect.height/2){
                    arch.style.transform = 'rotate(' + degrees + 'deg)';
                    setFinishTimeout();
                } else {
                    timeoutFinish = null;
                    arch.style.transform = 'rotate(' + degrees + 'deg)';

                    stopFinishTimeout();
                }
            }

            function setFinishTimeout(){
                timeoutFinish = setTimeout(finished, 1000);
                console.log('timeout set');
            }

            function stopFinishTimeout(){
                clearTimeout(timeoutFinish);
                timeoutFinish = null;
                console.log('timeout cleareddd');
            }

            //When the game is completed
            function finished(){
                 arch.style.transition = 'transform 0.2s ease';
                 arch.style.transform = 'rotate(0deg)';
                 archPath.style.fill = 'white';

                 setTimeout(function(){
                     arch.style.transition = '';
                 }, 200);

                 sound.pause();

                 document.removeEventListener('mousemove', calculateMouseDegrees);
                 window.removeEventListener('deviceorientation', getZRotation);
                 sound.removeEventListener('ended', loopSound);
                 //If you have completed the game, show description about keyword
                 toggleGameInfo('intuition');
                 scrollDown.classList.remove('hidden');
             }

            function addMousemove(){
                document.addEventListener('mousemove', calculateMouseDegrees);
            }
            function removeMousemove(){
                document.removeEventListener('mousemove', calculateMouseDegrees);
            }

            function playTickingSound(degrees){
                var posNum = Math.abs(degrees);

                sound.playbackRate = 1.3 - (posNum/150);
            }

            getArchCoordinates(arch, archCoordinates);
            sound.play();

            document.addEventListener('mousemove', calculateMouseDegrees);
            sound.addEventListener('ended', loopSound);

            window.addEventListener('scroll', function(){
                if(window.pageYOffset >= gamesRect.height && !document.querySelector('#intuition.hidden')) {
                    sound.removeEventListener('ended', loopSound);
                } else if(document.querySelector('#intuition.hidden')) {
                    sound.play();
                    sound.addEventListener('ended', loopSound);
                }
            });

            //Touch devices that have an accelerometer
            if (window.DeviceOrientationEvent && "ontouchstart" in document.documentElement == true){
                window.addEventListener('deviceorientation', getZRotation);
            }
        }
    };

    function initGames(){
        scrollDown.classList.add('hidden');
        for(index = 0; index < gameSections.length; index++){
            gameSections[index].classList.add('hidden');
        }
        for(index = 0; index < gameCompleteInfo.length; index++){
            gameCompleteInfo[index].classList.add('hidden');
        }
        for(index = 0; index < blurDivs.length; index++){
            blurDivs[index].classList.add('hidden');
        }
    }

    function loopSound(){
        this.currentTime = 0;
        this.play();
    }

    function toggleGameInfo(id){
        document.querySelector('#' + id + ' .games__hint').classList.add('hidden');

        setTimeout(function(){
            document.querySelector('.complete-sound').play();
        }, 400);

        setTimeout(function(){
            for(index = 0; index < gameCompleteInfo.length; index++){
                if(gameCompleteInfo[index].className.indexOf('hidden') < 0){
                    gameCompleteInfo[index].classList.add('hidden');
                }
            }
            document.querySelector('#' + id + ' .game-illustration').classList.add('blur');
            document.querySelector('#' + id + ' .section__content-wrap').classList.remove('hidden');
        }, 1000);
    }

    function nextGame(){
        count++;

        var nextId = gameSections[count].id;

        for(index = 0; index < gameSections.length; index++){
            if(gameCompleteInfo[index].className.indexOf('hidden') < 0){
                gameSections[index].classList.add('hidden');
            }
        }
        gameSections[count].classList.remove('hidden');
        games[nextId]();
    }

    function pauseGame(){
        //If games arent in the viewport and the pausesection is not visible
        if(window.pageYOffset >= gamesRect.height && pauseSection.className.indexOf('hidden') >= 0){
            pauseSection.classList.remove('hidden');
        //If games  are in the viewport  and the pauseSection is visible
    } else if (window.pageYOffset <= gamesRect.height / 3  && pauseSection.className.indexOf('hidden') < 0){
            pauseSection.classList.add('hidden');
        }
    }

    initGames();

    for(index = 0; index < continueButtons.length; index++){
        continueButtons[index].addEventListener('click', nextGame);
    }
    startButton.addEventListener('click', function(){
        gameSections[0].classList.remove('hidden');
        startSection.classList.add('hidden');
        games.order();
    });

    window.addEventListener('scroll', pauseGame);

})();
