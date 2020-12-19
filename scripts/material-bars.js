import {collectData} from "./data-colection.js"

// const sleep = (ms) => {
//     const currentTime = new Date().getTime();
//     while (currentTime + ms >= new Date().getTime()) {
//     }
// }
//
// const createDamageTaken = (chromaSDK, damageFrames, damageOn, damageOff) => () => {
//     if (damageFrames === false) {
//         damageOn = chromaSDK.preCreateKeyboardEffect("CHROMA_STATIC", 0xff);
//
//         damageOff = chromaSDK.preCreateKeyboardEffect("CHROMA_NONE");
//         damageFrames = true;
//     }
//
//     chromaSDK.setEffect(damageOn);
//     setTimeout(() => {
//         chromaSDK.setEffect(damageOff);
//     }, 500);
//
//     // sleep(50);
//
//     // chromaSDK.deleteEffect(damageOn);
//     // chromaSDK.deleteEffect(damageOff);
// }
//
// let chromaSDK;
//
// Hooks.once('ready', async () => {
//     chromaSDK = new ChromaSDK();
//     chromaSDK.init();
// });
//
// Hooks.on('hoverToken', (_0, whatever) => {
//     if (!whatever) return;
//     // createDamageTaken(chromaSDK, false, null, null)();
// });

Hooks.once('ready', async () => {
    CONFIG.debug.hooks = true;
    console.log('WORKS');
});


Hooks.on("controlToken", (controlledToken) => {
    collectData(controlledToken.actor, controlledToken.data);
})

Hooks.on("updateToken", (scene, updatedToken) => {
    const actor = game.actors.get(updatedToken.actorId);
    collectData(actor, updatedToken);
})