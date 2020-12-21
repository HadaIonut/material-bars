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
     *
     * @param baseColor {string | number} - used to overwrite the base color, leave empty for default
     * @return {string | number}
     * @private
     */
    _getBaseColor(baseColor) {
        const {FOUNDRY_ORANGE} = this._getColors();
        return baseColor || FOUNDRY_ORANGE;
    }

    /**
     * Returns a JSON with all the color constants used
     *
     * @return {{string} | {number}}
     * @private
     */
    _getColors() {
        return this._colors[this._colorType];
    }

    /**
     * Returns a color for the 3 states a bar can have {LOW, MEDIUM, HIGH}
     *
     * @param current {number} - the current value for a bar
     * @param max {number} - the max value that bar can get
     * @param colors {*} - a JSON with the colors that should be used, it needs to have the following structure
     *                     {HIGH: {number | string}, MEDIUM: {number | string},  LOW: {number | string}}
     * @return {number | string}
     * @private
     */
    _getBarColor({current, max}, colors) {
        if (current < max * this._stages.LOW) return colors.LOW;
        if (current < max * this._stages.MEDIUM) return colors.MEDIUM;
        return colors.HIGH;
    }

    /**
     * Get the color for the first bar
     *
     * @param bar {*} - the first bar, should contain {current, max}
     * @param colors {*} - used if you want to overwrite the colors, if not uses the default
     *                     foundry colors for bar 1
     * @return {number|string}
     * @private
     */
    _getBar1Color(bar, colors) {
        const defaultColors = this._getColors();
        const stageColors = {
            LOW: colors?.LOW || defaultColors.RED,
            MEDIUM: colors?.MEDIUM || defaultColors.YELLOW,
            HIGH: colors?.HIGH || defaultColors.GREEN,
        };

        return this._getBarColor(bar, stageColors);
    }

    /**
     * Get the color for the second bar
     *
     * @param bar {*} - the second bar, should contain {current, max}
     * @param colors {*} - used if you want to overwrite the colors, if not uses the default
     *                     foundry colors for bar 2
     * @return {number|string}
     * @private
     */
    _getBar2Color(bar, colors) {
        const defaultColors = this._getColors();
        const stageColors = {
            LOW: colors?.LOW || defaultColors.PINK,
            MEDIUM: colors?.MEDIUM || defaultColors.PURPLE,
            HIGH: colors?.HIGH || defaultColors.BLUE,
        };

        return this._getBarColor(bar, stageColors);
    }

    /**
     * Returns a color for the 4 states a spell can have {EMPTY, LOW, MEDIUM, HIGH}
     *
     * @param current {number} - the current number of spell slots left
     * @param max {number} - the maximum number of spell slots
     * @param colors {*} - used if you want to overwrite the colors, if not uses the default
     *
     * @return {number | string}
     * @private
     */
    _getSpellColor({current, max}, colors) {
        const defaultColors = this._getColors();
        const stageColors = {
            EMPTY: colors?.EMPTY || defaultColors.BLACK,
            LOW: colors?.LOW || defaultColors.RED,
            MEDIUM: colors?.MEDIUM || defaultColors.YELLOW,
            HIGH: colors?.HIGH || defaultColors.GREEN,
        };

        if (current <= max * this._stages.EMPTY) return stageColors.EMPTY;
        if (current < max * this._stages.LOW) return stageColors.LOW;
        if (current < max * this._stages.MEDIUM) return stageColors.MEDIUM;
        return stageColors.HIGH;
    }
}