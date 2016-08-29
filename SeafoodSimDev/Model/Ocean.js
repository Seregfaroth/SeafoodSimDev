var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Tile.ts"/>
var Ocean = (function (_super) {
    __extends(Ocean, _super);
    function Ocean(p_fishCapacity, p_shipCapacity, p_fishingArea) {
        _super.call(this);
        this.m_fishingArea = false;
        this.m_fishCapacity = p_fishCapacity;
        this.m_shipCapacity = p_shipCapacity;
        if (p_fishingArea) {
            this.m_fishingArea = p_fishingArea;
        }
    }
    Ocean.prototype.getFishCapacity = function () {
        return this.m_fishCapacity;
    };
    Ocean.prototype.getShipCapacity = function () {
        return this.m_shipCapacity;
    };
    Ocean.prototype.isFishingArea = function () {
        return this.m_fishingArea;
    };
    return Ocean;
}(Tile));
//# sourceMappingURL=Ocean.js.map