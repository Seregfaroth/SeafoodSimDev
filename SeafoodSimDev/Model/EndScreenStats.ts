
class EndScreenStats {
    private m_biomassPrYear: number[] = [];
    private m_yieldPrYear: number[] = [];
    private m_mortalityPrYear: number[] = [];

    private m_biomass: number;
    private m_yield: number;
    private m_mortality: number;

    constructor() {
        
    }

    public getBiomassPrYearAt(p_index: number): number {
        var b: number;

        return b;
    }

    public setBiomassPrYearAt(p_index: number, p_biomass) {
        this.m_biomassPrYear[p_index] = p_biomass;
    }

    public getYieldprYearAt(p_index): number {
        return this.m_yield[p_index];
    }
    public setYieldPrYearAt(p_index, p_yield) {
        this.m_yieldPrYear[p_index] = p_yield;
    }
}