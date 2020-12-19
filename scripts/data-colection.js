const getBarStructure = (source, location) => {
    const foundryStructure = getProperty(source.actor.data.data, location)
    if (foundryStructure)
        return {
            current: foundryStructure?.value,
            max: foundryStructure?.max
        }
}

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
    return spells;
}

const collectData = (controlledToken) => {
    const controlledTokenData = {
        bars: {
            bar1: getBarStructure(controlledToken, controlledToken.data.bar1.attribute),
            bar2: getBarStructure(controlledToken, controlledToken.data.bar2.attribute)
        },
        spells: getSpells(controlledToken.actor)
    };

    console.log(controlledTokenData);
}

export {collectData}