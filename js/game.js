import {
db,
ref,
update,
set,
get,
onValue
} from './firebase.js';

export const defaultGameState = {

game: {

    homeScore: 0,
    awayScore: 0,

    homeFouls: 0,
    awayFouls: 0,

    homeTimeouts: 0,
    awayTimeouts: 0,

    possession: "home",

    period: 1,

    state: "period",

    currentStage: 0,

    clockRunning: false,
    clockRemaining: 600,
    clockStartedAt: 0

},

teams: {

    homeName: "HOME",
    awayName: "AWAY",

    homeColour: "#0047AB",
    awayColour: "#C00000",

    homeLogo: "",
    awayLogo: ""

},

settings: {

    periodLength: 600,
    periodCount: 4,
    overtimeLength: 300,
    mode: "quarters"

},
stages: [

    {
        type: "period",
        name: "PERIOD 1",
        duration: 600
    },

    {
        type: "break",
        name: "BREAK",
        duration: 30
    },

    {
        type: "period",
        name: "PERIOD 2",
        duration: 600
    },

    {
        type: "halftime",
        name: "HALFTIME",
        duration: 600
    },

    {
        type: "period",
        name: "PERIOD 3",
        duration: 600
    },

    {
        type: "break",
        name: "BREAK",
        duration: 30
    },

    {
        type: "period",
        name: "PERIOD 4",
        duration: 600
    },

    {
        type: "summary",
        name: "FULL TIME",
        duration: 0
    }

],

presentation: {

    mode: "automatic",

    currentView: "scoreboard",

    override: false,

    youtubeUrl: "",

    cameraUrl: "",

    backgroundImage: "",

    sponsorTicker: ""

}

};

export function courtRef(court) {

return ref(
    db,
    "courts/" + court
);

}

export async function initialiseCourt(court) {

const snapshot =
    await get(courtRef(court));

if (!snapshot.exists()) {

    await set(
        courtRef(court),
        defaultGameState
    );

}

}

export function watchCourt(
court,
callback
) {

onValue(
    courtRef(court),
    (snapshot) => {

        callback(
            snapshot.val() ||
            defaultGameState
        );

    }
);

}

export async function addScore(
court,
team,
points
) {

const snapshot =
    await get(courtRef(court));

const data =
    snapshot.val() ||
    defaultGameState;

const updates = {};

if (team === "home") {

    updates["game/homeScore"] =
        Math.max(
            0,
            (data.game.homeScore || 0)
            + points
        );

}

if (team === "away") {

    updates["game/awayScore"] =
        Math.max(
            0,
            (data.game.awayScore || 0)
            + points
        );

}

await update(
    courtRef(court),
    updates
);

}

export async function addFoul(
court,
team,
amount
) {

const snapshot =
    await get(courtRef(court));

const data =
    snapshot.val() ||
    defaultGameState;

const updates = {};

if (team === "home") {

    updates["game/homeFouls"] =
        Math.max(
            0,
            (data.game.homeFouls || 0)
            + amount
        );

}

if (team === "away") {

    updates["game/awayFouls"] =
        Math.max(
            0,
            (data.game.awayFouls || 0)
            + amount
        );

}

await update(
    courtRef(court),
    updates
);

}

export async function addTimeout(
court,
team,
amount
) {

const snapshot =
    await get(courtRef(court));

const data =
    snapshot.val() ||
    defaultGameState;

const updates = {};

if (team === "home") {

    updates["game/homeTimeouts"] =
        Math.max(
            0,
            (data.game.homeTimeouts || 0)
            + amount
        );

}

if (team === "away") {

    updates["game/awayTimeouts"] =
        Math.max(
            0,
            (data.game.awayTimeouts || 0)
            + amount
        );

}

await update(
    courtRef(court),
    updates
);
}
export async function setClockRunning(
court,
running
) {

const snapshot =
    await get(courtRef(court));

const data =
    snapshot.val() ||
    defaultGameState;

const updates = {};

if (running) {

    updates["game/clockRunning"] =
        true;

    updates["game/clockStartedAt"] =
        Date.now();

}
else {

    const elapsedSeconds =
        Math.floor(
            (
                Date.now() -
                (data.game.clockStartedAt || 0)
            ) / 1000
        );

    updates["game/clockRunning"] =
        false;

    updates["game/clockRemaining"] =
        Math.max(
            0,
            (data.game.clockRemaining || 0)
            - elapsedSeconds
        );

}

await update(
    courtRef(court),
    updates
);

}

