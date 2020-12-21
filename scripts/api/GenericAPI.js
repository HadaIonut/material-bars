class GenericAPI {
    /**
     * @param colorType {'STRING' | 'NUMBER'}
     *                  determines the type of colors that will be used e.g.
     *                  RazerAPI uses the 'NUMBER' type
     */
    constructor(colorType) {
        this._colors = {
            STRING: {
                // generic
                WHITE: '#ffffff',
                BLACK: '#000000',
                FOUNDRY_ORANGE: '#ff6400',

                // This ones will be used for bar1
                GREEN: '#00b83d',
                YELLOW: '#e5f533',
                RED: '#ff0000',

                // This ones will be used for bar2
                BLUE: '#0000ff',
                PURPLE: '#6328b5',
                PINK: '#b52894',
            },
            NUMBER: {
                // generic
                WHITE: 0xffffff,
                BLACK: 0x000000,
                FOUNDRY_ORANGE: 0x0064ff,

                // This ones will be used for bar1
                GREEN: 0x3db800,
                YELLOW: 0x33f5e5,
                RED: 0x0000ff,

                // This ones will be used for bar2
                BLUE: 0xff0000,
                PURPLE: 0xb52863,
                PINK: 0x9428b5,
            },
        };
        this._stages = {
            MEDIUM: 0.6,
            LOW: 0.3,
            EMPTY: 0,
        };

        this._colorType = colorType;
    }

    /**
     * Returns a JSON with all the color constants used
     *
     * @return {{string} | {number}}
     * @protected
     */
    getColors() {
        return this._colors[this._colorType];
    }

    /**
     *
     * @param {string | number} [baseColor] - used to overwrite the base color
     * @return {string | number}
     * @protected
     */
    getBaseColor(baseColor) {
        const {FOUNDRY_ORANGE} = this.getColors();
        return baseColor || FOUNDRY_ORANGE;
    }

    /**
     *
     * @param {string | number} [emptyColor] - used to overwrite the empty color
     * @return {string | number}
     * @protected
     */
    getEmptyColor(emptyColor) {
        const {BLACK} = this.getColors();
        return emptyColor || BLACK;
    }

    /**
     * Returns a color for the 3 states a bar can have {LOW, MEDIUM, HIGH}
     *
     * @param {number} current - the current value for a bar
     * @param {number} max - the max value that bar can get
     * @param {*} colors - a JSON with the colors that should be used, it needs to have the following structure
     *                     {HIGH: {number | string}, MEDIUM: {number | string},  LOW: {number | string}}
     * @return {number | string}
     * @protected
     */
    getBarColor({current, max}, colors) {
        if (current <= max * this._stages.LOW) return colors.LOW;
        if (current <= max * this._stages.MEDIUM) return colors.MEDIUM;
        return colors.HIGH;
    }

    /**
     * Get the color for the first bar
     *
     * @param {*} bar - the first bar, should contain {current, max}
     * @param {*} [colors] - used if you want to overwrite the colors
     * @return {number|string}
     * @protected
     */
    getBar1Color(bar, colors) {
        const defaultColors = this.getColors();
        const stageColors = {
            LOW: colors?.LOW || defaultColors.RED,
            MEDIUM: colors?.MEDIUM || defaultColors.YELLOW,
            HIGH: colors?.HIGH || defaultColors.GREEN,
        };

        return this.getBarColor(bar, stageColors);
    }

    /**
     * Get the color for the second bar
     *
     * @param {*} bar - the second bar, should contain {current, max}
     * @param {*} [colors] - used if you want to overwrite the colors
     * @return {number|string}
     * @protected
     */
    getBar2Color(bar, colors) {
        const defaultColors = this.getColors();
        const stageColors = {
            LOW: colors?.LOW || defaultColors.PINK,
            MEDIUM: colors?.MEDIUM || defaultColors.PURPLE,
            HIGH: colors?.HIGH || defaultColors.BLUE,
        };

        return this.getBarColor(bar, stageColors);
    }

    /**
     * Returns a color for the 4 states a spell can have {EMPTY, LOW, MEDIUM, HIGH}
     *
     * @param {number} current - the current number of spell slots left
     * @param {number} max - the maximum number of spell slots
     * @param {*} [colors] - used if you want to overwrite the colors
     *
     * @return {number | string}
     * @protected
     */
    getSpellColor({current, max}, colors) {
        const defaultColors = this.getColors();
        const stageColors = {
            EMPTY: colors?.EMPTY || defaultColors.BLACK,
            LOW: colors?.LOW || defaultColors.RED,
            MEDIUM: colors?.MEDIUM || defaultColors.YELLOW,
            HIGH: colors?.HIGH || defaultColors.GREEN,
        };

        if (current <= max * this._stages.EMPTY) return stageColors.EMPTY;
        if (current <= max * this._stages.LOW) return stageColors.LOW;
        if (current <= max * this._stages.MEDIUM) return stageColors.MEDIUM;
        return stageColors.HIGH;
    }

    /**
     * Creates a persistent animation on the keyboard
     *
     * @param {*} data - data needed for the animation
     * @abstract
     */
    createConstantAnimation(data) {}
}