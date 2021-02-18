export default {
    SETTINGS: [
        {
            key: "displaySpells",
            data: {
                name: "Display spells?",
                type: Boolean,
                default: true,
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "displayBars",
            data: {
                name: "Display bars?",
                type: Boolean,
                default: true,
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "illuminationMode",
            data: {
                name: "Illumination mode:",
                type: String,
                choices: {
                    "static": "Static",
                    "dynamic": "Dynamic"
                },
                default: "static",
                scope: "client",
                config: true,
                restricted: false
            }
        }
    ],
    STATIC_MODE_SETTINGS:[
        {
            key: "backgroundColor",
            data: {
                name: "Keyboard background color",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "spellFull",
            data: {
                name: "Color for when a spell is full: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "spellMedium",
            data: {
                name: "Color for when a spell is at medium: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "spellLow",
            data: {
                name: "Color for when a spell is low: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "bar1Full",
            data: {
                name: "Color for when bar 1 is full: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "bar1Medium",
            data: {
                name: "Color for when bar 1 is at medium: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "bar1Low",
            data: {
                name: "Color for when bar 1 is low: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "bar2Full",
            data: {
                name: "Color for when bar 2 is full: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "bar2Medium",
            data: {
                name: "Color for when bar 2 is at medium: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
        {
            key: "bar2Low",
            data: {
                name: "Color for when bar 2 is low: ",
                type: String,
                default: "Placeholder",
                scope: "client",
                config: true,
                restricted: false
            }
        },
    ]
}