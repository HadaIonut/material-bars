import {collectData} from "./data-colection.js";

let razerAPI;

Hooks.once('init', () => {
    razerAPI = new RazerChromaAPI();
});

Hooks.once('ready', async () => {
    // CONFIG.debug.hooks = true;
});


Hooks.on("controlToken", (controlledToken, selected) => {
    const collectedTokenData = collectData(controlledToken.actor, controlledToken.data, !selected);
    razerAPI.createConstantAnimation(collectedTokenData);
});

Hooks.on("updateToken", (scene, updatedToken) => {
    const allTokens = canvas.tokens.placeables;
    const token = allTokens.reduce((accumulator,storedToken)=> {
        if (storedToken.data._id === updatedToken._id) return storedToken;
    })

    const collectedTokenData = collectData(token.actor, token.data, false);
    razerAPI.createConstantAnimation(collectedTokenData);
});

Hooks.on("updateActor", (actor, actorChange) => {
    const allTokens = canvas.tokens.placeables;
    const token = allTokens.reduce((accumulator,storedToken)=> {
        if (storedToken.data.actorId === actorChange._id) return storedToken;
    })

    const collectedTokenData = collectData(token.actor, token.data, false);
    razerAPI.createConstantAnimation(collectedTokenData);
})