"use strict";

class Gacha {
    #BladeData;
    #PityGroups;
    #BladeCollection;
    #pityTimer = 0;

    /**
     * @param {*} bladeData
     * @param {*} pityGroups
     * @param {BladeCollection} bladeCollection
     */
    constructor(bladeData, pityGroups, bladeCollection) {
        this.#BladeData = bladeData;
        this.#PityGroups = pityGroups;
        this.#BladeCollection = bladeCollection;
    }

    /**
     * Get the pity value for a given Core Crystal
     *
     * @param {number} coreRarity The rarity of the selected Core Crystal.
     * @returns {number} The pity value to be added if this Core Crystal results in a Common.
     */
    #getCorePityValue(coreRarity) {
        if (coreRarity >= LEGENDARY_CORE_CRYSTAL)
            return 50;
        else if (coreRarity >= RARE_CORE_CRYSTAL)
            return 25;
        else
            return 5;
    }

    /**
     * Given a pool containing any number of Blades, find the lowest rarity
     *
     * @param {Array} pool
     * @param {number} pityGroup
     * @returns {number}
     */
    #getLowestRarity(pool, pityGroup) {
        let lowest = Number.MAX_VALUE;

        for (let i = 0; i < pool.length; i++) {
            if (pool[i].Rates[pityGroup - 1] < lowest)
                lowest = pool[i].Rates[pityGroup - 1];
        }

        return lowest;
    }

    #getPityBlade(Group) {
        const pityBlades = this.#PityGroups[Group - 1];
        const pool = [];

        for (let i = 0; i < pityBlades.length; i++) {
            if (!this.#BladeCollection.hasRareBlade(pityBlades[i]))
                pool.push(pityBlades[i]);
        }

        if (pool.length > 0)
            return pool[Math.floor(Math.random() * pool.length)];

        return "Common";
    }

    #rareBladeSuccess(bladeID, pityGroup, coreRarity, idea, luckStat) {
        const blade = this.#BladeData[bladeID];

        var prob = Math.max((Math.sqrt(luckStat) * 0.013) + 0.95, 1)
                    * 0.01 * (100 + 5 * idea) * coreRarity * blade.Rates[pityGroup - 1];

        return (prob >= Math.random() * 100);
    }

    #generatePool(pityGroup, coreRarity, selectedIdea, idea, luckStat) {
        const pool = [];

        for (let i = 0; i < this.#BladeData.length; i++) {
            const blade = this.#BladeData[i];

            if (this.#BladeCollection.hasRareBlade(blade.Blade))
                continue;

            if (this.#rareBladeSuccess(i, pityGroup, coreRarity, (selectedIdea === blade.Idea ? idea : 0), luckStat))
                pool.push(blade);
        }

        console.debug("Pool generated: " + pool.map((blade) => blade.Blade).join());

        if (pool.length > 0 && coreRarity === COMMON_CORE_CRYSTAL) {
            const commonRollSuccess = Math.random() < 0.25;

            if (!commonRollSuccess) {
                console.debug("Common Crystal failure");
                return [];
            }

            console.debug("Common Crystal success");
        }

        return pool;
    }

    #rollBlade(pityGroup, pityType, pityPoints, coreRarity, selectedIdea, idea, luckStat) {
        const pool = this.#generatePool(pityGroup, coreRarity, selectedIdea, idea, luckStat);

        let filteredPool = pool.filter((blade) => blade.Idea === selectedIdea);
        if (filteredPool.length === 0)
            filteredPool = pool;

        const lowestRarity = this.#getLowestRarity(filteredPool, pityGroup);

        filteredPool = filteredPool.filter((blade) => blade.Rates[pityGroup - 1] === lowestRarity);
        console.debug("Filtered pool on rarity: " + filteredPool.map((blade) => blade.Blade).join());

        if (filteredPool.length > 0)
            return filteredPool[Math.floor(Math.random() * filteredPool.length)].Blade;

        if (pityPoints >= 100) {
            console.debug("Generating pity blade");

            if (pityType === "Intended")
                return this.#getPityBlade(pityGroup);
            else {
                if (pityGroup === 1)
                    return this.#getPityBlade(pityGroup);
                else
                    return this.#getPityBlade(pityGroup - 1);
            }
        }

        return "Common";
    }

    rollGacha(pityGroup, pityType, coreRarity, selectedIdea, idea, luckStat) {
        this.#pityTimer = this.#pityTimer + this.#getCorePityValue(coreRarity);

        const blades = [];

        for (let slots = 0; slots < 3; slots++) {
            const blade = this.#rollBlade(pityGroup, pityType, this.#pityTimer, coreRarity, selectedIdea, idea, luckStat);
            blades.push(blade);
        }

        this.#BladeCollection.setCollectionStatus(blades[blades.length - 1], true);

        if (blades[blades.length - 1] !== "Common")
            this.#pityTimer = 0;

        return blades;
    }
}