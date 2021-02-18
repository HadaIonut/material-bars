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
    STATIC_MODE_SETTINGS: [
        {
            key: "userSetting",
            data: {
                type: Object,
                default: {},
                scope: "client",
                config: false,
                restricted: false
            }
        },

    ]
}