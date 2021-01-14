import {collectData} from "./data-colection.js";
import {addItemToQueue} from "./animationQueing.js";

let razerAPI;

Hooks.once('init', () => {
    razerAPI = new RazerChromaAPI();
});

Hooks.once('ready', async () => {
    CONFIG.debug.hooks = true;
});

Hooks.on("controlToken", (controlledToken, selected) => {
    const collectedTokenData = collectData(controlledToken.actor, controlledToken.data, !selected);
    addItemToQueue(() => razerAPI.createConstantAnimation(collectedTokenData));
});

Hooks.on("updateToken", (scene, updatedToken) => {
    const allTokens = canvas.tokens.placeables;
    const token = allTokens.find((storedToken) => storedToken.data._id === updatedToken._id);

    const collectedTokenData = collectData(token.actor, token.data, false);
    addItemToQueue(() => razerAPI.createConstantAnimation(collectedTokenData));
});

Hooks.on("updateActor", (actor, actorChange) => {
    const allTokens = canvas.tokens.placeables;
    const token = allTokens.find((storedToken) => storedToken.data.actorId === actorChange._id);

    const collectedTokenData = collectData(token.actor, token.data, false);
    addItemToQueue(() => razerAPI.createConstantAnimation(collectedTokenData));
})