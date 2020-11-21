//A fazer (sugestoes da Rosa)
//   Voltar a vida depois de alguns segundos
//   Pocao ou comida para voltar a vida
//   Musica de fundo

//A fazer:
//   Refactoring dos personagens
//   Testar se eles estao encontrando
// k  Dragao se mexer pros lados
// k  Dragao tomar dano e morrer
//   Dragao atacar
//   Warrior pegar os equipamentos

//Para future expansions:
//   Outras armas
//   Conversas
//   Pocoes magicas
//   Dados para D10
//   Transform the dragon into a person
//   Add animations to characters

$(function () {

    let Points = 0;

    // console.log('start');
    const imgPath = 'assets';

    let imgPathWarrior = `${imgPath}/warrior/`
    const warrior = {
        size: 30,
        equipment: ["sword", "shield"],
        energy: 100,
        stepSize: 10,
        thisImage: 0,
        images: {
            'R': [
                `${imgPathWarrior}warriorMini-r1.png`,
                `${imgPathWarrior}warriorMini-r2.png`,
                `${imgPathWarrior}warriorMini-r1.png`,
                `${imgPathWarrior}warriorMini-r3.png`
            ],
            'L': [
                `${imgPathWarrior}warriorMini-l1.png`,
                `${imgPathWarrior}warriorMini-l2.png`,
                `${imgPathWarrior}warriorMini-l1.png`,
                `${imgPathWarrior}warriorMini-l3.png`
            ],
            'S': [
                `${imgPathWarrior}warriorMini-st1.png`,
                `${imgPathWarrior}warriorMini-st2.png`,
                `${imgPathWarrior}warriorMini-r1.png`
            ]
        },
        location: {
            x: 0,
            y: 0,
        },
        walk: function (moveX, moveY) {
            this.location.x += moveX;
            this.location.y += moveY;
        },
        strike: function (deplete) {
            this.energy -= deplete;
        },
        pickUpEquipment: function (item) {
            this.equipment.push(item);
        }
    };

    let imgPathDragon = `${imgPath}/dragon/`;
    const dragon = {
        size: 150,
        energy: 200,
        thisImage: 0,
        stepSize: 10,
        images: [
            `${imgPathDragon}dragon1.png`,
            `${imgPathDragon}dragon2.png`,
            `${imgPathDragon}dragon3.png`,
            `${imgPathDragon}dragon4.png`,
            `${imgPathDragon}dragon5.png`,
            `${imgPathDragon}dragon6.png`,
            `${imgPathDragon}dragon7.png`,
            `${imgPathDragon}dragon8.png`,
            `${imgPathDragon}dragon9.png`,
            `${imgPathDragon}dragon10.png`,
            `${imgPathDragon}dragon11.png`,
            `${imgPathDragon}dragon12.png`
        ],
        location: {
            x: 180,
            y: -200,
        },
        walk: function (moveX, moveY) {
            this.location.x += moveX;
            this.location.y += moveY;
        },
        strike: function (deplete) {
            // console.log(this.energy);
            this.energy -= deplete;
        },
        pickUpEquipment: function (item) {
            this.equipment.push(item);
        }
    };

    let imgPathPotion = `${imgPath}/potions/`;
    const potion = {
        size: 20,
        energy: 200,
        thisImage: 0,
        images: [
            `${imgPathPotion}potion.png`,
        ],
        location: {
            x: 200,
            y: -100,
        },
        walk: function (moveX, moveY) {
            this.location.x += moveX;
            this.location.y += moveY;
        },
        strike: function (deplete) {
            // console.log(this.energy);
            this.energy -= deplete;
        },
        pickUpEquipment: function (item) {
            this.equipment.push(item);
        }
    };

    let myWarrior = $('#warrior');
    let myWarriorImg = $('#warriorImg');

    $(document).on('keydown', function (e) {
        // console.log(e);
        e.preventDefault();
        callWarrior(e.key);

        testAllColisions();
    });

    const testAllColisions = function() {
        testCollisionDragon();
        testCollisionPotion();

    }

    const testCollisionDragon = function () {
        if (isTouching(warrior, dragon)) {
            looseWarriorLife(10);
            console.log("warrior touching dragon");
        }
    }

    const addPoints = function (point){
    Points += point;
            $('#coordinates').empty();
                            $('#coordinates').append('SCORE: ',Points);
    }

    const testCollisionPotion = function () {
        if (isTouching(warrior, potion)) {
            // $('#potion').hide();
            addPoints(1);
           
            potion.location.x = Math.random() * 200;
            potion.location.y =-Math.random() * 200;
            console.log("warrior touching potion");
            console.log("Moved to ", potion.location.x, potion.location.y);
            initializePotion();
        }
    }

    const isTouching = function (c1, c2) {
        // console.log(`C1: ${c1.location.x},${c1.location.y} - C2: ${c2.location.x},${c2.location.y}`);

        let l1x = c1.location.x;
        let l1y = c1.location.y;
        let s1 = c1.size;
        
        let l2x = c2.location.x;
        let l2y = c2.location.y;
        let s2 = c2.size;
        
        var a = l1x - l2x;
        var b = l1y - l2y;
        var c = Math.sqrt(a * a + b * b);
        // console.log('Distance =', c);

        if (c < s1/2 || c < s2/2)
            return true;
        else
            return false;
        

        // if (c1.location.x == c2.location.x && c1.location.y == c2.location.y) {
        //     return true;
        // } else {
        //     return false;
        // }
    }

    const callWarrior = function (key) {
    
        let warriorDamage = 2;
        if (warrior.energy > 0) {
            switch (key) {
                //Warrior
                case 'w':
                    walk(0, warrior.stepSize, 'warrior');
                    break;
                case 'a':
                    walk(-warrior.stepSize, 0, 'warrior');
                    break;
                case 's':
                    walk(0, -warrior.stepSize, 'warrior');
                    break;
                case 'd':
                    walk(warrior.stepSize, 0, 'warrior');
                    break;
                case ' ':
                    strike(warriorDamage);
                    break;

                //Dragon
                case 'l':
                    walk(dragon.stepSize, 0, 'dragon');
                    break;
                case 'j':
                    walk(-dragon.stepSize, 0, 'dragon');
                    break;
                case 'k':
                    walk(0, -dragon.stepSize, 'dragon');
                    break;
                case 'i':
                    walk(0, dragon.stepSize, 'dragon');
                    break;

                case '3':
                    pickUpEquipment();
                    break;
                default:
                    // console.log(key);
                    break;
            }
        }
    }

    const walk = function (x, y, character) {
        //Log the position of the warrior

        if (character == "warrior") {
            char = warrior;
            charDiv = myWarrior;
            charImg = myWarriorImg;
        } else {
            char = dragon;
            charDiv = myDragon;
            charImg = myDragonImg;
        }
        // console.log(char.location);
        //Move it 
        if ((char.location.x + x) < 0)
            x = 0;
        if ((char.location.y + y) > 0)
            y = 0;

        char.walk(x, y);
        //Log the position again
        // console.log(char.location);


        if (character == 'warrior') {
            let nextImage;
            if (x > 0)
                nextImage = getNextImage('R');
            else
                nextImage = getNextImage('L');
            myWarriorImg.attr('src', nextImage);
            myWarrior.css('left', char.location.x);
            myWarrior.css('top', -char.location.y);
        } else {
            myDragon.css('left', char.location.x);
            myDragon.css('top', -char.location.y);
        }


    }

    const getNextImage = function (direction) {
        let image = warrior.images[direction][warrior.thisImage];
        warrior.thisImage++;
        if (warrior.thisImage >= warrior.images[direction].length)
            warrior.thisImage = 0;
        // console.log(image);
        return image;
    }

    const getNextImageDragon = function () {
        let image = dragon.images[dragon.thisImage];
        dragon.thisImage++;
        if (dragon.thisImage >= dragon.images.length)
            dragon.thisImage = 0;
        // console.log(image);
        return image;
    }


    const looseWarriorLife = function(points){
        let currentW = $(".lifeBarGreen").width();
        let reduction = points / (50 / warrior.size);
        $(".lifeBarGreen").width(currentW - reduction);
        warrior.strike(points);

        testWarriorLife();
    }
    const strike = function (points) {
        //Strike and loose energy points
        warrior.strike(points);
        animateStrike();
        looseWarriorLife(points);    

        if (isTouching(warrior, dragon)) {
            reduction = points * 10;
            dragon.strike(points * 3.5);
            let currentWD = $(".lifeBarGreenDragon").width();
            $(".lifeBarGreenDragon").width(currentWD - reduction);
        }
        testAllLifes();
        
    }

    const testAllLifes = function(){
        testWarriorLife();
        testDragonLife();
    }
  
    const testWarriorLife = function () {
        if (warrior.energy <= 0) {
            myWarrior.hide();
        }
    }

    const testDragonLife = function () {
         if (dragon.energy <= 0) {
            myDragon.hide();
        }
    }

    const moveDragonRandomly = function(){
        setInterval(() => {
            let randomX = Math.random();
        let randomY = Math.random();
        let addX = 0;
        let addY = 0;
        if (randomX <= 0.2)
            addX = -10;
        if (randomX <= 0.4)
            addX = 0;
        if (randomX <= 0.6)
            addX = 10;
        
        if (randomY <= 0.2)
            addY = -10;
        if (randomY <= 0.4)
            addY = 0;
        if (randomY <= 0.6)
            addY = 10;
        
        dragon.location.x += addX;
        if (dragon.location.x <= 0)
            dragon.location.x = 0;
        if (dragon.location.x >= 300)
            dragon.location.x = 300;

        dragon.location.y += addY;
        if (dragon.location.y <= -400)
            dragon.location.y = -400;
        if (dragon.location.y >= 0)
            dragon.location.y = 0;
         
        initializeDragon();
        }, 400);
    }

    moveDragonRandomly();

    const animateStrike = function () {
        let times = 0;
        let animation = setInterval(() => {
            times++;
            let nImage = getNextImage('S');
            myWarriorImg.attr('src', nImage);
            // console.log('times = ' + times + ' nImage =' + nImage);
            if (times >= warrior.images['S'].length)
                clearInterval(animation);
        }, 100);

    }

    const animateDragon = function () {
        setInterval(() => {
            let nImage = getNextImageDragon();
            myDragonImg.attr('src', nImage);

        }, 200);

    }
    animateDragon();

    const pickUpEquipment = function () {
        //Pick up a "helmet"
        warrior.pickUpEquipment("helmet");

        //Log the current equipment list
        // console.log(warrior.equipment);
    }

    let myDragon = $('#dragon');
    let myDragonImg = $('#dragonImg');



    const initializeDragon = function () {
        myDragon.css('left', dragon.location.x);
        myDragon.css('top', -dragon.location.y);
    }
    initializeDragon();

    let myPotion = $('#potion');
    let myPotionImg = $('#potionImg');

    const initializePotion = function () {
        myPotion.css('left', potion.location.x);
        myPotion.css('top', -potion.location.y);
    }
    initializePotion();

    function permission() {
        // console.log('event asking for permission');
        // $('#coordinates').append('Asked permission. ');
        if (typeof (DeviceMotionEvent) !== "undefined" && typeof (DeviceMotionEvent.requestPermission) === "function") {
            // (optional) Do something before API request prompt.
            DeviceMotionEvent.requestPermission()
                .then(response => {
                    // (optional) Do something after API prompt dismissed.
                    // $('#coordinates').append('Inside of then. ');
                    if (response == "granted") {
                        window.addEventListener("devicemotion", (event) => {


                            
                            // $('#coordinates').append('Permission granted. ');
                            var x = Math.floor(event.accelerationIncludingGravity.x);
                            var y = Math.floor(event.accelerationIncludingGravity.y)+4;
                            var z = Math.floor(event.accelerationIncludingGravity.z);
                            // alert('moveu!'+x+" "+y+" "+z);
                            if(x!=0 || y!=0)
                                walk(x, y, 'warrior');
                            
                            // $('#coordinates').empty();
                            // $('#coordinates').append('LOC: ' + x.toFixed(0) + "," + y.toFixed(0) + "," + z.toFixed(0));

                            testAllColisions();
                            
                        })
                    }
                })
                .catch(console.error)
        } else {
            // alert("DeviceMotionEvent is not defined");
            // $('#coordinates').append(' Permission denied.');
        }
    }

    
    $("#request").on("click", permission);

});
