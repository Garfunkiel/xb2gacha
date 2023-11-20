"use strict";

class Controller {
    BladeCollection;
    #Gacha;
    #KeepRolling = false;

    constructor() {
        this.BladeCollection = new BladeCollection(this.displayCollection);
        this.#Gacha = new Gacha(BladeData, PITY_GROUPS, this.BladeCollection);
    }

    btnResetClicked() {
        this.BladeCollection = new BladeCollection(this.displayCollection);
        this.#Gacha = new Gacha(BladeData, PITY_GROUPS, this.BladeCollection);
        this.BladeCollection.displayCollection();
    }

    btnRollClicked() {
        const selectedIdea = this.getSelectedIdea();

        this.displayResults(
            this.#Gacha.rollGacha(
                this.getSelectedGroup(),
                this.getPityType(),
                this.getCoreRarity(),
                selectedIdea,
                this.getDriverIdea(selectedIdea),
                this.getLuckStat()
            )
        );
    }

    btnContinousRollClicked() {
        this.#KeepRolling = true;
        this.#continuousRoll();
    }

    #continuousRoll() {
        if (!this.#KeepRolling)
            return;

        this.btnRollClicked();
        if (!this.BladeCollection.hasAllRares())
            setTimeout(() => {
                this.#continuousRoll();
            }, 1000 - 10 * parseInt($('#txtPeriod').val(), 10));
    }

    btnStopRollingClicked() {
        this.#KeepRolling = false;
    }

    getSelectedGroup() {
        return $('#selGroup').val();
    }

    getPityType() {
        return $('#selPityType').val();
    }

    getBoosters() {
        return parseInt($('#txtBoosters').val(), 10);
    }

    getLuckStat() {
        return parseInt($('#txtLuck').val(), 10);
    }

    getCoreRarity() {
        return parseFloat($('#selCrystal').val());
    }

    getDriverIdea(idea) {
        let value = 0;

        if (idea === IDEA_BRAVERY)
            value = parseInt($('#txtBravery').val(), 10);
        else if (idea === IDEA_TRUTH)
            value = parseInt($('#txtTruth').val(), 10);
        else if (idea === IDEA_COMPASSION)
            value = parseInt($('#txtCompassion').val(), 10);
        else if (idea === IDEA_JUSTICE)
            value = parseInt($('#txtJustice').val(), 10);

        if (idea === $('#selBoostedIdea').val())
            value = value + this.getBoosters();

        return value;
    }

    getDriverIdeas() {
        return [
            {Idea: IDEA_BRAVERY,    Value: this.getDriverIdea(IDEA_BRAVERY)},
            {Idea: IDEA_TRUTH,      Value: this.getDriverIdea(IDEA_TRUTH)},
            {Idea: IDEA_COMPASSION, Value: this.getDriverIdea(IDEA_COMPASSION)},
            {Idea: IDEA_JUSTICE,    Value: this.getDriverIdea(IDEA_JUSTICE)}
        ];
    }

    getSelectedIdea() {
        if (this.getBoosters > 0)
            return $('#selBoostedIdea').val();

        const maxIdea = Math.max(this.getDriverIdea(IDEA_BRAVERY, IDEA_TRUTH));
        const maxIdeas = this.getDriverIdeas().filter((idea) => idea.Value === maxIdea);

        return maxIdeas[Math.floor(Math.random() * maxIdeas.length)].Idea;
    }

    displayResults(blades) {
        let html = "";

        for (let i = 0; i < blades.length; i++) {
            const blade = blades[i];
            html += `<img src="resources/images/${blade}.png" width="240" ${i === 2 ? "" : 'class="silhouette"'} title="${blade}" />`;
        }

        $("#divResults").html(html);
    }

    displayCollection(collection, unowned) {
        var html = "";
        var commons = 0;

        for (var i = 0; i < collection.length; i++) {
            if (collection[i] === "Common") {
                commons++;
                continue;
            }

            html +=
                `<div style="display: inline-block; width: 125px; height: 165px;">
                    <h5 class="center-align">${collection[i]}</h5>
                    <img src="resources/images/${collection[i]}.png" width="120" title="${collection[i]}" />
                </div>`;
        }

        html +=
                `<div style="display: inline-block; width: 125px; height: 165px;">
                    <h5 class="center-align">+${commons}</h5>
                    <img src="resources/images/Common.png" width="120" title="Commons" />
                </div>`;

        for (let i = 0; i < unowned.length; i++) {
            html +=
                `<div style="display: inline-block; width: 125px; height: 165px;">
                    <h5 class="center-align">${unowned[i]}</h5>
                    <img src="resources/images/${unowned[i]}.png" width="120" title="${unowned[i]}" class="silhouette" />
                </div>`;
        }

        $("#divCollection").html(html);
    }
}