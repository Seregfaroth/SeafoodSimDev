var Government = (function () {
    function Government(p_restrictions) {
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = 0.2;
        this.m_score = new Score();
    }
    Government.prototype.getScore = function () {
        return this.m_score;
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