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

    const imgPath = 'assets';
    
    let imgPathWarrior = `${imgPath}/warrior/`
    const warrior = {
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
            x: 400,
            y: -200,
        },
        walk: function (moveX, moveY) {
            this.location.x += moveX;
            this.location.y += moveY;
        },
        strike: function (deplete) {
            console.log(this.energy);
            this.energy -= deplete;
        },
        pickUpEquipment: function (item) {
            this.equipment.push(item);
        }
    };

    let imgPathPotion = `${imgPath}/potions/`;
    const potion = {
        energy: 200,
        thisImage: 0,
        images: [
            `${imgPathPotion}potion.png`,
        ],
        location: {
            x: 600,
            y: -100,
        },
        walk: function (moveX, moveY) {
            this.location.x += moveX;
            this.location.y += moveY;
        },
        strike: function (deplete) {
            console.log(this.energy);
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
    });

    const callWarrior = function (key) {
        let warriorStep = 10;
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
                    console.log(key);
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
        console.log(char.location);
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

    const strike = function (points) {
        //Strike and loose energy points
        warrior.strike(points);
        animateStrike();
        let currentW = $(".lifeBarGreen").width();
        let reduction = points / (50 / 20);
        $(".lifeBarGreen").width(currentW - reduction);


        if (isTouching(warrior.location, dragon.location)) {
            
            reduction = points * 3;
            dragon.strike(points*3.5);
            let currentWD = $(".lifeBarGreenDragon").width();
            $(".lifeBarGreenDragon").width(currentWD - reduction);
            // $('.lifeBarGreenDragon').hide();

        }
        if (warrior.energy <= 0) {
            myWarrior.hide();
        }

        if (dragon.energy <= 0) {
            myDragon.hide();
        }
    }

    const isTouching = function (wl, dl) {
        

        if (wl.x == dl.x && wl.y == dl.y) {
            console.log("Warrior:");
            console.log(wl);
            console.log("Dragon:");
            console.log(dl);
            return true;
        } else {
            return false;
        }
    }

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
    //animateDragon();

    const pickUpEquipment = function () {
        //Pick up a "helmet"
        warrior.pickUpEquipment("helmet");

        //Log the current equipment list
        console.log(warrior.equipment);
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

    if (window.DeviceMotionEvent) {
        alert('Device Motion added');
        window.addEventListener("devicemotion", motion, false);
    } else {
        alert("DeviceMotionEvent is not supported");
    }
    function motion(event) {
        
        let text = ("Accelerometer: "
            + event.accelerationIncludingGravity.x + ", "
            + event.accelerationIncludingGravity.y + ", "
            + event.accelerationIncludingGravity.z
        );
        alert(text);
    }

    if (window.DeviceOrientationEvent) {
        alert('Orientation added');
        window.addEventListener("deviceorientation", orientation, false);
    } else {
        alert("DeviceOrientationEvent is not supported");
    }

    function orientation(event) {
        let text=("Magnetometer: "
            + event.alpha + ", "
            + event.beta + ", "
            + event.gamma
        );
        alert(text);
    }

});
