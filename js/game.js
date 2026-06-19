export async function addScore(court, team, points) {

const snapshot = await get(courtRef(court));

const data = snapshot.val() || defaultGameState;

const updates = {};

if (team === "home") {
    updates["game/homeScore"] =
        Math.max(
            0,
            (data.game.homeScore || 0) + points
        );
}

if (team === "away") {
    updates["game/awayScore"] =
        Math.max(
            0,
            (data.game.awayScore || 0) + points
        );
}

await update(
    courtRef(court),
    updates
);

}

export async function addFoul(court, team, amount) {

const snapshot = await get(courtRef(court));

const data = snapshot.val() || defaultGameState;

const updates = {};

if (team === "home") {
    updates["game/homeFouls"] =
        Math.max(
            0,
            (data.game.homeFouls || 0) + amount
        );
}

if (team === "away") {
    updates["game/awayFouls"] =
        Math.max(
            0,
            (data.game.awayFouls || 0) + amount
        );
}

await update(
    courtRef(court),
    updates
);

}

export async function addTimeout(court, team, amount) {

const snapshot = await get(courtRef(court));

const data = snapshot.val() || defaultGameState;

const updates = {};

if (team === "home") {
    updates["game/homeTimeouts"] =
        Math.max(
            0,
            (data.game.homeTimeouts || 0) + amount
        );
}

if (team === "away") {
    updates["game/awayTimeouts"] =
        Math.max(
            0,
            (data.game.awayTimeouts || 0) + amount
        );
}

await update(
    courtRef(court),
    updates
);

}

export async function setPossession(court, team) {

await update(
    courtRef(court),
    {
        "game/possession": team
    }
);

}
