/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>

class Model {
    private m_config: Configuration;
    private m_map: Map;
    private m_shipOwners: ShipOwner[] = [];
    private m_goverment: Government;
    private m_ai: AI;
    private m_time: number = 0;
    private m_stats: EndScreenStats;
    public m_statFreq = 10;
    private m_recruitAndAgeFreq = 10;
    //private m_movesPrTick = 1;
    //private m_statFreq = 30;
    private m_mapType: number = 2;
    private m_size: number = 10;
    private m_noOfSchools: number = 30;

    constructor(p_config: Configuration) {
        console.log("constructing model");
        this.m_config = p_config;
        var restrictions: Restrictions = new Restrictions(this.m_config);
        this.m_stats = new EndScreenStats();
        
        this.m_map = new Map(this.m_mapType, this.m_size, this.m_noOfSchools, restrictions, this.m_config);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions, this.m_config);
        this.m_ai = new AI(this.m_config);
        this.createShipOwner(new Point2(3, 3), this.m_config.getShipOwnerStartMoney());
        this.updateStats();
    }


    public updateStats() {
        var biomass = 0;
        var recruit = 0;
        var natDeath = 0;
        // updating time
        var statTime = this.getTime() / this.m_statFreq;
        this.m_stats.setTimeAt(statTime, this.getTime());
        //updating biomass and recruitment
        for (var sc of this.getMap().getSchools()) {
            biomass += sc.getBiomass();
            recruit += sc.getRecruitTotal();
            natDeath += sc.getNatDeathTotal();
        }
        this.m_stats.setBiomassPrTimeUnitAt(statTime, biomass);
        this.m_stats.setRecruitmentPrTimeUnitAt(statTime, recruit);
        this.m_stats.setNatDeathPrTimeUnitAt(statTime, natDeath);

        //updating yield
        this.m_stats.setYieldPrTimeUnitAt(statTime, this.m_map.getYield());
        //updating invest
        this.m_stats.setInvestPrTimeUnitAt(statTime, 1000);
        //this.m_map.setYield(0);
        // updating scores
        this.m_stats.setFinancialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getFinancialScore());
        this.m_stats.setEnvironmentalScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getEnvironmentalScore());
        this.m_stats.setSocialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getSocialScore());
        this.m_stats.setOverallScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getOverallScore());

        //updating social
        this.m_stats.setEmploymentLandBasedPrTimeUnitAt(statTime, 10);
        this.m_stats.setEmploymentSeaBasedPrTimeUnitAt(statTime, 10);


    }
    public getStats(): EndScreenStats {
        return this.m_stats;
    }

    public run(p_noOfMoves?: number) {
        if (p_noOfMoves == undefined) p_noOfMoves = 1;
        
        for (var m = 0; m < p_noOfMoves; m++) {
            if (!(this.m_time % this.m_statFreq)) this.updateStats();
            this.m_time++;
            //console.log("running model");

            this.m_map.run();
            if (!(this.m_time % this.m_recruitAndAgeFreq)) {

                this.m_map.ageAndRecruit();
            }
            for (var i = 0; i < this.m_shipOwners.length; i++) {
                this.m_ai.run(this.m_shipOwners[i], this.m_map);
            }

            this.m_goverment.getScore().updateScore(this.m_map, this.m_goverment, this.m_time);
        }
    }
    
    public getShipOwners(): ShipOwner[] {
        return this.m_shipOwners;
    }

    public getMap(): Map {
        return this.m_map;
    }
    public setMap(p_map: Map) {
        this.m_map = p_map;
    }
    public getTime(): number {
        return this.m_time;
    }
    public getGovernment(): Government {
        return this.m_goverment;
    }
    public createShipOwner(p_startingPoint: Point2, p_balance?: number) {
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, this.m_config, p_balance));
    }
    
    
}