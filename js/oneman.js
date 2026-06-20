import {
initialiseCourt,
watchCourt,
addScore,
addFoul,
addTimeout,
setPossession,
saveTeamNames,
setClockRunning,
adjustClock
} from './game.js';

const court =
new URLSearchParams(window.location.search)
.get('court') || 'court1';

document.getElementById('courtTitle')
.textContent =
court.toUpperCase() + ' ONE OPERATOR';

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

    console.log(
    'homeTeamTitle:',
    document.getElementById('homeTeamTitle')
);

console.log(
    'awayTeamTitle:',
    document.getElementById('awayTeamTitle')
);

document.getElementById('homeTeamTitle')
    .textContent =
    data.teams.homeName;

document.getElementById('awayTeamTitle')
    .textContent =
    data.teams.awayName;
    document.getElementById('homeFoulsLabel')
    .textContent =
    data.teams.homeName;
    document.getElementById('homeTimeoutsLabel')
    .textContent =
    data.teams.homeName;

document.getElementById('awayTimeoutsLabel')
    .textContent =
    data.teams.awayName;

document.getElementById('awayFoulsLabel')
    .textContent =
    data.teams.awayName;

    document.getElementById('periodDisplay')
    .textContent =
    'PERIOD ' +
    data.game.period;

    const minutes =
    Math.floor(
        data.game.clockRemaining / 60
    );

const seconds =
    data.game.clockRemaining % 60;

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

document.getElementById('homeFoulPlus')
.addEventListener(
    'click',
    () => addFoul(court, 'home', 1)
);
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
document.getElementById('saveTeams')
    .addEventListener(
        'click',
        async () => {

            const homeName =
                document.getElementById(
                    'homeNameInput'
                ).value;

            const awayName =
                document.getElementById(
                    'awayNameInput'
                ).value;

            await saveTeamNames(
                court,
                homeName,
                awayName
            );

        }
    );