/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>

class Model {
    private m_scenario: Scenario;
    private m_map: Map;
    private m_shipOwners: ShipOwner[] = [];
    private m_goverment: Government;
    private m_ai: AI;
    private m_time: number = 0;
    private m_stats: EndScreenStats;

    constructor(p_scenario: Scenario) {
        console.log("constructing model");
        
        this.m_scenario = p_scenario;
        var restrictions: Restrictions = new Restrictions(this.m_scenario);
        this.m_stats = new EndScreenStats(this.m_scenario);

        this.m_map = new Map( restrictions, this.m_scenario);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions, this.m_scenario);
        this.m_ai = new AI(this.m_scenario);
        for (var i = 0; i < p_scenario.getNoOfShipOwners(); i++) {
            var startShipPoint: Point2;
            do {
                startShipPoint = new Point2(Math.round(Math.random() * (this.m_map.getMapHeight() - 1)), Math.round(Math.random() * (this.m_map.getMapWidth() - 1)));
            }   while (!(this.m_map.getTile(startShipPoint) instanceof Ocean))//If this is not an ocean tile, find a new tile
            this.createShipOwner(startShipPoint);
        }
       
        this.updateStats();
    }
    public getScenario(): Scenario {
        return this.m_scenario;
    }

    public updateStats() {
        var biomass = 0;
        var recruit = 0;
        var natDeath = 0;
        // updating time
        var statTime = this.getTime() / this.m_scenario.getStatFreq();
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
        var t = this.m_map.getYield();
        this.m_stats.setYieldPrTimeUnitAt(statTime, this.m_map.getYield());

        //updating income
        var income = 0;
        for (var so of this.m_shipOwners) {
            income += so.getTaxPayed();
        }
        
        this.m_stats.setIncomePrTimeUnitAt(statTime, income);
        //updating invest
        var invest = this.getMap().getNoOfShips() * this.m_scenario.getShipPrice();
        this.m_stats.setInvestPrTimeUnitAt(statTime, invest);
        //this.m_map.setYield(0);
        // updating scores
        this.m_stats.setFinancialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getFinancialScore());
        this.m_stats.setEnvironmentalScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getEnvironmentalScore());
        this.m_stats.setSocialScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getSocialScore());
        this.m_stats.setOverallScorePrTimeUnitAt(statTime, this.m_goverment.getScore().getOverallScore());

        //updating social
        var offshore = this.getMap().getNoOfShips() * this.m_scenario.getNoOfMenPerShip();
        var onshore = this.getMap().getFuelSites().length * 5 + this.getMap().getLandingSites().length * 10;
        this.m_stats.setEmploymentLandBasedPrTimeUnitAt(statTime, onshore);
        this.m_stats.setEmploymentSeaBasedPrTimeUnitAt(statTime, offshore);


    }
    public getStats(): EndScreenStats {
        return this.m_stats;
    }

    public run(p_noOfMoves?: number) {
        if (p_noOfMoves == undefined) p_noOfMoves = 1;
        
        for (var m = 0; m < p_noOfMoves; m++) {
            if (!(this.m_time % this.m_scenario.getStatFreq())) this.updateStats();
            this.m_time++;
            //console.log("running model");

            this.m_map.run();
            if (!(this.m_time % this.m_scenario.getRecruitAndAgeFreq())) {

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
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, this.m_scenario, p_balance));
    }
    
    
}