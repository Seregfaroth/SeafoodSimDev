class Restrictions {

    private m_scenario: Scenario;
    private m_quotes: { [shipOwner: string]: number } = {};
    private m_effortLimits: { [shipOwner: string]: number } = {};
    private m_restrictedAreas: Tile[] = [];
    private m_landingDistrubutions: { [Site: string]: number } = {};
    private m_noCodOfShips: number;
    private m_noMackerelOfShips: number;
    private m_tac: number[] = [undefined, undefined];
   constructor() {
       this.m_scenario = Scenario.getInstance();
       this.m_noCodOfShips = this.m_scenario.getStartNoCodShips();
       this.m_noMackerelOfShips = this.m_scenario.getStartNoMackerelShips();
    }
   public areAreasRestricted(): boolean {
       return this.m_restrictedAreas.length > 0;
   }
   public restrictArea(p_tile: Tile): void {
        this.m_restrictedAreas.push(p_tile);
    }

   public unRestrictArea(p_tile: Tile): void {
       if (this.m_restrictedAreas.indexOf(p_tile) > -1) {
           this.m_restrictedAreas.splice(this.m_restrictedAreas.indexOf(p_tile), 1);
       }
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

    public setNoCodShips(p_n: number): void {
        this.m_noCodOfShips = p_n;
    }

    public getNoCodShips(): number {
        return this.m_noCodOfShips;
    }
    public setNoMackerelShips(p_n: number): void {
        this.m_noMackerelOfShips = p_n;
    }

    public getNoMackerelShips(): number {
        return this.m_noMackerelOfShips;
    }
    public isRestricted(p_tile: Tile): boolean {
        return this.m_restrictedAreas.indexOf(p_tile) > -1;
    }
    public setTacMackerel(p_n: number): void {
        this.m_tac[FishType.mackerel] = p_n;
    }
    public setTacCod(p_n: number): void {
        this.m_tac[FishType.cod] = p_n;
    }
    public getTAC(): number[] {
        return this.m_tac;
    }

}