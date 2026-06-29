import { db, ref, onValue } from './firebase.js';

// ========================================
// COURT SELECTION
// ========================================

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

function setVisible(
    id,
    visible
){

    const element =
        document.getElementById(id);

    if(element){

        element.style.display =
            visible
                ? ''
                : 'none';

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

function setImage(
    id,
    image
){

    const element =
        document.getElementById(id);

    if(element){

        element.src =
            image;

    }

}


// ========================================
// FIREBASE LISTENER
// ========================================

onValue(

    ref(db, 'courts/' + court),

    (snapshot) => {

        const data =
            snapshot.val() || {};

        latestData =
            data;

        const game =
            data.game || {};

        const teams =
            data.teams || {};

        const presentation =
            data.presentation || {};

            console.log(
    teams.homeLogo
);

console.log(
    teams.awayLogo
);

        // ========================================
        // TEAM INFORMATION
        // ========================================

        setText(
            'homeTeamName',
            teams.homeName || 'LIGHT'
        );

        setText(
            'awayTeamName',
            teams.awayName || 'DARK'
        );
        

        setImage(
            'homeLogo',
            teams.homeLogo ||
            'assets/logos/default-light.png'
        );

        setImage(
            'awayLogo',
            teams.awayLogo ||
            'assets/logos/default-dark.png'
        );


        // ========================================
        // SCORES
        // ========================================

        setText(
            'homeScore',
            game.homeScore || 0
        );

        setText(
            'awayScore',
            game.awayScore || 0
        );


        // ========================================
        // FOULS
        // ========================================

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


        // ========================================
        // TIMEOUTS
        // ========================================

        setText(
            'homeTimeouts',
            'Timeouts: ' +
            (game.homeTimeouts || 0)
        );

        setText(
            'awayTimeouts',
            'Timeouts: ' +
            (game.awayTimeouts || 0)
        );


        // ========================================
        // CLOCK
        // ========================================

        const remaining =
            game.clockRemaining || 0;

        const minutes =
            Math.floor(
                remaining / 60
            );

        const seconds =
            remaining % 60;

        setText(
            'gameClock',
            minutes +
            ':' +
            String(seconds)
                .padStart(2, '0')
        );


       // ========================================
// CURRENT STAGE
// ========================================

const stage = data.stages[
    game.currentStage || 0
];

if (stage) {

    setText(
        "periodDisplay",
        stage.name
    );

}


        // ========================================
        // POSSESSION
        // ========================================

        setText(

            'possessionArrow',

            game.possession === 'away'
                ? '➡'
                : '⬅'

        );

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