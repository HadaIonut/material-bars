// don't you just hate it when the api is so old and bad that
// IT NEEDS A GLOBAL VARIABLE ?
var chromaSDK = undefined;

class RazerChromaAPI {
    constructor() {
        this._colorFVTTOrange = 0x0064ff;
        this._baseColor = 0xffffff;
        this._colorEmpty = 0x000000;
        this._delayBeforeBaseAnimation = 1000;

        this._init();
    }

    // we need to initialize the global variable and to add an event
    // to tell the RazerAPI that we will go to get milk from the closest shop
    // but we will be back soon enough
    _init() {
        chromaSDK = chromaSDK || new ChromaSDK();
        chromaSDK.init();
        this._staticBackground(this._baseColor);

        window.addEventListener('beforeunload', () => {
            this._clearAllAnimations();
            this._uninit();
        });
    }

    // this tells the RazerAPI that we will be gone for milk
    // without this the RazerSynapse will wait for us 10 seconds
    // then assume we will be gone for milk
    _uninit() {
        if (typeof chromaSDK === 'undefined') return;
        chromaSDK.uninit();
    }

    // this clears all the nice colors... I hope...
    _clearAllAnimations() {
        if (typeof ChromaAnimation === 'undefined') return;
        ChromaAnimation.stopAll();
        ChromaAnimation.clearAll();
    }

    // a static animation with the foundry orange
    // this is EXTREMELY IMPORTANT, to not hurt the RazerAPI's feelings
    // we need to provide it with constant messages that we are here
    // and we will not leave...
    _staticBackground(color) {
        const staticColorAnimation = () => {
            ChromaAnimation.staticColor(
                EChromaSDKDeviceEnum.DE_Keyboard,
                color
            );
        };

        // this is needed because... reasons... one of them being
        // that the init function DOESN'T TELL ME WHEN IT'S DONE!
        // what year is it? 1990?
        setTimeout(staticColorAnimation, this._delayBeforeBaseAnimation);
    }

    _setCustomAnimation(colors) {
        if (typeof ChromaAnimation === 'undefined') return;
        ChromaAnimation.custom(EChromaSDKDeviceEnum.DE_Keyboard, colors);
    }

    _displayBar(colors, bar, row, limit, fillColor) {
        const keyboardRow = colors[row];
        const {current, max} = bar;
        if (!current || !max || !keyboardRow) return;

        const percentage = Math.round((current / max) * limit);

        for (let i = 0; i < limit; i++) {
            keyboardRow[i] = i < percentage ? fillColor : this._colorEmpty;
        }

        this._setCustomAnimation(colors);
    }

    _barsAnimation(colors, bars) {
        if (typeof bars.bar1 !== 'undefined') {
            this._displayBar(colors, bars.bar1, 1, 15, 0x0000ff);
        }

        if (typeof bars.bar2 !== 'undefined') {
            this._displayBar(colors, bars.bar2, 0, 15, 0xff0000);
        }
    }

    _spellsAnimation(colors, spells) {
        const spellColors = {
            FULL: 0xff0000,
            HALF: 0x00ff00,
            LOW: 0x0000ff,
            EMPTY: 0x000000,
        };

        this._setCustomAnimation(colors);
    }

    _getEmptyColorsArray(baseColor = this._baseColor) {
        const rows = ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard);
        const columns = ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard);
        const colors = new Array(rows);

        for (let i = 0; i < rows; i++) {
            colors[i] = new Array(columns);
            for (let j = 0; j < columns; j++) {
                colors[i][j] = baseColor;
            }
        }

        return colors;
    }

    showData(collectedTokenData) {
        const {bars, spells} = collectedTokenData;
        const colors = this._getEmptyColorsArray();

        this._barsAnimation(colors, bars)
        this._spellsAnimation(colors, spells)
    }
}