import settingsLists from "./settings-lists.js"
import KeyboardEditor from "../apps/keyboardEditor.js";

const registerSetting = (key, data) => game.settings.register('material-bars', key, data);

const registerSettings = () => {
    settingsLists.SETTINGS.forEach((setting) => registerSetting(setting.key, setting.data));
    settingsLists.STATIC_MODE_SETTINGS.forEach((setting) => registerSetting(setting.key, setting.data));
}

const getSetting = (key) => game.settings.get('material-bars', key);

const setSetting = async (key, data) => await game?.settings?.set('material-bars', key, data);

const registerMenu = (key, data) => {
    game.settings.registerMenu('material-bars', key, data);
}

const registerKeyboardEditor = () => {
    registerMenu('keyboardEditor', {
        name: "Keyboard Editor",
        label: "Keyboard Editor",
        icon: "fas fa-edit",
        type: KeyboardEditor
    })
}

export {registerSettings, getSetting, registerKeyboardEditor, setSetting}