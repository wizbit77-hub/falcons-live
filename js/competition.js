import {
    get,
    update
} from "./firebase.js";

import {
    courtRef
} from "./game.js";
import {
    currentPreset
} from "./matchsetup.js";

// ========================================
// CURRENT STAGE
// ========================================

export async function getCurrentStage(
    court
){

    const snapshot =
        await get(
            courtRef(court)
        );

    const data =
        snapshot.val();

    const stageIndex =
        data.game.currentStage || 0;

    return data.stages[
        stageIndex
    ];

}

// ========================================
// ALL STAGES
// ========================================

export async function getAllStages(
    court
){

    const snapshot =
        await get(
            courtRef(court)
        );

    const data =
        snapshot.val();

    return data.stages;

}

// ========================================
// ENTER STAGE
// ========================================

function getStageDuration(stage){

    switch(stage.type){

        case "period":
            return currentPreset.timings.period;

        case "break":
            return currentPreset.timings.break;

        case "halftime":
            return currentPreset.timings.halftime;

        case "summary":
            return 0;

        default:
            return 0;

    }

}

export async function enterStage(
    court,
    stageIndex
){

    const snapshot =
        await get(
            courtRef(court)
        );

    const data =
        snapshot.val();

    const stage =
        data.stages[
            stageIndex
        ];

    if(
        !stage
    ){
        return;
    }

    await update(
        courtRef(court),
        {

            "game/currentStage":
                stageIndex,

            "game/clockRunning":
                false,

           "game/clockRemaining":
    getStageDuration(stage)

        }
    );

}

// ========================================
// NEXT STAGE
// ========================================

export async function nextStage(
    court
){

    const snapshot =
        await get(
            courtRef(court)
        );

    const data =
        snapshot.val();

    const current =
        data.game.currentStage || 0;

    if(
        current >=
        data.stages.length - 1
    ){
        return;
    }

    await enterStage(
        court,
        current + 1
    );

}

// ========================================
// PREVIOUS STAGE
// ========================================

export async function previousStage(
    court
){

    const snapshot =
        await get(
            courtRef(court)
        );

    const data =
        snapshot.val();

    const current =
        data.game.currentStage || 0;

    if(
        current <= 0
    ){
        return;
    }

    await enterStage(
        court,
        current - 1
    );

}
