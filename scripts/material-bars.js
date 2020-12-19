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
    const actor = JSON.parse(JSON.stringify(game.actors.tokens[updatedToken._id]));

    let tokenChange;
    game.scenes.viewed.data.tokens.forEach((token)=> {
        if (token._id === updatedToken._id)
            tokenChange = token.actorData;
    })
    const changeStructure = JSON.stringify(tokenChange);
    const match = changeStructure.match(/(\w+)/g);
    const value = Number(match.pop());
    match.pop();
    const location = match.join('.');

    const collectedTokenData = collectData(actor, updatedToken, [location, value]);
    razerAPI.showData(collectedTokenData);
});

Hooks.on("updateActor", (actor) => {
    const token = JSON.parse(JSON.stringify(actor.data.token));
    const collectedTokenData = collectData(actor, token);
    razerAPI.showData(collectedTokenData);
})