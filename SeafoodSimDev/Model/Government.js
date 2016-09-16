var Government = (function () {
    function Government(p_restrictions, p_config) {
        this.m_startingTaxingRate = 0.2;
        this.m_config = p_config;
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = this.m_startingTaxingRate;
        this.m_score = new Score(p_config);
    }
    Government.prototype.getScore = function () {
        return this.m_score;
    };
    Government.prototype.getStartingTaxingRate = function () {
        return this.m_startingTaxingRate;
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