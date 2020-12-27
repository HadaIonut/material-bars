const v = new Vibrant(game?.scenes?.viewed?.img);
v.getPalette((err, palette) => {
    const {Vibrant, Muted, LightVibrant, LightMuted, DarkVibrant, DarkMuted} = palette;
    console.log(Vibrant, Muted, LightVibrant, LightMuted, DarkVibrant, DarkMuted);

    const vibrant = `rgb(${Vibrant._rgb[0]},${Vibrant._rgb[1]},${Vibrant._rgb[2]})`;
    const muted = `rgb(${Muted._rgb[0]},${Muted._rgb[1]},${Muted._rgb[2]})`;
    const lightVibrant = `rgb(${LightVibrant._rgb[0]},${LightVibrant._rgb[1]},${LightVibrant._rgb[2]})`;
    const lightMuted = `rgb(${LightMuted._rgb[0]},${LightMuted._rgb[1]},${LightMuted._rgb[2]})`;
    const darkVibrant = `rgb(${DarkVibrant._rgb[0]},${DarkVibrant._rgb[1]},${DarkVibrant._rgb[2]})`;
    const darkMuted = `rgb(${DarkMuted._rgb[0]},${DarkMuted._rgb[1]},${DarkMuted._rgb[2]})`;

    const content = `
        <ul style="color: white">
            <li><p style="background-color: ${vibrant}">Vibrant: ${vibrant}</p><li>
            <li><p style="background-color: ${muted}">Muted: ${muted}</p><li>
            <li><p style="background-color: ${lightVibrant}">LightVibrant: ${lightVibrant}</p><li>
            <li><p style="background-color: ${lightMuted}">LightMuted: ${lightMuted}</p><li>
            <li><p style="background-color: ${darkVibrant}">DarkVibrant: ${darkVibrant}</p><li>
            <li><p style="background-color: ${darkMuted}">DarkMuted: ${darkMuted}</p><li>
        </ul>
    `;
    ChatMessage.create({content});
});