/// <reference path = "Map.ts"/>
/// <reference path = "Government.ts"/>
/// <reference path = "ShipOwner.ts"/>
/// <reference path = "Restrictions.ts"/>
var Model = (function () {
    function Model() {
        this.m_shipOwners = [];
        console.log("constructing model");
        var restrictions = new Restrictions();
        this.m_map = new Map(10, 8, restrictions);
        this.m_goverment = new Government(restrictions);
        this.m_ai = new AI();
        this.createShipOwner(new Point2(3, 3), 100000000000);
    }
    Model.prototype.run = function () {
        //console.log("running model");
        this.m_map.run();
        for (var i = 0; i < this.m_shipOwners.length; i++) {
            this.m_ai.run(this.m_shipOwners[i], this.m_map);
        }
        this.m_goverment.getScore().updateScore(this.m_map, this.m_goverment);
    };
    Model.prototype.getShipOwners = function () {
        return this.m_shipOwners;
    };
    Model.prototype.getMap = function () {
        return this.m_map;
    };
    Model.prototype.getGovernment = function () {
        return this.m_goverment;
    };
    Model.prototype.createShipOwner = function (p_startingPoint, p_balance) {
        this.m_shipOwners.push(new ShipOwner(p_startingPoint, "shipOwner" + this.m_shipOwners.length, p_balance));
    };
    return Model;
}());
//# sourceMappingURL=Model.js.map