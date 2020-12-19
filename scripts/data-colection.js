/**
 * Returns a given actor's resource bars structure
 *
 * @param actor - owner of the data bars
 * @param location - location where the bar info is held
 */

const getBarStructure = (actor, location) => {
    const foundryStructure = getProperty(actor.data.data, location)
    if (foundryStructure)
        return {
            current: foundryStructure?.value,
            max: foundryStructure?.max
        }
}

/**
 * Returns a given actor's spell slots structure
 *
 * @param actor
 */
const getSpells = (actor) => {
    const spells = {};
    const actorSpells = JSON.parse(JSON.stringify(actor.data.data.spells));
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
    return spells;
}

/**
 * Returns the token's resource bars and the spell slots
 *
 * @param actor - actor in the token
 * @param controlledToken - target token
 */
const collectData = (actor, controlledToken) => {
    const controlledTokenData = {
        bars: {
            bar1: getBarStructure(actor, controlledToken.bar1.attribute),
            bar2: getBarStructure(actor, controlledToken.bar2.attribute)
        },
        spells: getSpells(actor)
    };

    console.log(controlledTokenData);
    return controlledTokenData;
}

export {collectData}