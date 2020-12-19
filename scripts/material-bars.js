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
    const actor = game.actors.tokens[updatedToken._id] ?
        JSON.parse(JSON.stringify(game.actors.tokens[updatedToken._id])) :
        JSON.parse(JSON.stringify(game.actors.get(updatedToken.actorId)));

    let tokenChange, value, location;
    game.scenes.viewed.data.tokens.forEach((token) => {
        if (token._id === updatedToken._id)
            tokenChange = token.actorData;
    })
    if (Object.keys(tokenChange).length !== 0) {
        const changeStructure = JSON.stringify(tokenChange);
        const match = changeStructure.match(/(\w+)/g);
        value = Number(match.pop());
        match.pop();
        location = match.join('.');
    }

    const collectedTokenData = collectData(actor, updatedToken, [location, value]);
    razerAPI.showData(collectedTokenData);
});

Hooks.on("updateActor", (actor, tokenChange) => {
    const collectedTokenData = collectData(actor, actor.data.token);
    razerAPI.showData(collectedTokenData);
})