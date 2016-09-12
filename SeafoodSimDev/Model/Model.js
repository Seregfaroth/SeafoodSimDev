/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>
var Model = (function () {
    function Model() {
        this.m_shipOwners = [];
        this.m_time = 0;
        this.m_statFreq = 20;
        this.m_recruitAndAgeFreq = 30;
        //private m_movesPrTick = 1;
        //private m_statFreq = 30;
        this.m_size = 15;
        this.m_noOfSchools = 30;
        console.log("constructing model");
        var restrictions = new Restrictions();
        this.m_stats = new EndScreenStats();
        this.m_map = new Map(this.m_size, this.m_noOfSchools, restrictions);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions);
        this.m_ai = new AI();
        this.createShipOwner(new Point2(3, 3), 300000);
        this.createShipOwner(new Point2(10, 10), 300000);
        this.updateStats();
    }
    Model.prototype.updateStats = function () {
        var biomass = 0;
        var recruit = 0;
        var natDeath = 0;
        // updating time
        this.m_stats.setTimeAt(this.getTime() / this.m_statFreq, this.getTime());
        //updating biomass and recruitment
        for (var _i = 0, _a = this.getMap().getSchools(); _i < _a.length; _i++) {
            var sc = _a[_i];
            biomass += sc.getBiomass();
            recruit += sc.getRecruitTotal();
            natDeath += sc.getNatDeathTotal();
        }
        this.m_stats.setBiomassPrTimeUnitAt(this.getTime() / this.m_statFreq, biomass);
        this.m_stats.setRecruitmentPrTimeUnitAt(this.getTime() / this.m_statFreq, recruit);
        this.m_stats.setNatDeathPrTimeUnitAt(this.getTime() / this.m_statFreq, natDeath);
        //updating yield
        this.m_stats.setYieldPrTimeUnitAt(this.getTime() / this.m_statFreq, this.m_map.getYield());
        //this.m_map.setYield(0);
        // updating scores
        this.m_stats.setFinancialScorePrTimeUnitAt(this.getTime() / this.m_statFreq, this.m_goverment.getScore().getFinancialScore());
        this.m_stats.setEnvironmentalScorePrTimeUnitAt(this.getTime() / this.m_statFreq, this.m_goverment.getScore().getEnvironmentalScore());
        this.m_stats.setSocialScorePrTimeUnitAt(this.getTime() / this.m_statFreq, this.m_goverment.getScore().getSocialScore());
        this.m_stats.setOverallScorePrTimeUnitAt(this.getTime() / this.m_statFreq, this.m_goverment.getScore().getOverallScore());
    };
    Model.prototype.getStats = function () {
        return this.m_stats;
    };
    Model.prototype.run = function (p_noOfMoves) {
        if (p_noOfMoves == undefined)
            p_noOfMoves = 1;
        for (var m = 0; m < p_noOfMoves; m++) {
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
    Model.prototype.getTime = function () {
        return this.m_time;
    };
    Model.prototype.getGovernment = function () {
        return this.m_goverment;
    };
    Model.prototype.createShipOwner = function (p_startingPoint, p_balance) {
        this.m_shipOwners.push(new ShipOwner(this.m_goverment, p_startingPoint, "shipOwner" + this.m_shipOwners.length, p_balance));
    };
    return Model;
}());
//# sourceMappingURL=Model.js.map