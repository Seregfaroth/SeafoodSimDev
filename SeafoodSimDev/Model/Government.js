var Government = (function () {
    function Government(p_restrictions) {
        this.m_scenario = Scenario.getInstance();
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = this.m_scenario.getTaxingRate();
        this.m_score = new Score(this.m_scenario);
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