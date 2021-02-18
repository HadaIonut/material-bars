import settingsLists from "./settings-lists.js"

const registerSetting = (key, data) => game.settings.register('material-bars', key, data);

const registerSettings = () => {
    settingsLists.SETTINGS.forEach((setting) => registerSetting(setting.key, setting.data));
    settingsLists.STATIC_MODE_SETTINGS.forEach((setting) => registerSetting(setting.key, setting.data));
}

const getSetting = (key) => game.settings.get('material-bars', key);

export {registerSettings, getSetting}