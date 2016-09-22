/// <reference path="../Controller/Configuration.ts"/>
var Government = (function () {
    function Government(p_restrictions, p_scenario) {
        this.m_scenario = p_scenario;
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = p_scenario.getTaxingRate();
        this.m_score = new Score(p_scenario);
    }
    Government.prototype.getScore = function () {
        return this.m_score;
    };
    Government.prototype.getStartingTaxingRate = function () {
        return this.m_scenario.getTaxingRate();
    };
    Government.prototype.getTaxingRate = function () {
        return this.m_taxingRate;
    };
    Government.prototype.setTaxingRate = function (rate) {
        this.m_taxingRate = rate;
    };
    Government.prototype.getRestrictions = function () {
        return this.m_restrictions;
    };
    return Government;
}());
//# sourceMappingURL=Government.js.map