import {
db,
ref,
update,
set,
get,
onValue
} from './firebase.js';

/*****************************************************************

* DEFAULT GAME STATE
  *****************************************************************/

export const defaultGameState = {

```
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
```

};

/*****************************************************************

* HELPERS
  *****************************************************************/

export function courtRef(court) {
return ref(db, "courts/" + court);
}

export async function initialiseCourt(court) {

```
const snapshot = await get(courtRef(court));

if (!snapshot.exists()) {

    await set(
        courtRef(court),
        defaultGameState
    );

}
```

}

export function watchCourt(court, callback) {

```
onValue(
    courtRef(court),
    (snapshot) => {

        callback(
            snapshot.val() || defaultGameState
        );

    }
);
```

}
