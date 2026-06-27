import { db, ref, onValue } from './firebase.js';

const court =
    new URLSearchParams(window.location.search)
        .get('court') || 'court1';
let latestData = null;
// ========================================
// HELPER FUNCTIONS
// ========================================

function setText(
    id,
    value
){

    const element =
        document.getElementById(id);

    if(element){

        element.textContent =
            value;

    }

}

function setColour(
    id,
    colour
){

    const element =
        document.getElementById(id);

    if(element){

        element.style.color =
            colour;

    }

}

onValue(
    ref(db, 'courts/' + court),
    (snapshot) => {

        const data =
            snapshot.val() || {};

        const game =
            data.game || {};

        const teams =
            data.teams || {};
            latestData = data;

        // ------------------------
        // TEAM NAMES
        // ------------------------

       setText(
    'homeTeamName',
    teams.homeName || 'LIGHT'
);

        setText(
    'awayTeamName',
    teams.awayName || 'DARK'
);



        // ------------------------
        // SCORES
        // ------------------------

       setText(
    'homeScore',
    game.homeScore || 0
);

        setText(
    'awayScore',
    game.awayScore || 0
);

        // ------------------------
        // FOULS
        // ------------------------

        setText(
    'homeFouls',
    'Fouls: ' +
    (game.homeFouls || 0)
);

      setText(
    'awayFouls',
    'Fouls: ' +
    (game.awayFouls || 0)
);

        // ------------------------
        // TIMEOUTS
        // ------------------------

        document.getElementById(
            'homeTimeouts'
        ).textContent =
            'Timeouts: ' +
            (game.homeTimeouts || 0);

        document.getElementById(
            'awayTimeouts'
        ).textContent =
            'Timeouts: ' +
            (game.awayTimeouts || 0);

        // ------------------------
        // CLOCK
        // ------------------------

        const remaining =
            game.clockRemaining || 0;

        const minutes =
            Math.floor(
                remaining / 60
            );

        const seconds =
            remaining % 60;

        document.getElementById(
            'gameClock'
        ).textContent =
            minutes +
            ':' +
            String(seconds)
                .padStart(2, '0');

        // ------------------------
        // GAME STATE
        // ------------------------

        if (
            game.state === 'break'
        ) {

            document.getElementById(
                'periodDisplay'
            ).textContent =
                'BREAK';

        }
        else if (
            game.state === 'halftime'
        ) {

            document.getElementById(
                'periodDisplay'
            ).textContent =
                'HALFTIME';

        }
        else if (
            game.state === 'summary'
        ) {

            document.getElementById(
                'periodDisplay'
            ).textContent =
                'FULL TIME';

        }
        else {

            document.getElementById(
                'periodDisplay'
            ).textContent =
                'PERIOD ' +
                (game.period || 1);

        }

    }
);
// ========================================
// LIVE CLOCK DISPLAY
// ========================================

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

    const displayWholeSeconds =
        Math.ceil(displaySeconds);

    const minutes =
        Math.floor(
            displayWholeSeconds / 60
        );

    const seconds =
        displayWholeSeconds % 60;

    setText(
        'gameClock',
        minutes +
        ':' +
        String(seconds)
            .padStart(2, '0')
    );

}, 100);