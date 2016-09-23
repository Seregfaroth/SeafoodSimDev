
class EndScreenStats {
    private m_time: number[] = [];
    private m_scenario: Scenario;

    private m_biomassPrTimeUnit: number[] = [];
    private m_yieldPrTimeUnit: number[] = [];
    private m_investPrTimeUnit: number[] = [];
    private m_incomePrTimeUnit: number[] = [];
    private m_natDeathPrTimeUnit: number[] = [];
    //private m_mortalityPrTimeUnit: number[] = [];

    private m_recruitmentPrTimeUnit: number[] = [];

    private m_fuelUsePrTimeUnit: number[] = [];

    private m_employmentLandBasedPrTimeUnit: number[] = [];
    private m_employmentSeaBasedPrTimeUnit: number[] = [];

    private m_biomass: number;
    private m_yield: number;
    //private m_mortality: number;
    

    private m_financialScorePrTimeUnit: number[] = [];
    private m_environmentalScorePrTimeUnit: number[] = [];
    private m_socialScorePrTimeUnit: number[] = [];
    private m_overallScorePrTimeUnit: number[] = [];

    constructor(p_scenario: Scenario) {
        this.m_scenario = p_scenario;
    }
    public setTimeAt(p_index: number, p_timeValue: number) {
        this.m_time[p_index] = p_timeValue;
    }
    public getTimeAt(p_index): number {
        return this.m_time[p_index];
    }

    public getBiomassPrTimeUnitAt(p_index: number): number {
        var b: number;

        return b;
    }
    public setBiomassPrTimeUnitAt(p_index: number, p_biomass) {
        this.m_biomassPrTimeUnit[p_index] = p_biomass;
    }
    public getBiomassPrTimeUnit(): number[] {
        return this.m_biomassPrTimeUnit;
    }
    

    public getYieldprTimeUnitAt(p_index): number {
        return this.m_yield[p_index];
    }
    public setYieldPrTimeUnitAt(p_index, p_yield) {
        this.m_yieldPrTimeUnit[p_index] = p_yield;
    }
    public getYieldPrTimeUnit(): number[] {
        return this.m_yieldPrTimeUnit;
    }

    public getNatDeathprTimeUnitAt(p_index): number {
        return this.m_natDeathPrTimeUnit[p_index];
    }
    public setNatDeathPrTimeUnitAt(p_index, p_yield) {
        this.m_natDeathPrTimeUnit[p_index] = p_yield;
    }
    public getNatDeathPrTimeUnit(): number[] {
        return this.m_natDeathPrTimeUnit;
    }

    public getInvestprTimeUnitAt(p_index): number {
        return this.m_investPrTimeUnit[p_index];
    }
    public setInvestPrTimeUnitAt(p_index, p_yield) {
        this.m_investPrTimeUnit[p_index] = p_yield;
    }
    public getInvestPrTimeUnit(): number[] {
        return this.m_investPrTimeUnit;
    }

    public getIncomePrTimeUnitAt(p_index): number {
        return this.m_incomePrTimeUnit[p_index];
    }
    public setIncomePrTimeUnitAt(p_index, p_yield) {
        this.m_incomePrTimeUnit[p_index] = p_yield;
    }
    public getIncomePrTimeUnit(): number[] {
        return this.m_incomePrTimeUnit;
    }


    public getRecruitmentPrTimeUnitAt(p_index): number {
        return this.m_recruitmentPrTimeUnit[p_index];
    }
    public setRecruitmentPrTimeUnitAt(p_index, p_recruitment) {
        this.m_recruitmentPrTimeUnit[p_index] = p_recruitment;
    }
    public getRecruitmentPrTimeUnit(): number[] {
        return this.m_recruitmentPrTimeUnit;
    }

    public getFuelUsePrTimeUnitAt(p_index): number {
        return this.m_fuelUsePrTimeUnit[p_index];
    }
    public setFuelUsePrTimeUnitAt(p_index, p_recruitment) {
        this.m_fuelUsePrTimeUnit[p_index] = p_recruitment;
    }
    public getFuelUsePrTimeUnit(): number[] {
        return this.m_fuelUsePrTimeUnit;
    }

    public getEmploymentLandBasedPrTimeUnitAt(p_index): number {
        return this.m_employmentLandBasedPrTimeUnit[p_index];
    }
    public setEmploymentLandBasedPrTimeUnitAt(p_index, p_recruitment) {
        this.m_employmentLandBasedPrTimeUnit[p_index] = p_recruitment;
    }
    public getEmploymentLandBasedPrTimeUnit(): number[] {
        return this.m_employmentLandBasedPrTimeUnit;
    }

    public getEmploymentSeaBasedPrTimeUnitAt(p_index): number {
        return this.m_employmentSeaBasedPrTimeUnit[p_index];
    }
    public setEmploymentSeaBasedPrTimeUnitAt(p_index, p_recruitment) {
        this.m_employmentSeaBasedPrTimeUnit[p_index] = p_recruitment;
    }
    public getEmploymentLSeaBasedPrTimeUnit(): number[] {
        return this.m_employmentSeaBasedPrTimeUnit;
    }

    public getEnvironmentalScorePrTimeUnitAt(p_index): number {
        return this.m_environmentalScorePrTimeUnit[p_index];
    }
    public setEnvironmentalScorePrTimeUnitAt(p_index, p_recruitment) {
        this.m_environmentalScorePrTimeUnit[p_index] = p_recruitment;
    }
    public getEnvironmentalScorePrTimeUnit(): number[] {
        return this.m_environmentalScorePrTimeUnit;
    }

    public getFinancialScorePrTimeUnitAt(p_index): number {
        return this.m_financialScorePrTimeUnit[p_index];
    }
    public setFinancialScorePrTimeUnitAt(p_index, p_recruitment) {
        this.m_financialScorePrTimeUnit[p_index] = p_recruitment;
    }
    public getFinancialScorePrTimeUnit(): number[] {
        return this.m_financialScorePrTimeUnit;
    }

    public getSocialScorePrTimeUnitAt(p_index): number {
        return this.m_socialScorePrTimeUnit[p_index];
    }
    public setSocialScorePrTimeUnitAt(p_index, p_recruitment) {
        this.m_socialScorePrTimeUnit[p_index] = p_recruitment;
    }
    public getSocialScorePrTimeUnit(): number[] {
        return this.m_socialScorePrTimeUnit;
    }

    public getOverallScorePrTimeUnitAt(p_index): number {
        return this.m_overallScorePrTimeUnit[p_index];
    }
    public setOverallScorePrTimeUnitAt(p_index, p_recruitment) {
        this.m_overallScorePrTimeUnit[p_index] = p_recruitment;
    }
    public getOverallScorePrTimeUnit(): number[] {
        return this.m_overallScorePrTimeUnit;
    }

    public getEnvironmentalVizArray(): any[] {
        var ret: any[] = [[]];
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
    }
    public getFinancialVizArray(): any[] {
        var ret: any[] = [[]];
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
    }
    public getSocialVizArray(): any[] {
        var ret: any[] = [[]];
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
    }
    public getScoreVizArray(): any[] {
        var ret: any[] = [[]];
        ret[0] = [{ label: 'Days', type: 'number' }, { label: 'Financial' }, { label: 'Environmental' }, { label: 'Social' }, { label: 'Overall'}];
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
    }
    

}