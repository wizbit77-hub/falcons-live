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

media: {

    displayMode: "scoreboard",
    youtubeUrl: "",
    cameraUrl: ""

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
export async function saveTeamNames(
court,
homeName,
awayName
) {

await update(
    courtRef(court),
    {
        "teams/homeName": homeName,
        "teams/awayName": awayName
    }
);

}
