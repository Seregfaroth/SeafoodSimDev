var EndScreenStats = (function () {
    function EndScreenStats() {
        this.m_time = [];
        this.m_biomassCodPrTimeUnit = [];
        this.m_biomassMacPrTimeUnit = [];
        this.m_biomassOtherPrTimeUnit = [];
        this.m_yieldPrTimeUnit = [];
        this.m_investPrTimeUnit = [];
        this.m_incomeCodPrTimeUnit = [];
        this.m_incomeMackerelPrTimeUnit = [];
        this.m_incomeOtherPrTimeUnit = [];
        this.m_natDeathPrTimeUnit = [];
        //private m_mortalityPrTimeUnit: number[] = [];
        this.m_recruitmentCodPrTimeUnit = [];
        this.m_recruitmentMacPrTimeUnit = [];
        this.m_recruitmentOtherPrTimeUnit = [];
        this.m_fuelUsePrTimeUnit = [];
        this.m_employmentLandBasedCodPrTimeUnit = [];
        this.m_employmentLandBasedMackerelPrTimeUnit = [];
        this.m_employmentLandBasedOtherPrTimeUnit = [];
        this.m_employmentSeaBasedCodPrTimeUnit = [];
        this.m_employmentSeaBasedMackerelPrTimeUnit = [];
        this.m_employmentSeaBasedOtherPrTimeUnit = [];
        //private m_mortality: number;
        this.m_financialScorePrTimeUnit = [];
        this.m_environmentalScorePrTimeUnit = [];
        this.m_socialScorePrTimeUnit = [];
        this.m_overallScorePrTimeUnit = [];
        this.m_scenario = Scenario.getInstance();
    }
    EndScreenStats.prototype.setTimeAt = function (p_index, p_timeValue) {
        this.m_time[p_index] = p_timeValue;
    };
    EndScreenStats.prototype.getTimeAt = function (p_index) {
        return this.m_time[p_index];
    };
    EndScreenStats.prototype.getBiomassCodPrTimeUnitAt = function (p_index) {
        return this.m_biomassCodPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setBiomassCodPrTimeUnitAt = function (p_index, p_biomass) {
        this.m_biomassCodPrTimeUnit[p_index] = p_biomass;
    };
    EndScreenStats.prototype.getBiomassCodPrTimeUnit = function () {
        return this.m_biomassCodPrTimeUnit;
    };
    EndScreenStats.prototype.getBiomassMacPrTimeUnitAt = function (p_index) {
        return this.m_biomassMacPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setBiomassMacPrTimeUnitAt = function (p_index, p_biomass) {
        this.m_biomassMacPrTimeUnit[p_index] = p_biomass;
    };
    EndScreenStats.prototype.getBiomassMacPrTimeUnit = function () {
        return this.m_biomassMacPrTimeUnit;
    };
    EndScreenStats.prototype.getBiomassOtherPrTimeUnitAt = function (p_index) {
        return this.m_biomassOtherPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setBiomassOtherPrTimeUnitAt = function (p_index, p_biomass) {
        this.m_biomassOtherPrTimeUnit[p_index] = p_biomass;
    };
    EndScreenStats.prototype.getBiomassOtherPrTimeUnit = function () {
        return this.m_biomassOtherPrTimeUnit;
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
    EndScreenStats.prototype.getIncomeCodPrTimeUnitAt = function (p_index) {
        return this.m_incomeCodPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setIncomeCodPrTimeUnitAt = function (p_index, p_revenue) {
        this.m_incomeCodPrTimeUnit[p_index] = p_revenue;
    };
    EndScreenStats.prototype.getIncomeCodPrTimeUnit = function () {
        return this.m_incomeCodPrTimeUnit;
    };
    EndScreenStats.prototype.getIncomeMackerelPrTimeUnitAt = function (p_index) {
        return this.m_incomeMackerelPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setIncomeMackerelPrTimeUnitAt = function (p_index, p_revenue) {
        this.m_incomeMackerelPrTimeUnit[p_index] = p_revenue;
    };
    EndScreenStats.prototype.getIncomeMackerelPrTimeUnit = function () {
        return this.m_incomeMackerelPrTimeUnit;
    };
    EndScreenStats.prototype.getIncomeOtherPrTimeUnitAt = function (p_index) {
        return this.m_incomeOtherPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setIncomeOtherPrTimeUnitAt = function (p_index, p_revenue) {
        this.m_incomeOtherPrTimeUnit[p_index] = p_revenue;
    };
    EndScreenStats.prototype.getIncomeOtherPrTimeUnit = function () {
        return this.m_incomeOtherPrTimeUnit;
    };
    EndScreenStats.prototype.getRecruitmentCodPrTimeUnitAt = function (p_index) {
        return this.m_recruitmentCodPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setRecruitmentCodPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_recruitmentCodPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getRecruitmentCodPrTimeUnit = function () {
        return this.m_recruitmentCodPrTimeUnit;
    };
    EndScreenStats.prototype.getRecruitmentMacPrTimeUnitAt = function (p_index) {
        return this.m_recruitmentMacPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setRecruitmentMacPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_recruitmentMacPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getRecruitmentMacPrTimeUnit = function () {
        return this.m_recruitmentMacPrTimeUnit;
    };
    EndScreenStats.prototype.getRecruitmentOtherPrTimeUnitAt = function (p_index) {
        return this.m_recruitmentOtherPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setRecruitmentOtherPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_recruitmentOtherPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getRecruitmentOtherPrTimeUnit = function () {
        return this.m_recruitmentOtherPrTimeUnit;
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
    EndScreenStats.prototype.getEmploymentLandBasedCodPrTimeUnitAt = function (p_index) {
        return this.m_employmentLandBasedCodPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentLandBasedCodPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentLandBasedCodPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLandBasedCodPrTimeUnit = function () {
        return this.m_employmentLandBasedCodPrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentLandBasedMackerelPrTimeUnitAt = function (p_index) {
        return this.m_employmentLandBasedMackerelPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentLandBasedMackerelPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentLandBasedMackerelPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLandBasedMackerelPrTimeUnit = function () {
        return this.m_employmentLandBasedMackerelPrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentLandBasedOtherPrTimeUnitAt = function (p_index) {
        return this.m_employmentLandBasedOtherPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentLandBasedOtherPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentLandBasedOtherPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLandBasedOtherPrTimeUnit = function () {
        return this.m_employmentLandBasedOtherPrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentSeaBasedCodPrTimeUnitAt = function (p_index) {
        return this.m_employmentSeaBasedCodPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentSeaBasedCodPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentSeaBasedCodPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLSeaBasedCodPrTimeUnit = function () {
        return this.m_employmentSeaBasedCodPrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentSeaBasedMackerelPrTimeUnitAt = function (p_index) {
        return this.m_employmentSeaBasedMackerelPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentSeaBasedMackerelPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentSeaBasedMackerelPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLSeaBasedMackerelPrTimeUnit = function () {
        return this.m_employmentSeaBasedMackerelPrTimeUnit;
    };
    EndScreenStats.prototype.getEmploymentSeaBasedOtherPrTimeUnitAt = function (p_index) {
        return this.m_employmentSeaBasedOtherPrTimeUnit[p_index];
    };
    EndScreenStats.prototype.setEmploymentSeaBasedOtherPrTimeUnitAt = function (p_index, p_recruitment) {
        this.m_employmentSeaBasedOtherPrTimeUnit[p_index] = p_recruitment;
    };
    EndScreenStats.prototype.getEmploymentLSeaBasedOtherPrTimeUnit = function () {
        return this.m_employmentSeaBasedOtherPrTimeUnit;
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
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'BiomassCod' }, { label: 'BiomassMac' }, { label: 'recruitCod' }, { label: 'recruitMac' }];
        //     ret[0] = [{ label: 'Days', type: 'number' }, { label: 'BiomassCod' }, { label: 'BiomassMac' }, { label: 'BiomassOther' }, { label: 'recruitCod' }, { label: 'recruitMac' }, { label: 'recruitOther' }, { label: 'Yield' }, { label: 'naturel Death' }];
        //ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Biomass' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add biomass
            ret[parseInt(i) + 1][1] = this.m_biomassCodPrTimeUnit[i];
            ret[parseInt(i) + 1][2] = this.m_biomassMacPrTimeUnit[i];
            //ret[parseInt(i) + 1][3] = this.m_biomassOtherPrTimeUnit[i];
            //add recruitment
            ret[parseInt(i) + 1][3] = this.m_recruitmentCodPrTimeUnit[i];
            ret[parseInt(i) + 1][4] = this.m_recruitmentMacPrTimeUnit[i];
        }
        return ret;
    };
    EndScreenStats.prototype.getFinancialVizArray = function () {
        var ret = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'RevenueCod' }, { label: 'RevenueMac' }];
        //ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Income' }, { label: 'Invest' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add revenue
            ret[parseInt(i) + 1][1] = this.m_incomeCodPrTimeUnit[i];
            ret[parseInt(i) + 1][2] = this.m_incomeMackerelPrTimeUnit[i];
        }
        return ret;
    };
    EndScreenStats.prototype.getSocialVizArray = function () {
        var ret = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'LandEmpCod' }, { label: 'LandEmpMac' }, { label: 'SeaEmpCod' }, { label: 'SeaEmpMac' }];
        for (var i in this.m_time) {
            ret[parseInt(i) + 1] = [];
            //add timeScale
            ret[parseInt(i) + 1][0] = this.m_time[i];
            //add land employment
            ret[parseInt(i) + 1][1] = this.m_employmentLandBasedCodPrTimeUnit[i];
            ret[parseInt(i) + 1][2] = this.m_employmentLandBasedMackerelPrTimeUnit[i];
            //add sea employment
            ret[parseInt(i) + 1][3] = this.m_employmentSeaBasedCodPrTimeUnit[i];
            ret[parseInt(i) + 1][4] = this.m_employmentSeaBasedMackerelPrTimeUnit[i];
        }
        return ret;
    };
    EndScreenStats.prototype.getScoreVizArray = function () {
        var ret = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Economic' }, { label: 'Environmental' }, { label: 'Social' }, { label: 'Overall' }];
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