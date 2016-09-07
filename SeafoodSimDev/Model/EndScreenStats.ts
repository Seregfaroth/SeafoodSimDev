
class EndScreenStats {
    private m_biomassPrYear: number[] = [];
    private m_yieldPrYear: number[] = [];
    private m_mortalityPrYear: number[] = [];

    private m_biomass: number;
    private m_yield: number;
    private m_mortality: number;

    constructor(p_model: Model) {
        this.m_biomass = 0;
        for (var school of p_model.getMap().getSchools()) {
            this.m_biomass += school.getBiomass();
        }
    }

    public getBiomassPrYearAt(p_index: number): number {
        var b: number;

        return b;
    }

    public setBiomassPrYearAt(p_index: number, p_biomass) {
        this.m_biomassPrYear[p_index] = p_biomass;
    }
}