import {collectData} from "./data-colection.js";
let razerAPI;

Hooks.once('init', () => {
    razerAPI = new RazerChromaAPI();
});

Hooks.once('ready', async () => {
    CONFIG.debug.hooks = true;
    console.log('WORKS');
});


Hooks.on("controlToken", (controlledToken) => {
    collectData(controlledToken.actor, controlledToken.data);
});

Hooks.on("updateToken", (scene, updatedToken) => {
    const actor = game.actors.get(updatedToken.actorId);
    collectData(actor, updatedToken);
});