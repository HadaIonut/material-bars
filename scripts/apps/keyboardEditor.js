import {getSetting, setSetting} from "../settings/settings.js";

export default class KeyboardEditor extends FormApplication {
    static get defaultOptions() {
        return {
            ...super.defaultOptions,
            title: 'Keyboard editor',
            id: 'keyboard-editor',
            template: "modules/material-bars/templates/keyboard-editor.hbs",
            width: 500,

            submitOnChange: true,
            closeOnSubmit: false
        }
    }

    getData(options) {
        return getSetting("userSetting");
    }

    async _updateObject(event, formData) {
        if (event.type === 'change') {
            const eventSource = event.target.name || event.target.id;
            let textOfSource;

            if (eventSource.includes("text.")) textOfSource = $(`input[type='color'][name='${eventSource.slice(5)}']`)[0];
            else textOfSource = $(`input[type='text'][id='text.${eventSource}']`)[0];

            textOfSource.value = event.target.value;
        }
        else {
            await setSetting("userSetting", formData);
            this.close();
        }

    }
}