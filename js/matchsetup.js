/*****************************************************************
FALCONS LIVE
Module: matchsetup.js

Provides the current competition configuration.

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
            number: 1,

            media: {
                enabled: false
            }
        },

        {
            type: "break",

            media: {
    enabled: true,
    trigger: "automatic",
    key: "break1",
    label: "Break 1",
    layout: "banner"
}
        },

        {
            type: "period",
            number: 2,

            media: {
                enabled: false
            }
        },

        {
            type: "halftime",

            media: {
                enabled: true,
                trigger: "automatic",
                key: "halftime",
                label: "Half Time",
                layout: "fullscreen"
            }
        },

        {
            type: "period",
            number: 3,

            media: {
                enabled: false
            }
        },

        {
            type: "break",

            media: {
                enabled: true,
                trigger: "automatic",
                key: "break2",
                label: "Break 2",
                layout: "banner"
            }
        },

        {
            type: "period",
            number: 4,

            media: {
                enabled: false
            }
        },

        {
            type: "summary",

            media: {
                enabled: true,
                trigger: "automatic",
                key: "fulltime",
                label: "Full Time",
                layout: "fullscreen"
            }
        }

    ],

    events: {

        timeout: {

            enabled: true,

            media: {
                enabled: true,
                trigger: "manual",
                key: "timeout",
                label: "Timeout",
                layout: "banner"
            }

        },

        substitution: {

            enabled: true,

            media: {
                enabled: true,
                trigger: "manual",
                key: "substitution",
                label: "Substitution",
                layout: "overlay"
            }

        }

    },

    team: {

        timeoutsPerTeam: 5

    }

};