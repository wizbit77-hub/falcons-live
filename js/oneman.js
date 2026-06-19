import {
initialiseCourt,
watchCourt,
addScore,
setPossession
} from './game.js';

const court =
new URLSearchParams(window.location.search)
.get('court') || 'court1';

document.getElementById('courtTitle')
.textContent =
court.toUpperCase() + ' ONE MAN OPERATOR';

await initialiseCourt(court);

watchCourt(court, (data) => {

document.getElementById('homeScore')
    .textContent =
    data.game.homeScore;

document.getElementById('awayScore')
    .textContent =
    data.game.awayScore;

document.getElementById('homeFouls')
    .textContent =
    data.game.homeFouls;

document.getElementById('awayFouls')
    .textContent =
    data.game.awayFouls;

document.getElementById('homeTimeouts')
    .textContent =
    data.game.homeTimeouts;

document.getElementById('awayTimeouts')
    .textContent =
    data.game.awayTimeouts;

});

/*****************************************************************

* SCORE BUTTONS
  *****************************************************************/

document.getElementById('homePlus3')
.addEventListener(
'click',
() => addScore(court, 'home', 3)
);

document.getElementById('homePlus2')
.addEventListener(
'click',
() => addScore(court, 'home', 2)
);

document.getElementById('homePlus1')
.addEventListener(
'click',
() => addScore(court, 'home', 1)
);

document.getElementById('homeMinus1')
.addEventListener(
'click',
() => addScore(court, 'home', -1)
);

document.getElementById('awayPlus3')
.addEventListener(
'click',
() => addScore(court, 'away', 3)
);

document.getElementById('awayPlus2')
.addEventListener(
'click',
() => addScore(court, 'away', 2)
);

document.getElementById('awayPlus1')
.addEventListener(
'click',
() => addScore(court, 'away', 1)
);

document.getElementById('awayMinus1')
.addEventListener(
'click',
() => addScore(court, 'away', -1)
);

/*****************************************************************

* POSSESSION
  *****************************************************************/

document.getElementById('homePossession')
.addEventListener(
'click',
() => setPossession(court, 'home')
);

document.getElementById('awayPossession')
.addEventListener(
'click',
() => setPossession(court, 'away')
);
