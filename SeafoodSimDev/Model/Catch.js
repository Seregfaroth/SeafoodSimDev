var Catch = (function () {
    function Catch(p_fishType) {
        this.m_scenario = Scenario.getInstance();
        this.m_fishType = p_fishType;
        this.m_cargoCapacity = this.m_scenario.getShipCargoCapacity();
        this.m_cargo = [[], []];
        for (var i = 0; i < this.m_scenario.getCodSchoolMaxAge(); i++) {
            this.m_cargo[FishType.Cod][i] = 0;
        }
        for (var i = 0; i < this.m_scenario.getMackerelSchoolMaxAge(); i++) {
            this.m_cargo[FishType.Mackerel][i] = 0;
        }
    }
    Catch.prototype.fish = function (p_position, p_map) {
        var noOfFishInTile = p_map.getNoOfFishInTile(p_position);
        var thisPlaceHolder = this;
        var fishingPercentage = this.m_scenario.getFishingPercentage();
        if (this.m_cargoCapacity - this.getCargoSize() < noOfFishInTile * fishingPercentage) {
            //If the ship is not able to fish the full percentage
            fishingPercentage = (this.m_cargoCapacity - this.getCargoSize()) / noOfFishInTile;
        }
        p_map.getSchoolsInTile(p_position).forEach(function (school) {
            var type = school instanceof Cod ? FishType.Cod : FishType.Mackerel;
            if (type === thisPlaceHolder.m_fishType) {
                for (var i = 0; i < school.getMaxAge(); i++) {
                    //The number of fish the ship is fishing
                    var noOfFish = Math.ceil(fishingPercentage * school.getAges()[i]);
                    //Add to cargo
                    thisPlaceHolder.m_cargo[type][i] += noOfFish;
                    //Remove from school
                    school.getAges()[i] -= noOfFish;
                    //var t1 = p_map.getYield();
                    p_map.setYield(p_map.getYield() + noOfFish);
                }
            }
        });
    };
    Catch.prototype.getCargoSize = function () {
        var size = 0;
        for (var i = 0; i < this.m_cargo[FishType.Cod].length; i++) {
            size += this.m_cargo[FishType.Cod][i];
        }
        for (var i = 0; i < this.m_cargo[FishType.Mackerel].length; i++) {
            size += this.m_cargo[FishType.Mackerel][i];
        }
        return size;
    };
    Catch.prototype.getCargo = function () {
        return this.m_cargo;
    };
    Catch.prototype.getFishType = function () {
        return this.m_fishType;
    };
    return Catch;
}());
//# sourceMappingURL=Catch.js.map