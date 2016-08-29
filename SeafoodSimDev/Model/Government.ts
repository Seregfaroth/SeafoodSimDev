class Government {
    private m_restrictions: Restrictions;
    private m_taxingRate: number;
    private m_score: Score;
 
    public constructor(p_restrictions: Restrictions) {
        this.m_restrictions = p_restrictions;
        this.m_taxingRate = 0.2;
        this.m_score = new Score();

    }
    public getScore(): Score {
        return this.m_score;
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