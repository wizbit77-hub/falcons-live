import {
initialiseCourt,
watchCourt,
addScore,
addFoul,
addTimeout,
setPossession,
setGameState,
advanceGameState,
startBreak,
saveTeamNames,
setClockRunning,
adjustClock,
changePeriod
} from './game.js';

/*****************************************************************

* COURT SETUP
  *****************************************************************/

const court =
new URLSearchParams(window.location.search)
.get('court') || 'court1';

let latestData = null;

document.getElementById('courtTitle')
.textContent =
court.toUpperCase() + ' ONE OPERATOR';

await initialiseCourt(court);

/*****************************************************************

* LIVE DISPLAY UPDATES
  *****************************************************************/

watchCourt(court, (data) => {

    latestData = data;

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

document.getElementById('homeTeamTitle')
.textContent =
data.teams.homeName;

document.getElementById('awayTeamTitle')
.textContent =
data.teams.awayName;

if (
    data.game.state === 'break'
) {

    document.getElementById(
        'periodDisplay'
    ).textContent =
        'BREAK';

}
else {

    document.getElementById(
        'periodDisplay'
    ).textContent =
        'PERIOD ' +
        data.game.period;

}

let displaySeconds =
data.game.clockRemaining;

if (data.game.clockRunning) {

const elapsedSeconds =
    Math.floor(
        (
            Date.now() -
            data.game.clockStartedAt
        ) / 1000
    );

displaySeconds =
    Math.max(
        0,
        data.game.clockRemaining -
        elapsedSeconds
    );

}

const minutes =
Math.floor(
displaySeconds / 60
);

const seconds =
displaySeconds % 60;

document.getElementById('gameClock')
.textContent =
minutes +
':' +
String(seconds)
.padStart(2, '0');

document.getElementById('togglePossession')
.textContent =
data.game.possession === 'home'
? '◄'
: '►';

document.getElementById('clockToggle')
.textContent =
data.game.clockRunning
? 'STOP'
: 'START';

});

/*****************************************************************
* LIVE CLOCK REDRAW
*****************************************************************/

setInterval(() => {

if (!latestData) {
    return;
}

if (!latestData.game.clockRunning) {
    return;
}

let displaySeconds =
    latestData.game.clockRemaining;

const elapsedSeconds =
    (
        Date.now() -
        latestData.game.clockStartedAt
    ) / 1000;

displaySeconds =
    Math.max(
        0,
        latestData.game.clockRemaining -
        elapsedSeconds
    );

  if (
    displaySeconds <= 0 &&
    latestData.game.clockRunning
) {

    startBreak(
        court
    );

    return;

}

const displayWholeSeconds =
    Math.ceil(displaySeconds);

const minutes =
Math.floor(
displayWholeSeconds / 60
);

const seconds =
displayWholeSeconds % 60;

document.getElementById('gameClock')
.textContent =
    minutes +
    ':' +
    String(seconds)
        .padStart(2, '0');

}, 100);

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

* FOUL BUTTONS
  *****************************************************************/

document.getElementById('homeFoulPlus')
.addEventListener(
'click',
() => addFoul(court, 'home', 1)
);

document.getElementById('homeFoulMinus')
.addEventListener(
'click',
() => addFoul(court, 'home', -1)
);

document.getElementById('awayFoulPlus')
.addEventListener(
'click',
() => addFoul(court, 'away', 1)
);

document.getElementById('awayFoulMinus')
.addEventListener(
'click',
() => addFoul(court, 'away', -1)
);

/*****************************************************************

* TIMEOUT BUTTONS
  *****************************************************************/

document.getElementById('homeTimeoutPlus')
.addEventListener(
'click',
() => addTimeout(court, 'home', 1)
);

document.getElementById('homeTimeoutMinus')
.addEventListener(
'click',
() => addTimeout(court, 'home', -1)
);

document.getElementById('awayTimeoutPlus')
.addEventListener(
'click',
() => addTimeout(court, 'away', 1)
);

document.getElementById('awayTimeoutMinus')
.addEventListener(
'click',
() => addTimeout(court, 'away', -1)
);

/*****************************************************************

* CLOCK CONTROLS
  *****************************************************************/

document.getElementById('clockToggle')
.addEventListener(
'click',
async () => {

    const button =
        document.getElementById(
            'clockToggle'
        );

    await setClockRunning(
        court,
        button.textContent === 'START'
    );

}

);

document.getElementById('clockPlusMinute')
.addEventListener(
'click',
() => adjustClock(
court,
60
)
);

document.getElementById('clockMinusMinute')
.addEventListener(
'click',
() => adjustClock(
court,
-60
)
);

/*****************************************************************

* PERIOD CONTROLS
  *****************************************************************/

document.getElementById('periodUp')
.addEventListener(
'click',
() => changePeriod(
court,
1
)
);

document.getElementById('periodDown')
.addEventListener(
'click',
() => changePeriod(
court,
-1
)
);

/*****************************************************************

* POSSESSION
  *****************************************************************/

document.getElementById('togglePossession')
.addEventListener(
'click',
async () => {

    const currentArrow =
        document.getElementById(
            'togglePossession'
        ).textContent;

    await setPossession(
        court,
        currentArrow === '◄'
            ? 'away'
            : 'home'
    );

}
);

/*****************************************************************

* MATCH SETUP
  *****************************************************************/

async function saveTeamNamesFromInputs() {

    let homeName =
        document.getElementById(
            'homeNameInput'
        ).value.trim();

    let awayName =
        document.getElementById(
            'awayNameInput'
        ).value.trim();

    if (homeName === "") {

        homeName = "Dark";

    }

    if (awayName === "") {

        awayName = "Light";

    }

    await saveTeamNames(
        court,
        homeName,
        awayName
    );

}

document.getElementById(
    'homeNameInput'
).addEventListener(
    'change',
    saveTeamNamesFromInputs
);

document.getElementById(
    'awayNameInput'
).addEventListener(
    'change',
    saveTeamNamesFromInputs
);
