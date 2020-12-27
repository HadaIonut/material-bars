const v = new Vibrant(game?.scenes?.viewed?.img);
v.getPalette((err, palette) => {
    const {Vibrant, Muted, LightVibrant, LightMuted, DarkVibrant, DarkMuted} = palette;
    console.log(Vibrant, Muted, LightVibrant, LightMuted, DarkVibrant, DarkMuted);

    const content = `
        <ul style="color: white">
            <li><p style="background-color: rgb(${Vibrant._rgb[0]},${Vibrant._rgb[1]},${Vibrant._rgb[2]})">Vibrant</p><li>
            <li><p style="background-color: rgb(${Muted._rgb[0]},${Muted._rgb[1]},${Muted._rgb[2]})">Muted</p><li>
            <li><p style="background-color: rgb(${LightVibrant._rgb[0]},${LightVibrant._rgb[1]},${LightVibrant._rgb[2]})">LightVibrant</p><li>
            <li><p style="background-color: rgb(${LightMuted._rgb[0]},${LightMuted._rgb[1]},${LightMuted._rgb[2]})">LightMuted</p><li>
            <li><p style="background-color: rgb(${DarkVibrant._rgb[0]},${DarkVibrant._rgb[1]},${DarkVibrant._rgb[2]})">DarkVibrant</p><li>
            <li><p style="background-color: rgb(${DarkMuted._rgb[0]},${DarkMuted._rgb[1]},${DarkMuted._rgb[2]})">DarkMuted</p><li>
        </ul>
    `;
    ChatMessage.create({content});
});