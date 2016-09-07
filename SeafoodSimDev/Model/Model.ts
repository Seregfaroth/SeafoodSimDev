/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>

class Model {
    private m_map: Map;
    private m_shipOwners: ShipOwner[] = [];
    private m_goverment: Government;
    private m_ai: AI;
    private m_time: number = 0;
    private m_stats: EndScreenStats;
    private m_statFreq = 30;

    constructor() {
        console.log("constructing model");
        
        var restrictions: Restrictions = new Restrictions();
        this.m_stats = new EndScreenStats();
        
        this.m_map = new Map(15, 30, restrictions);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions);
        this.m_ai = new AI();
        this.createShipOwner(new Point2(3, 3), 30000);
        this.updateStats();
    }

    public updateStats() {
        var biomass = 0;
        //updating biomass
        for (var sc of this.getMap().getSchools()) {
            biomass += sc.getBiomass();
        }
        this.m_stats.setBiomassPrYearAt(this.getTime() / this.m_statFreq, biomass);
        //updating yield
        this.m_stats.setYieldPrYearAt(this.getTime() / this.m_statFreq, this.m_map.getYield());
        this.m_map.setYield(0);
    }
    public getStats(): EndScreenStats {
        return this.m_stats;
    }

    public run() {
        this.m_time++;
        //console.log("running model");
        
        this.m_map.run();
        for (var i = 0; i < this.m_shipOwners.length; i++) {
            this.m_ai.run(this.m_shipOwners[i], this.m_map);
        }
        this.m_goverment.getScore().updateScore(this.m_map, this.m_goverment, this.m_time);
    }
    
    public getShipOwners(): ShipOwner[] {
        return this.m_shipOwners;
    }

    public getMap(): Map {
        return this.m_map;
    }
    public getTime(): number {
        return this.m_time;
    }
    public getGovernment(): Government {
        return this.m_goverment;
    }
    public createShipOwner(p_startingPoint: Point2, p_balance?: number) {
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, p_balance));
    }
    
    
}