var chromaSDK = undefined;

class RazerChromaAPI extends GenericAPI {
    constructor() {
        super('NUMBER');
        this._init();
    }

    /**
     * Disconnects from the RazerAPI
     *
     * @private
     */
    _uninit() {
        if (typeof chromaSDK === 'undefined') return;
        chromaSDK.uninit();
    }

    /**
     * Stops all the currently running animations
     *
     * @private
     */
    _clearAllAnimations() {
        if (typeof ChromaAnimation === 'undefined') return;
        ChromaAnimation.stopAll();
        ChromaAnimation.clearAll();
    }

    /**
     * Creates a 'static' background
     *
     * @param {number} [color=this.getBaseColor()] - the background color displayed for
     *                                               all the keys with no function
     * @private
     */
    _staticBackground(color = this.getBaseColor()) {
        const staticColorAnimation = () =>
            ChromaAnimation.staticColor(EChromaSDKDeviceEnum.DE_Keyboard, color);

        setTimeout(staticColorAnimation, this._constants.DELAY_BEFORE_BASE_ANIMATION);
    }

    /**
     * Creates a JSON with all the constants needed
     *
     * @private
     */
    _createConstants() {
        const hasDeviceEnum = typeof EChromaSDKDeviceEnum !== 'undefined';
        const hasChromaAnimation = typeof ChromaAnimation !== 'undefined';
        const hasDevice2DEnum = typeof EChromaSDKDevice2DEnum !== 'undefined';

        const KEYBOARD = hasDeviceEnum ? EChromaSDKDeviceEnum.DE_Keyboard : 2;
        const KEYBOARD_ROWS = hasChromaAnimation && hasDevice2DEnum ? ChromaAnimation.getMaxRow(EChromaSDKDevice2DEnum.DE_Keyboard) : 22;
        const KEYBOARD_COLS = hasChromaAnimation && hasDevice2DEnum ? ChromaAnimation.getMaxColumn(EChromaSDKDevice2DEnum.DE_Keyboard) : 6;

        this._constants = {
            DELAY_BEFORE_BASE_ANIMATION: 1000,
            KEYBOARD,
            KEYBOARD_ROWS,
            KEYBOARD_COLS,
            KEYBOARD_BARS_LENGTH: 15,
            KEYBOARD_BAR1_ROW: 1,
            KEYBOARD_BAR2_ROW: 0,
        };
    }

    /**
     * Crate a new chromaSDK and establishes a connection,
     * creates a JSON with all the constants needed,
     * starts the static animation,
     * adds an event on `beforeunload` where we stop all the animations
     * and disconnect
     *
     * @private
     */
    _init() {
        chromaSDK = chromaSDK || new ChromaSDK();
        chromaSDK.init();

        this._createConstants();
        this._staticBackground();
        window.addEventListener('beforeunload', () => {
            this._clearAllAnimations();
            this._uninit();
        });
    }

    /**
     * Creates a new custom animation
     *
     * @param {number[][]} colors - an array with colors for every button on a keyboard
     * @private
     */
    _setCustomAnimation(colors) {
        if (typeof ChromaAnimation === 'undefined') return;
        ChromaAnimation.custom(this._constants.KEYBOARD, colors);
    }

    /**
     * Returns a base array with all the keys having the base color
     *
     * @param {number} color - the base color that will fill the keyboard
     * @return {number[][]}
     * @private
     */
    _getBaseKeyboardArray(color = this.getBaseColor()) {
        const rows = this._constants.KEYBOARD_ROWS;
        const cols = this._constants.KEYBOARD_COLS;

        return Array(rows).fill(0).map((_) => Array(cols).fill(color));
    }

    /**
     * Returns an array with colors for a bar display
     *
     * @param {*} bar - information for a bar
     * @param {number} barColor - the color that the bar should have
     * @param {number[][]} colors - an array with colors for every key
     * @param {number} position - the row where we should show the bar
     * @param {number} maxLength - the length of the bar
     * @return {number[][]}
     * @private
     */
    _getBarAnimation(bar, barColor, colors, position, maxLength) {
        const barColors = [...colors];
        const row = barColors[position];
        const {current, max} = bar;

        const numberOfKeysToLight = Math.ceil((current / max) * maxLength);

        for (let i = 0; i < maxLength; i++) {
            row[i] = i <= numberOfKeysToLight ? barColor : this.getEmptyColor();
        }
        return barColors;
    }

    /**
     * Returns an array with colors for the bars display
     *
     * @param {*} bars - information for the two bars
     * @param {number[][]} colors - an array with colors for every key
     * @return {number[][]}
     * @private
     */
    _getBarsAnimation(bars, colors) {
        const hasBar1 = typeof bars.bar1 !== 'undefined';
        const hasBar2 = typeof bars.bar2 !== 'undefined';

        const bar1Colors = hasBar1
            ? this._getBarAnimation(
                bars.bar1,
                this.getBar1Color(bars.bar1),
                colors,
                this._constants.KEYBOARD_BAR1_ROW,
                this._constants.KEYBOARD_BARS_LENGTH
            )
            : colors;
        return hasBar2
            ? this._getBarAnimation(
                bars.bar2,
                this.getBar2Color(bars.bar2),
                bar1Colors,
                this._constants.KEYBOARD_BAR2_ROW,
                this._constants.KEYBOARD_BARS_LENGTH
            )
            : bar1Colors;
    }

    /**
     * Returns an array with colors for every spell slot
     *
     * @param {*} spells - information for every spell slot
     * @param {number[][]} colors - an array with colors for every key
     * @return {number[][]}
     * @private
     */
    _getSpellsAnimation(spells, colors) {
        const spellsColors = [...colors];
        const rows = this._constants.KEYBOARD_ROWS;
        const cols = this._constants.KEYBOARD_COLS;

        const spellLocation = {
            spell1: {r: rows - 2, c: cols - 4},
            spell2: {r: rows - 2, c: cols - 3},
            spell3: {r: rows - 2, c: cols - 2},

            spell4: {r: rows - 3, c: cols - 4},
            spell5: {r: rows - 3, c: cols - 3},
            spell6: {r: rows - 3, c: cols - 2},

            spell7: {r: rows - 4, c: cols - 4},
            spell8: {r: rows - 4, c: cols - 3},
            spell9: {r: rows - 4, c: cols - 2},
        };

        for (let i = 1; i <= 9; i++) {
            const s = `spell${i}`;
            const spell = spells[s];
            const {r, c} = spellLocation[s];

            spellsColors[r][c] = this.getSpellColor(spell);
        }

        return spellsColors;
    }

    /**
     * Creates a persistent animation on the keyboard
     *
     * @param {*} data - data needed for the animation
     * @abstract
     */
    createConstantAnimation(data) {
        const {bars, spells} = data;
        const baseColors = this._getBaseKeyboardArray();
        const barsColors = this._getBarsAnimation(bars, baseColors);
        const spellsColors = this._getSpellsAnimation(spells, barsColors);

        this._setCustomAnimation(spellsColors);
    }
}