var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Tile.ts"/>
var Site = (function (_super) {
    __extends(Site, _super);
    function Site(p_shipCapacity, p_resourceCapacity, p_processPerDay, p_id) {
        _super.call(this);
        this.m_shipCapacity = p_shipCapacity;
        this.m_resourceCapacity = p_resourceCapacity;
        this.m_processPerDay = p_processPerDay;
        this.m_runningCost = p_processPerDay * 0.005;
        this.m_id = p_id;
    }
    Site.prototype.getID = function () {
        return this.m_id;
    };
    Site.prototype.getShipCapacity = function () {
        return this.m_shipCapacity;
    };
    Site.prototype.getRunningCost = function () {
        return this.m_runningCost;
    };
    Site.prototype.getResourceCapacity = function () {
        return this.m_resourceCapacity;
    };
    Site.prototype.getResourceAtSite = function () {
        return this.m_resourceAtSite;
    };
    Site.prototype.getProcessPerDay = function () {
        return this.m_processPerDay;
    };
    return Site;
}(Tile));
//# sourceMappingURL=Site.js.map