import {
initialiseCourt,
watchCourt,
addScore,
addFoul,
addTimeout,
setPossession,
saveTeamNames
} from './game.js';
console.log("addTimeout =", addTimeout);

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