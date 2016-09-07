/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
/// <reference path = "EndScreenStats.ts"/>
var Model = (function () {
    function Model() {
        this.m_shipOwners = [];
        this.m_time = 0;
        this.m_statFreq = 30;
        console.log("constructing model");
        var restrictions = new Restrictions();
        this.m_stats = new EndScreenStats();
        this.m_map = new Map(15, 30, restrictions);
        //this.m_stats = new EndScreenStats(this.m_map);
        this.m_goverment = new Government(restrictions);
        this.m_ai = new AI();
        this.createShipOwner(new Point2(3, 3), 30000);
        this.updateStats();
    }
    Model.prototype.updateStats = function () {
        var biomass = 0;
        //updating biomass
        for (var _i = 0, _a = this.getMap().getSchools(); _i < _a.length; _i++) {
            var sc = _a[_i];
            biomass += sc.getBiomass();
        }
        this.m_stats.setBiomassPrYearAt(this.getTime() / this.m_statFreq, biomass);
        //updating yield
        this.m_stats.setYieldPrYearAt(this.getTime() / this.m_statFreq, this.m_map.getYield());
        this.m_map.setYield(0);
    };
    Model.prototype.getStats = function () {
        return this.m_stats;
    };
    Model.prototype.run = function () {
        this.m_time++;
        //console.log("running model");
        this.m_map.run();
        for (var i = 0; i < this.m_shipOwners.length; i++) {
            this.m_ai.run(this.m_shipOwners[i], this.m_map);
        }
        this.m_goverment.getScore().updateScore(this.m_map, this.m_goverment, this.m_time);
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