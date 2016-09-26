
class Government {
    private m_scenario: Scenario;
    private m_restrictions: Restrictions;
    private m_taxingRate: number;
    private m_score: Score;

    public constructor(p_restrictions: Restrictions, p_scenario: Scenario) {
        
        this.m_scenario = p_scenario;
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = p_scenario.getTaxingRate();
        this.m_score = new Score(p_scenario);
    }

    public getScore(): Score {
        return this.m_score;
    }

    public getStartingTaxingRate(): number {
        return this.m_scenario.getTaxingRate();
    }
    public getTaxingRate(): number {
        return this.m_taxingRate;
    }

    public setTaxingRate(rate: number): void {
        this.m_taxingRate = rate;
    }

    public getRestrictions(): Restrictions {
        return this.m_restrictions;
    }


    
}