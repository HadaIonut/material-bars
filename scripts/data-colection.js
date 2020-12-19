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

const isPlutoniumNpc = (actor) => actor?.data?.flags?.core?.sourceId.includes("plutonium");

/**
 * So plutonium warlock npcs have this very beautiful bug, where they get generated being able to casts spells normally
 * and this beautiful useless function is here to clear that useless info on them
 * It is not clean in any way, but it somewhat works
 *
 * @param spells - spell structure
 * @param actor - owner of the spells
 */
const fixPlutoniumWarlockNpcs = (spells, actor) => {
    if (!isPlutoniumNpc(actor)) return;

    for (let i = 1; i < 10; i++) {
        spells[`spell${i}`].max = 0;
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
    fixPlutoniumWarlockNpcs(spells, actor);

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