var EndScreenStats = (function () {
    function EndScreenStats() {
        this.m_biomassPrYear = [];
        this.m_yieldPrYear = [];
        this.m_mortalityPrYear = [];
    }
    EndScreenStats.prototype.getBiomassPrYearAt = function (p_index) {
        var b;
        return b;
    };
    EndScreenStats.prototype.setBiomassPrYearAt = function (p_index, p_biomass) {
        this.m_biomassPrYear[p_index] = p_biomass;
    };
    EndScreenStats.prototype.getYieldprYearAt = function (p_index) {
        return this.m_yield[p_index];
    };
    EndScreenStats.prototype.setYieldPrYearAt = function (p_index, p_yield) {
        this.m_yieldPrYear[p_index] = p_yield;
    };
    return EndScreenStats;
}());
//# sourceMappingURL=EndScreenStats.js.map