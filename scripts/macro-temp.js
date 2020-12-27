function getBgAvgColor() {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(getImgAvgColor(img));
        img.onerror = reject;
        img.src = game?.scenes?.viewed?.img;
    });
}

function getImgAvgColor(img) {
    const defaultRGB = {r: 0, g:0, b: 0}; // ?? for non-supporting envs 
    const RGB = {...defaultRGB};
    const tempCanvas = document.createElement('canvas');
    const context = typeof tempCanvas.getContext !== 'undefined' && tempCanvas.getContext('2d');

    if (!context) return defaultRGB;

    const height = tempCanvas.height = img.naturalHeight || img.offsetHeight || img.height;
    const width = tempCanvas.width = img.naturalWidth || img.offsetWidth || img.width;

    // ??
    context.drawImage(img, 0, 0);

    let data = null;
    try {
        data = context.getImageData(0, 0, width, height)?.data;
    } catch (e) {
        // security error, img on diff domain
        console.error(e);
        return defaultRGB;
    }

    const blockSize = 5; // only visit every 5 pixels
    const length = data.length;
    let count = 0;

    for (let i = -4 + blockSize * 4; i < length; i += blockSize * 4, ++count) {
        RGB.r += data[i];
        RGB.g += data[i + 1];
        RGB.b += data[i + 2];
    }


    //In case anything breaks here bother @bmarian to fix, it's his shit not mine
    return Object.entries(RGB).reduce((newRGB, [space, color]) => {
        newRGB[space] = Math.floor(color / count);
        return newRGB;
    }, {});
};

console.log(await getBgAvgColor());