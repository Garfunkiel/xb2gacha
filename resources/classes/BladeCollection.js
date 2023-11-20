"use strict";

class BladeCollection {
    #DisplayCollectionCallback = null;
    #Rares = {};
    #RareArr = [];
    #RareOrder = [];
    #Commons = [];

    constructor(displayCollectionCallback) {
        this.#DisplayCollectionCallback = displayCollectionCallback;

        for (let i = 0; i < BladeData.length; i++) {
            const blade = BladeData[i];

            this.#Rares[blade.Blade] = {
                Name: blade.Blade,
                Element: blade.Element,
                Idea: blade.Idea,
                Collected: false
            };

            this.#RareArr.push(this.#Rares[blade.Blade]);
        }
    }

    getCollection() {
        const collection = [];

        for (let i = 0; i < this.#RareOrder.length; i++)
            collection.push(this.#RareOrder[i]);

        for (let i = 0; i < this.#Commons.length; i++)
            collection.push("Common");

        return collection;
    }

    getUnowned() {
        const unowned = [];

        for (let i = 0; i < this.#RareArr.length; i++) {
            const blade = this.#RareArr[i];
            if (!blade.Collected)
                unowned.push(blade.Name);
        }

        return unowned;
    }

    hasAllRares() {
        return this.#RareOrder.length === BladeData.length;
    }

    hasRareBlade(bladeName) {
        return this.#Rares[bladeName].Collected;
    }

    displayCollection() {
        this.#DisplayCollectionCallback(this.getCollection(), this.getUnowned());
    }

    /**
     * Add a Rare Blade to the Collection
     *
     * @param {string} bladeName
     * @returns {void}
     */
    addRareBlade(bladeName) {
        if (this.#Rares[bladeName].Collected)
            return;

        this.#Rares[bladeName].Collected = true;
        this.#RareOrder.push(bladeName);
        this.displayCollection();
    }

    releaseRareBlade(bladeName) {
        this.#Rares[bladeName].Collected = false;
        this.#RareOrder = this.#RareOrder.filter((blade) => blade !== bladeName);
        this.displayCollection();
    }

    addCommonBlade(blade) {
        this.#Commons.push(blade);
        this.displayCollection();
    }

    releaseCommonBlade(bladeID) {
        this.#Commons = this.#Commons.filter((blade) => blade.ID !== bladeID);
        this.displayCollection();
    }

    setCollectionStatus(blade, isCollected) {
        if (isCollected) {
            if (blade !== "Common")
                this.addRareBlade(blade);
            else
                this.addCommonBlade(blade);
        } else {
            if (blade !== "Common")
                this.releaseRareBlade(blade);
            else
                this.releaseCommonBlade(blade);
        }
    }
}