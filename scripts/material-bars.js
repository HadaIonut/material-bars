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
    const collectedTokenData = collectData(controlledToken.actor, controlledToken.data);
    razerAPI.showData(collectedTokenData);
});

Hooks.on("updateToken", (scene, updatedToken) => {
    const actor = game.actors.get(updatedToken.actorId);
    const collectedTokenData = collectData(actor, updatedToken);
    razerAPI.showData(collectedTokenData);
});