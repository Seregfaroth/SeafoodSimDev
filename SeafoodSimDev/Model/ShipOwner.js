// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var ShipOwner = (function () {
    function ShipOwner(p_government, p_shipStartPosition, p_id, p_balance) {
        this.m_ships = [];
        this.m_shipBought = false;
        this.m_scenario = Scenario.getInstance();
        this.m_government = p_government;
        this.m_shipStartPosition = p_shipStartPosition;
        this.m_id = p_id;
        this.m_license = this.m_scenario.getShipOwnerLicense();
        this.m_shipPrice = this.m_scenario.getShipPrice();
        if (p_balance) {
            this.m_balance = p_balance;
        }
        else {
            this.m_balance = this.m_scenario.getShipOwnerStartBalance();
        }
        this.m_taxPayed = 0;
    }
    ShipOwner.prototype.getID = function () {
        return this.m_id;
    };
    ShipOwner.prototype.getAllShips = function () {
        return this.m_ships;
    };
    ShipOwner.prototype.getCodShips = function () {
        var ships = [];
        this.m_ships.forEach(function (s) {
            if (s.getType() === FishType.cod) {
                ships.push(s);
            }
        });
        return ships;
    };
    ShipOwner.prototype.getMackerelShips = function () {
        var ships = [];
        this.m_ships.forEach(function (s) {
            if (s.getType() === FishType.mackerel) {
                ships.push(s);
            }
        });
        return ships;
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
        if (p_amount < 0) {
            this.m_balance += p_amount;
        }
        else {
            this.m_balance += p_amount * (1 - this.m_government.getTaxingRate());
            this.m_taxPayed += p_amount * this.m_government.getTaxingRate();
        }
    };
    ShipOwner.prototype.buyShip = function (p_fishType, p_position) {
        var ship = new Ship(this, p_fishType, p_position);
        this.m_ships.push(ship);
        this.financialTransaction(-this.m_shipPrice);
        this.m_shipBought = true;
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
    ShipOwner.prototype.getTaxPayed = function () {
        return this.m_taxPayed;
    };
    return ShipOwner;
}());
//# sourceMappingURL=ShipOwner.js.map