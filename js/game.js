/*****************************************************************

FALCONS LIVE
Module: game.js

==================================================
PURPOSE
==================================================

Maintains the live state of a basketball game.

This module is responsible for reading and writing
game information to Firebase.

==================================================
RESPONSIBILITIES
==================================================

✓ Court initialisation
✓ Live score
✓ Fouls
✓ Timeouts
✓ Clock
✓ Possession
✓ Team information
✓ Default game state

==================================================
NOT RESPONSIBLE FOR
==================================================

✗ Match progression
    (competition.js)

✗ Match setup & presets
    (matchsetup.js)

✗ Display presentation
    (display.js)

✗ Media presentation
    (mediaoperator.js)

==================================================
USED BY
==================================================

• oneoperator.js
• display.js
• matchsetup.js

==================================================
REVISION HISTORY
==================================================

v0.1
- Initial game engine

v0.2
- Added live scoring

v0.3
- Added clock, fouls and timeout support

v0.4
- Added stage-based game model

v0.5
- Removed competition progression
  (moved to competition.js)

*****************************************************************/


/*****************************************************************
IMPORTS
*****************************************************************/

import {
db,
ref,
update,
set,
get,
onValue
} from './firebase.js';

import {
    currentPreset
} from "./matchsetup.js";

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

stages: [...currentPreset.stages],

presentation: {

    mode: "automatic",

    currentView: "scoreboard",

    currentMedia: "",

    override: false,

   media: {

    break1: {

        url: "",
        layout: "banner"

    },

    halftime: {

        url: "",
        layout: "fullscreen"

    },

    break2: {

        url: "",
        layout: "banner"

    },

    fulltime: {

        url: "",
        layout: "fullscreen"

    },

    timeout: {

        url: "",
        layout: "banner"

    },

    substitution: {

        url: "",
        layout: "overlay"

    }

},

    backgroundImage: "",

    sponsorTicker: ""

}

};

/*****************************************************************
COURT FUNCTIONS
*****************************************************************/

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

/*****************************************************************
SCORING FUNCTIONS
*****************************************************************/

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

/*****************************************************************
FOUL FUNCTIONS
*****************************************************************/

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

/*****************************************************************
TIMEOUT FUNCTIONS
*****************************************************************/

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

/*****************************************************************
CLOCK FUNCTIONS
*****************************************************************/

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

/*****************************************************************
POSSESSION FUNCTIONS
*****************************************************************/

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
/*****************************************************************
TEAM FUNCTIONS
*****************************************************************/

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
/*****************************************************************
MEDIA FUNCTIONS
*****************************************************************/

function convertMediaUrl(url) {
    console.log("convertMediaUrl called:", url);

    if (!url) {
        return "";
    }

    // YouTube watch URL
    if (url.includes("youtube.com/watch?v=")) {

        const id =
            new URL(url)
                .searchParams
                .get("v");

        if (id) {

            return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`;

        }

    }

    // Short YouTube URL
    if (url.includes("youtu.be/")) {

        const id =
            url.split("youtu.be/")[1]
               .split("?")[0];

        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0`;

    }

    // Already an embed or another media source
    return url;

}

export async function saveMediaUrl(
    court,
    mediaKey,
    url,
    layout
) {

    await update(
    courtRef(court),
    {
        [`presentation/media/${mediaKey}/url`]:
            convertMediaUrl(url),

        [`presentation/media/${mediaKey}/layout`]:
            layout
    }
);

}