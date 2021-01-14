/**
 * Returns a given actor's resource bars structure
 *
 * @param actor - owner of the data bars
 * @param location - location where the bar info is held
 */

const getBarStructure = (actor, location) => {
    const foundryStructure = actor.data.data ? getProperty(actor.data.data, location) : getProperty(actor.data, location);

    if (foundryStructure) {
        return {
            current: foundryStructure?.value,
            max: foundryStructure?.max
        }
    }

}

/**
 * Returns true the actor has no more spells
 *
 * @param spells - spells list
 */
const hasNoCurrentSpells = (spells) => {
    const spellTypes = Object.keys(spells);
    spellTypes.splice(spellTypes.indexOf('pact'), 1);

    const remainingSpells = spellTypes.reduce((accumulator, reducer) => spells[accumulator]?.current + spells[reducer]?.current);

    return remainingSpells === 0;
}

const hasPactMagic = (spells) => spells.pact.current !== 0;

/**
 * So warlock npcs have this very beautiful bug, where they get generated being able to casts spells normally
 * and this beautiful useless function is here to clear that useless info on them
 * It is not clean in any way, but it somewhat works
 *
 * @param spells - spell structure
 */
const fixPactMagic = (spells) => {
    if (!(hasNoCurrentSpells(spells) && hasPactMagic(spells))) return;

    for (let i = 1; i < 10; i++) {
        spells[`spell${i}`].max = 0;
    }
}

/**
 * Converts the pact magic into spell slots for easier display
 *
 * @param spells - spells structure
 */
const convertPactMagic = (spells) => {
    const pactMagic = spells.pact;
    delete spells.pact;
    if (pactMagic.max === 0) return;
    const spellTarget = `spell${pactMagic.level}`;
    spells[spellTarget].max += pactMagic.max;
    spells[spellTarget].current += pactMagic.current;
}

/**
 * In case any actor has 0 max spell slots and !0 current spell slots it modifies the spells object to have max === current
 *
 * @param spells - spells object
 */
const clearMistakesInSpellStructure = (spells) => {
    Object.keys(spells).forEach((spell) => {
        if (spells[spell].max === 0 && spells[spell].current !== 0)
            spells[spell].max = spells[spell].current;
    })
}

/**
 * Returns a given actor's spell slots structure, except cantrips
 *
 * @param actor
 */
const getSpells = (actor) => {
    const spells = {};

    const actorSpells = actor.data.data ? JSON.parse(JSON.stringify(actor.data.data.spells)) : JSON.parse(JSON.stringify(actor.data.spells));
    Object.keys(actorSpells).forEach((spell) => {
        if (spell === 'pact')
            spells[spell] = {
                current: actorSpells[spell]?.value,
                max: actorSpells[spell]?.max,
                level: actorSpells[spell]?.level
            }
        else
            spells[spell] = {
                current: actorSpells[spell]?.value,
                max: actorSpells[spell]?.max
            }
    })
    delete spells.spell0;
    fixPactMagic(spells);

    convertPactMagic(spells);
    clearMistakesInSpellStructure(spells);

    return spells;
}


/**
 * Returns the token's resource bars and the spell slots
 *
 * @param actor - actor in the token
 * @param controlledToken - target token
 * @param empty - true if the keyboard shouldn't display anything, false if it should display data
 */
const collectData = (actor, controlledToken, empty) => {
    return {
        bars: {
            bar1: getBarStructure(actor, controlledToken.bar1.attribute),
            bar2: getBarStructure(actor, controlledToken.bar2.attribute)
        },
        spells: getSpells(actor),
        empty: empty
    };
}

export {collectData}