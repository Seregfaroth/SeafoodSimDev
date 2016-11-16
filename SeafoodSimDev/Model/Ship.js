// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
var shipState;
(function (shipState) {
    shipState[shipState["fishing"] = 0] = "fishing";
    shipState[shipState["goingToFish"] = 1] = "goingToFish";
    shipState[shipState["goingToRefuel"] = 2] = "goingToRefuel";
    shipState[shipState["goingToLand"] = 3] = "goingToLand";
    shipState[shipState["waiting"] = 4] = "waiting";
})(shipState || (shipState = {}));
var FishType;
(function (FishType) {
    FishType[FishType["Cod"] = 0] = "Cod";
    FishType[FishType["Mackerel"] = 1] = "Mackerel";
})(FishType || (FishType = {}));
var Ship = (function () {
    function Ship(p_owner, p_fishType) {
        this.m_fishedFor = 0;
        this.m_path = [];
        this.history = [[], [], [], [], []]; //For debugging  purpose
        this.m_scenario = Scenario.getInstance();
        this.m_noHistory = this.m_scenario.getNoHistory();
        this.m_position = p_owner.getShipStartPosition();
        this.m_yield = [[], []];
        this.m_fuelCapacity = this.m_scenario.getShipFuelCapacity();
        this.m_cargoCapacity = this.m_scenario.getShipCargoCapacity();
        this.m_fuelPerMove = this.m_scenario.getShipFuelPerMove();
        this.m_fuelPerFishingTick = this.m_scenario.getFuelFishingPerTick();
        this.m_fuel = this.m_fuelCapacity;
        this.m_owner = p_owner;
        this.m_state = shipState.waiting;
        this.m_fishingGear = new FishingGear(p_fishType);
    }
    Ship.prototype.getFishedFor = function () {
        return this.m_fishedFor;
    };
    Ship.prototype.resetFishedFor = function () {
        this.m_fishedFor = 0;
    };
    Ship.prototype.getState = function () {
        return this.m_state;
    };
    Ship.prototype.setState = function (state) {
        this.m_state = state;
    };
    Ship.prototype.getFuel = function () {
        return this.m_fuel;
    };
    Ship.prototype.getCargo = function () {
        return this.m_fishingGear.getCargo();
    };
    Ship.prototype.getFuelCapacity = function () {
        return this.m_fuelCapacity;
    };
    Ship.prototype.getCargoCapacity = function () {
        return this.m_cargoCapacity;
    };
    Ship.prototype.getPath = function () {
        return this.m_path;
    };
    Ship.prototype.setPath = function (p_path) {
        if (!this.m_position.compare(p_path[0])) {
            throw new Error("path is not starting at ship position");
        }
        this.m_path = p_path;
        if (!this.m_noHistory) {
            this.history[0].push("current + " + this.m_position.row + " , " + this.m_position.col);
            this.history[0].push("path 0: " + p_path[0].row + ", " + p_path[0].col);
            this.history[0].push(p_path.slice());
            this.history[0].push("length:" + p_path.length);
        }
    };
    Ship.prototype.getPosition = function () {
        return this.m_position;
    };
    Ship.prototype.getFuelPerMove = function () {
        return this.m_fuelPerMove;
    };
    Ship.prototype.getOwner = function () {
        return this.m_owner;
    };
    Ship.prototype.getCargoSize = function () {
        return this.m_fishingGear.getCargoSize();
    };
    Ship.prototype.getType = function () {
        return this.m_fishingGear.getFishType();
    };
    //Throws an exception if path is empty, moves to last point in array otherwise
    Ship.prototype.followPath = function (p_map) {
        if (this.m_path.length < 2) {
            throw new Error("Path is empty");
        }
        else if (this.moveTo(this.m_path[1], p_map)) {
            //Only take point out of path if ship can move to point
            this.m_path.shift();
            if (!this.m_noHistory) {
                this.history[0].push(this.m_position);
                this.history[0].push(this.m_fuel);
            }
        }
    };
    Ship.prototype.hasReachedGoal = function () {
        //var t = this.m_path.length;
        //var t2 = this.m_path[0];
        //var t3 = this.m_position;
        //this.history[3].push(this.m_path.length === 1 && this.m_path[0] === this.m_position);
        return this.m_path.length === 1 && this.m_path[0] === this.m_position;
    };
    Ship.prototype.moveTo = function (p_position, p_map) {
        var tile = p_map.getTile(p_position);
        var noOfShipsInTile = p_map.getNoOfShipsInTile(p_position);
        if (this.m_fuel >= this.m_fuelPerMove &&
            ((tile instanceof Ocean /*&& (<Ocean>tile).getShipCapacity() > noOfShipsInTile*/) ||
                (tile instanceof Site && tile.getShipCapacity() > noOfShipsInTile))) {
            this.m_position = p_position;
            this.m_fuel -= this.m_fuelPerMove;
            return true;
        }
        else {
            return false;
        }
    };
    Ship.prototype.emptyPath = function () {
        this.m_path = [];
    };
    Ship.prototype.fish = function (p_map) {
        this.m_fuel -= this.m_fuelPerFishingTick;
        this.m_fishingGear.fish(this.m_position, p_map);
    };
    Ship.prototype.land = function (p_landingSite) {
        this.m_owner.financialTransaction(p_landingSite.receiveFish(this.getCargo()));
    };
    Ship.prototype.refuel = function (p_fuelSite) {
        var fuelAmount = p_fuelSite.provideFuel(this.m_fuelCapacity - this.m_fuel);
        this.m_owner.financialTransaction(-fuelAmount * p_fuelSite.getPrice());
        this.m_fuel += fuelAmount;
    };
    Ship.prototype.randomMove = function (p_map) {
        //console.log("Original position: " + JSON.stringify(this.m_position));
        var newPoint;
        //While loop runs until an ocean tile has been found
        do {
            var direction = Math.floor((Math.random() * 4));
            switch (direction) {
                case 0:
                    if (this.m_position.row !== p_map.getGrid().length - 1) {
                        newPoint = new Point2(this.m_position.row + 1, this.m_position.col);
                    }
                    break;
                case 1:
                    if (this.m_position.col !== 0) {
                        newPoint = new Point2(this.m_position.row, this.m_position.col - 1);
                    }
                    break;
                case 2:
                    if (this.m_position.row !== 0) {
                        newPoint = new Point2(this.m_position.row - 1, this.m_position.col);
                    }
                    break;
                case 3:
                    if (this.m_position.col !== p_map.getGrid()[0].length - 1) {
                        newPoint = new Point2(this.m_position.row, this.m_position.col + 1);
                    }
                    break;
                default:
                    break;
            }
        } while (!newPoint || !(p_map.getTile(newPoint) instanceof Ocean));
        this.moveTo(newPoint, p_map);
        //console.log("new postion: " + JSON.stringify(this.m_position));
    };
    Ship.prototype.useFuel = function (p_fuel) {
        this.m_fuel -= p_fuel;
    };
    return Ship;
}());
//# sourceMappingURL=Ship.js.map