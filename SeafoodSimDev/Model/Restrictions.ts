class Restrictions{
    private m_quotes: { [shipOwner: string]: number } = {};
    private m_effortLimits: { [shipOwner: string]: number } = {};
   private m_restrictedAreas: Tile[] = [];
   private m_landingDistrubutions: { [Site: string]: number } = {};
   private m_maxShips: number = 1;


    public restrictArea(p_tile: Tile): void {
        this.m_restrictedAreas.push(p_tile);
    }

    public unRestrictArea(p_tile: Tile): void {
        this.m_restrictedAreas.splice(this.m_restrictedAreas.indexOf(p_tile), 1);
    }

    public setQuote(p_shipOwner: string, p_amount: number): void {
        this.m_quotes[p_shipOwner] = p_amount;
    }

    public setEffortLimit(p_shipOwner: string, p_amount: number): void {
        this.m_effortLimits[p_shipOwner] = p_amount;
    }

    public setLandingDistrubution(p_site: string, p_amount: number): void {
        this.m_landingDistrubutions[p_site] = p_amount;
    }

    public getQuotes(): { [shipOwner: string]: number } {
        return this.m_quotes;
    }

    public getEffortLimits(): { [shipOwner: string]: number } {
        return this.m_effortLimits;
    }

    public getRestrictedAreas(): Tile[] {
        return this.m_restrictedAreas;
    }

    public getLandingDistrubutions(): { [Site: string]: number } {
        return this.m_landingDistrubutions;
    }

    public setMaxShips(p_n: number): void {
        this.m_maxShips = p_n;
    }

    public getMaxShips(): number {
        return this.m_maxShips;
    }
    public isRestricted(p_tile: Tile): boolean {
        return this.m_restrictedAreas.indexOf(p_tile) > -1;
    }
}