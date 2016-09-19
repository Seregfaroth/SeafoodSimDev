/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>
var Model = (function () {
    function Model(p_config) {
        this.m_shipOwners = [];
        this.m_time = 0;
        this.m_statFreq = 10;
        this.m_recruitAndAgeFreq = 10;
        //private m_movesPrTick = 1;
        //private m_statFreq = 30;
        this.m_mapType = 2;
        this.m_size = 10;
        this.m_noOfSchools = 30;
        console.log("constructing model");
        this.m_config = p_config;
        var restrictions = new Restrictions(this.m_config);
        this.m_stats = new EndScreenStats();
        this.m_map = new Map(this.m_mapType, this.m_size, this.m_noOfSchools, restrictions, this.m_config);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions, this.m_config);
        this.m_ai = new AI(this.m_config);
        this.createShipOwner(new Point2(3, 3), this.m_config.getShipOwnerStartMoney());
        this.updateStats();
    }
    Model.prototype.updateStats = function () {
        var biomass = 0;
        var recruit = 0;
        var natDeath = 0;
        // updating time
        var statTime = this.getTime() / this.m_statFreq;
        this.m_stats.setTimeAt(statTime, this.getTime());
        //updating biomass and recruitment
        for (var _i = 0, _a = this.getMap().getSchools(); _i < _a.length; _i++) {
            var sc = _a[_i];
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
    };
    Model.prototype.getStats = function () {
        return this.m_stats;
    };
    Model.prototype.run = function (p_noOfMoves) {
        if (p_noOfMoves == undefined)
            p_noOfMoves = 1;
        for (var m = 0; m < p_noOfMoves; m++) {
            if (!(this.m_time % this.m_statFreq))
                this.updateStats();
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
    };
    Model.prototype.getShipOwners = function () {
        return this.m_shipOwners;
    };
    Model.prototype.getMap = function () {
        return this.m_map;
    };
    Model.prototype.setMap = function (p_map) {
        this.m_map = p_map;
    };
    Model.prototype.getTime = function () {
        return this.m_time;
    };
    Model.prototype.getGovernment = function () {
        return this.m_goverment;
    };
    Model.prototype.createShipOwner = function (p_startingPoint, p_balance) {
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, this.m_config, p_balance));
    };
    return Model;
}());
//# sourceMappingURL=Model.js.map