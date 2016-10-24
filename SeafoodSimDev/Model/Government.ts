
class Government {
    private m_scenario: Scenario;
    private m_restrictions: Restrictions;
    private m_taxingRate: number;
    private m_score: Score;

    public constructor(p_restrictions: Restrictions) {

        this.m_scenario = Scenario.getInstance();
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = this.m_scenario.getTaxingRate();
        this.m_score = new Score(this.m_scenario);
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