export async function adjustClock(
court,
seconds
) {

const snapshot =
    await get(courtRef(court));

const data =
    snapshot.val() ||
    defaultGameState;

await update(
    courtRef(court),
    {
        "game/clockRemaining":
            Math.max(
                0,
                (data.game.clockRemaining || 0)
                + seconds
            )
    }
);
}

export async function setPossession(
court,
team
) {
await update(
    courtRef(court),
    {
        "game/possession": team
    }
);

}

export async function setGameState(
court,
state
) {

await update(
    courtRef(court),
    {
        "game/state": state
    }
);

}

export async function startBreak(
court
) {

await update(
    courtRef(court),
    {
        "game/state": "break",
        "game/clockRemaining": 30,
        "game/clockRunning": false
    }
);

}

export async function advanceGameState(
    court
) {

    const snapshot =
        await get(courtRef(court));

    const data =
        snapshot.val() ||
        defaultGameState;

    const game =
        data.game;

    const updates = {};

    if (
        game.state === "period"
    ) {

        switch (game.period) {

            case 1:

                updates["game/state"] =
                    "break";

                updates["game/clockRemaining"] =
                    30;

                break;

            case 2:

                updates["game/state"] =
                    "halftime";

                updates["game/clockRemaining"] =
                    60;

                break;

            case 3:

                updates["game/state"] =
                    "break";

                updates["game/clockRemaining"] =
                    30;

                break;

            case 4:

                updates["game/state"] =
                    "summary";

                updates["game/clockRemaining"] =
                    0;

                break;

        }

    }
    else if (
        game.state === "break"
    ) {

        updates["game/state"] =
            "period";

        updates["game/period"] =
            game.period + 1;

        updates["game/clockRemaining"] =
            data.settings.periodLength;

    }
    else if (
        game.state === "halftime"
    ) {

        updates["game/state"] =
            "period";

        updates["game/period"] =
            3;

        updates["game/clockRemaining"] =
            data.settings.periodLength;

    }

    updates["game/clockRunning"] =
        false;

    await update(
        courtRef(court),
        updates
    );

}

export async function reverseGameState(
    court
) {

    const snapshot =
        await get(courtRef(court));

    const data =
        snapshot.val() ||
        defaultGameState;

    const game =
        data.game;

    const updates = {};

    if (
        game.state === "break"
    ) {

        updates["game/state"] =
            "period";

        updates["game/clockRemaining"] =
            data.settings.periodLength;

    }
    else if (
        game.state === "halftime"
    ) {

        updates["game/state"] =
            "period";

        updates["game/period"] =
            2;

        updates["game/clockRemaining"] =
            data.settings.periodLength;

    }
    else if (
        game.state === "period"
    ) {

        switch (game.period) {

            case 2:

                updates["game/state"] =
                    "break";

                updates["game/period"] =
                    1;

                updates["game/clockRemaining"] =
                    30;

                break;

            case 3:

                updates["game/state"] =
                    "halftime";

                updates["game/period"] =
                    2;

                updates["game/clockRemaining"] =
                    60;

                break;

            case 4:

                updates["game/state"] =
                    "break";

                updates["game/period"] =
                    3;

                updates["game/clockRemaining"] =
                    30;

                break;

        }

    }

    updates["game/clockRunning"] =
        false;

    await update(
        courtRef(court),
        updates
    );

}


export async function changePeriod(
court,
amount
) {

const snapshot =
    await get(courtRef(court));

const data =
    snapshot.val() ||
    defaultGameState;

await update(
    courtRef(court),
    {
        "game/period":
            Math.max(
                1,
                (data.game.period || 1)
                + amount
            )
    }
);

}
// ========================================
// TEAM FUNCTIONS
// ========================================

export async function saveTeamNames(
    court,
    homeName,
    awayName
){

    await update(
        courtRef(court),
        {
            "teams/homeName": homeName,
            "teams/awayName": awayName
        }
    );

}
console.log("game.js loaded");