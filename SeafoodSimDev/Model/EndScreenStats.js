var EndScreenStats = (function () {
    function EndScreenStats(p_model) {
        this.m_biomassPrYear = [];
        this.m_yieldPrYear = [];
        this.m_mortalityPrYear = [];
        this.m_biomass = 0;
        for (var _i = 0, _a = p_model.getMap().getSchools(); _i < _a.length; _i++) {
            var school = _a[_i];
            this.m_biomass += school.getBiomass();
        }
    }
    EndScreenStats.prototype.getBiomassPrYearAt = function (p_index) {
        var b;
        return b;
    };
    EndScreenStats.prototype.setBiomassPrYearAt = function (p_index, p_biomass) {
        this.m_biomassPrYear[p_index] = p_biomass;
    };
    return EndScreenStats;
}());
//# sourceMappingURL=EndScreenStats.js.map