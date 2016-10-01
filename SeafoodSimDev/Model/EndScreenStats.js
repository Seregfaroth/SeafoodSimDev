var EndScreenStats = (function () {
    function EndScreenStats(p_scenario) {
        this.m_time = [];
        this.m_biomassPrTimeUnit = [];
        this.m_yieldPrTimeUnit = [];
        this.m_investPrTimeUnit = [];
        this.m_incomePrTimeUnit = [];
        this.m_natDeathPrTimeUnit = [];
        //private m_mortalityPrTimeUnit: number[] = [];
        this.m_recruitmentPrTimeUnit = [];
        this.m_fuelUsePrTimeUnit = [];
        this.m_employmentLandBasedPrTimeUnit = [];
        this.m_employmentSeaBasedPrTimeUnit = [];
        //private m_mortality: number;
        this.m_financialScorePrTimeUnit = [];
        this.m_environmentalScorePrTimeUnit = [];
        this.m_socialScorePrTimeUnit = [];
        this.m_overallScorePrTimeUnit = [];
        this.m_scenario = p_scenario;
    }
    EndScreenStats.prototype.setTimeAt = function (p_index, p_timeValue) {
        this.m_time[p_index] = p_timeValue;
    };
    EndScreenStats.prototype.getTimeAt = function (p_index) {
        return this.m_time[p_index];
    };
    EndScreenStats.prototype.getBiomassPrTimeUnitAt = function (p_index) {
        return this.m_biomassPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setBiomassPrTimeUnitAt = function (p_index, p_biomass) {
        this.m_biomassPrTimeUnit[p_index] = p_biomass;
    };
    EndScreenStats.prototype.getBiomassPrTimeUnit = function () {
        return this.m_biomassPrTimeUnit;
    };
    EndScreenStats.prototype.getYieldprTimeUnitAt = function (p_index) {
        return this.m_yield[p_index];
    };
    EndScreenStats.prototype.setYieldPrTimeUnitAt = function (p_index, p_yield) {
        this.m_yieldPrTimeUnit[p_index] = p_yield;
    };
    EndScreenStats.prototype.getYieldPrTimeUnit = function () {
        return this.m_yieldPrTimeUnit;
    };
    EndScreenStats.prototype.getNatDeathprTimeUnitAt = function (p_index) {
        return this.m_natDeathPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setNatDeathPrTimeUnitAt = function (p_index, p_yield) {
        this.m_natDeathPrTimeUnit[p_index] = p_yield;
    };
    EndScreenStats.prototype.getNatDeathPrTimeUnit = function () {
        return this.m_natDeathPrTimeUnit;
    };
    EndScreenStats.prototype.getInvestprTimeUnitAt = function (p_index) {
        return this.m_investPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setInvestPrTimeUnitAt = function (p_index, p_yield) {
        this.m_investPrTimeUnit[p_index] = p_yield;
    };
    EndScreenStats.prototype.getInvestPrTimeUnit = function () {
        return this.m_investPrTimeUnit;
    };
    EndScreenStats.prototype.getIncomePrTimeUnitAt = function (p_index) {
        return this.m_incomePrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setIncomePrTimeUnitAt = function (p_index, p_yield) {
        this.m_incomePrTimeUnit[p_index] = p_yield;
    };
    EndScreenStats.prototype.getIncomePrTimeUnit = function () {
        return this.m_incomePrTimeUnit;
    };
    EndScreenStats.prototype.getRecruitmentPrTimeUnitAt = function (p_index) {
        return this.m_recruitmentPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setRecruitmentPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_recruitmentPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getRecruitmentPrTimeUnit = function () {
        return this.m_recruitmentPrTimeUnit;
    };
    EndScreenStats.prototype.getFuelUsePrTimeUnitAt = function (p_index) {
        return this.m_fuelUsePrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setFuelUsePrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_fuelUsePrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getFuelUsePrTimeUnit = function () {
        return this.m_fuelUsePrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentLandBasedPrTimeUnitAt = function (p_index) {
        return this.m_employmentLandBasedPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentLandBasedPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentLandBasedPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLandBasedPrTimeUnit = function () {
        return this.m_employmentLandBasedPrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentSeaBasedPrTimeUnitAt = function (p_index) {
        return this.m_employmentSeaBasedPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentSeaBasedPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentSeaBasedPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLSeaBasedPrTimeUnit = function () {
        return this.m_employmentSeaBasedPrTimeUnit;
    };
    EndScreenStats.prototype.getEnvironmentalScorePrTimeUnitAt = function (p_index) {
        return this.m_environmentalScorePrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEnvironmentalScorePrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_environmentalScorePrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEnvironmentalScorePrTimeUnit = function () {
        return this.m_environmentalScorePrTimeUnit;
    };
    EndScreenStats.prototype.getFinancialScorePrTimeUnitAt = function (p_index) {
        return this.m_financialScorePrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setFinancialScorePrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_financialScorePrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getFinancialScorePrTimeUnit = function () {
        return this.m_financialScorePrTimeUnit;
    };
    EndScreenStats.prototype.getSocialScorePrTimeUnitAt = function (p_index) {
        return this.m_socialScorePrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setSocialScorePrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_socialScorePrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getSocialScorePrTimeUnit = function () {
        return this.m_socialScorePrTimeUnit;
    };
    EndScreenStats.prototype.getOverallScorePrTimeUnitAt = function (p_index) {
        return this.m_overallScorePrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setOverallScorePrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_overallScorePrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getOverallScorePrTimeUnit = function () {
        return this.m_overallScorePrTimeUnit;
    };
    EndScreenStats.prototype.getEnvironmentalVizArray = function () {
        var ret = [[]];
        //add header
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Biomass' }, { label: 'recruit' }, { label: 'Yield' }, { label: 'naturel Death' }];
        //ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Biomass' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add biomass
            ret[parseInt(i) + 1][1] = this.m_biomassPrTimeUnit[i];
            //add recruitment
            ret[parseInt(i) + 1][2] = this.m_recruitmentPrTimeUnit[i];
            //add yield
            ret[parseInt(i) + 1][3] = this.m_yieldPrTimeUnit[i];
            //add naturel death
            ret[parseInt(i) + 1][4] = this.m_natDeathPrTimeUnit[i];
        }
        return ret;
    };
    EndScreenStats.prototype.getFinancialVizArray = function () {
        var ret = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Income' }, { label: 'Invest' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add yield
            ret[parseInt(i) + 1][1] = this.m_incomePrTimeUnit[i];
            //add invest
            ret[parseInt(i) + 1][2] = this.m_investPrTimeUnit[i];
        }
        return ret;
    };
    EndScreenStats.prototype.getSocialVizArray = function () {
        var ret = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'LandEmp' }, { label: 'SeaEmp' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add land employment
            ret[parseInt(i) + 1][1] = this.m_employmentLandBasedPrTimeUnit[i];
            //add sea employment
            ret[parseInt(i) + 1][2] = this.m_employmentSeaBasedPrTimeUnit[i];
        }
        return ret;
    };
    EndScreenStats.prototype.getScoreVizArray = function () {
        var ret = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Financial' }, { label: 'Environmental' }, { label: 'Social' }, { label: 'Overall' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add Financial Score
            ret[parseInt(i) + 1][1] = this.m_financialScorePrTimeUnit[i];
            //add Enviromental Score
            ret[parseInt(i) + 1][2] = this.m_environmentalScorePrTimeUnit[i];
            //add Social Score
            ret[parseInt(i) + 1][3] = this.m_socialScorePrTimeUnit[i];
            //add Overall Score
            ret[parseInt(i) + 1][4] = this.m_overallScorePrTimeUnit[i];
        }
        return ret;
    };
    return EndScreenStats;
}());
//# sourceMappingURL=EndScreenStats.js.map