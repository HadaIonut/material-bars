let razerAPI;

Hooks.once('init', () => {
   razerAPI = new RazerChromaAPI();
});