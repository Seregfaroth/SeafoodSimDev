var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="Tile.ts"/>
var Ocean = (function (_super) {
    __extends(Ocean, _super);
    function Ocean(p_carryingCapacity, p_shipCapacity, p_fishingArea) {
        _super.call(this);
        this.m_fishingArea = false;
        this.m_shipsInTile = 0;
        this.m_carryingCapacityC = p_carryingCapacity;
        this.m_shipCapacity = p_shipCapacity;
        if (p_fishingArea) {
            this.m_fishingArea = p_fishingArea;
        }
    }
    Ocean.prototype.getCarryingCapacity = function () {
        return this.m_carryingCapacityC;
    };
    Ocean.prototype.getCarryingCapacityBySpecies = function (p_name) {
        var ret;
    };
    Ocean.prototype.getShipCapacity = function () {
        return this.m_shipCapacity;
    };
    Ocean.prototype.getShipsInTile = function () {
        return this.m_shipsInTile;
    };
    Ocean.prototype.roomForAnotherShip = function () {
        return this.m_shipsInTile < this.m_shipCapacity;
    };
    Ocean.prototype.isFishingArea = function () {
        return this.m_fishingArea;
    };
    Ocean.prototype.claimTile = function () {
        if (this.m_shipsInTile >= this.m_shipCapacity) {
            throw "Error! Attempting to claim a tile that is full";
        }
        this.m_shipsInTile++;
    };
    Ocean.prototype.releaseTile = function () {
        if (this.m_shipsInTile < 1) {
            throw "Error! Trying to release tile, when there were no ships";
        }
        this.m_shipsInTile--;
    };
    return Ocean;
}(Tile));
//# sourceMappingURL=Ocean.js.map