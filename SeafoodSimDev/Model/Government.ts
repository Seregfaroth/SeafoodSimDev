class Government {
    private m_restrictions: Restrictions;
    private m_taxingRate: number;
    private m_score: Score;
    private m_startingTaxingRate: number = 0.2;

    public constructor(p_restrictions: Restrictions) {
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = this.m_startingTaxingRate;
        this.m_score = new Score();
    }

    public getScore(): Score {
        return this.m_score;
    }

    public getStartingTaxingRate(): number {
        return this.m_startingTaxingRate;
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