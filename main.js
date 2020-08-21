//ZMIENNE

// zmienne do kart

let iconsClass = [
    "fa-heart-o",
    "fa-heart-o",
    "fa-star-o",
    "fa-star-o",
    "fa-eye",
    "fa-eye",
    "fa-moon-o",
    "fa-moon-o",
    "fa-bell-o",
    "fa-bell-o",
    "fa-smile-o",
    "fa-smile-o",
    "fa-flag-o",
    "fa-flag-o",
    "fa-sun-o",
    "fa-sun-o",
    "fa-diamond",
    "fa-diamond",
    "fa-snowflake-o",
    "fa-snowflake-o",
];

let removeIconsClass = [];

let iconsCards = document.querySelectorAll("i");
iconsCards = [...iconsCards];


const btnNewGame = document.querySelector("button");

const activeCards = [];

//zmienne do stopera

let milliSeconds = 0;
let seconds = 0;
let minute = 0;
let timer;

const stopwatchElement = document.querySelector('.stopwatch');

// zmienne do wyniku gry

const pairsOfCards = iconsCards.length / 2;
let gameResault = 0;

let timeScore;


//FUNKCJE:

//odliczanie czasu

const stopwatchStart = function () {
    milliSeconds = 0;
    seconds = 0;
    minute = 0;
    timer = setInterval(stopwatchCount, 10);
}

const stopwatchStop = function () {
    clearInterval(timer);
}


const stopwatchCount = function () {
    stopwatchElement.textContent = (minute < 10 ? "0" + minute : minute) + ':' + (seconds < 10 ? "0" + seconds : seconds) + ':' + (milliSeconds < 10 ? "0" + milliSeconds : milliSeconds);
    milliSeconds++;
    if (milliSeconds == 100) {
        milliSeconds = 0;
        seconds++;
    }
    if (seconds == 60) {
        seconds = 0;
        minute++;
    }
    if (minute == 60) {
        minute = 0;
        hours++;
    }

}


//odkrywanie i sprawdzanie kart

const cardReversal = function () {
    this.classList.add("activeCard");
    if (activeCards.length === 0) {
        activeCards[0] = this;
        return;
    } else if (activeCards.length === 1 && this !== activeCards[0]) {
        activeCards[1] = this;
        iconsCards.forEach(function (icon) {
            icon.removeEventListener("click", cardReversal)
        })
        setTimeout(function () {

            if (activeCards[0].className === activeCards[1].className) {

                activeCards.forEach(function (card) {
                    card.classList.add('hidden');
                })

                gameResault++
                if (gameResault == pairsOfCards) {
                    timeScore = (seconds < 10 ? "0" + seconds : seconds) + ':' + (milliSeconds < 10 ? "0" + milliSeconds : milliSeconds);
                    stopwatchStop();
                    alert("Ukończyłeś grę!!! Twój wynik to:" + timeScore);
                }

            } else {

                activeCards.forEach(function (card) {
                    card.classList.remove('activeCard');
                })

            }
            activeCards.splice(0);
            iconsCards.forEach(function (icon) {
                icon.addEventListener("click", cardReversal)
            })

        }, 500);

    }
}

//Losowy układ kart
const cardArrangement = function () {
    stopwatchStop();
    timeScore = 0;
    gameResault = 0;
    removeIconsClass.length = 0;
    stopwatchStart();
    iconsCards.forEach(function (icon) {
        icon.className = ("fa");
        const position = Math.floor(Math.random() * iconsClass.length);
        icon.classList.add(iconsClass[position]);
        let removeClass = (iconsClass.splice(position, 1).join());
        removeIconsClass.push(removeClass);
        icon.addEventListener("click", cardReversal);
    })
    if (iconsClass.length === 0) {
        iconsClass = [...removeIconsClass];
    }

};

// Gra

btnNewGame.addEventListener("click", cardArrangement);