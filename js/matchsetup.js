/*****************************************************************
FALCONS LIVE
Module: matchsetup.js

PURPOSE

Provides the current competition configuration.

Version 1 contains a single hard-coded preset.
Future versions will load presets from the Match Setup page.

*****************************************************************/

export const currentPreset = {

    competition: {

        name: "Basketball England",

        stageLabel: "PERIOD",

        stageCount: 4

    },

    timings: {

        period: 600,
        break: 120,
        halftime: 900,
        overtime: 300,
        timeout: 60

    },

    stages: [

        {
            type: "period",
            number: 1
        },

    {
    type: "break",

    media: {

        enabled: true,

        key: "break1",

        label: "Break 1"

    }

},

        {
            type: "period",
            number: 2
        },

        {
            type: "halftime"
        },

        {
            type: "period",
            number: 3
        },

      {
    type: "break",

    media: {

        enabled: true,

        key: "break2",

        label: "Break 2"

    }

},

        {
            type: "period",
            number: 4
        },

        {
            type: "summary"
        }

    ],

    team: {

        timeoutsPerTeam: 5

    }

};