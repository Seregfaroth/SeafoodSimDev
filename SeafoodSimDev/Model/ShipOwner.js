// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var ShipOwner = (function () {
    function ShipOwner(p_shipStartPosition, p_id, p_balance) {
        this.m_ships = [];
        this.m_balance = 1000;
        this.m_license = true;
        this.m_shipPrice = 100; // Should maybe be stored in map?
        this.m_shipStartPosition = p_shipStartPosition;
        this.m_id = p_id;
        if (p_balance) {
            this.m_balance = p_balance;
        }
    }
    ShipOwner.prototype.getID = function () {
        return this.m_id;
    };
    ShipOwner.prototype.getShips = function () {
        return this.m_ships;
    };
    ShipOwner.prototype.getBalance = function () {
        return this.m_balance;
    };
    ShipOwner.prototype.getShipStartPosition = function () {
        return this.m_shipStartPosition;
    };
    ShipOwner.prototype.hasLicense = function () {
        return this.m_license;
    };
    ShipOwner.prototype.obtainLisence = function () {
        this.m_license = true;
    };
    ShipOwner.prototype.looseLisence = function () {
        this.m_license = false;
    };
    ShipOwner.prototype.getShipPrice = function () {
        return this.m_shipPrice;
    };
    ShipOwner.prototype.financialTransaction = function (p_amount) {
        this.m_balance += p_amount;
    };
    ShipOwner.prototype.buyShip = function () {
        var ship = new Ship(this);
        this.m_ships.push(ship);
        this.financialTransaction(-this.m_shipPrice);
        return ship;
    };
    ShipOwner.prototype.sellShip = function (ship) {
        if (this.m_ships.indexOf(ship) === -1) {
            throw new Error("Ship owner does not own this ship");
        }
        else {
            this.m_ships.splice(this.m_ships.indexOf(ship), 1);
            this.financialTransaction(this.m_shipPrice);
        }
    };
    return ShipOwner;
}());
//# sourceMappingURL=ShipOwner.js.map