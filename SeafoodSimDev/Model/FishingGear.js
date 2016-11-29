var FishingGear = (function () {
    function FishingGear(p_fishType) {
        this.m_scenario = Scenario.getInstance();
        this.m_fishType = p_fishType;
        this.m_cargoCapacity = this.m_scenario.getShipCargoCapacity();
        this.m_cargo = [[], []];
        for (var i = 0; i < this.m_scenario.getCodSchoolMaxAge(); i++) {
            this.m_cargo[FishType.cod][i] = 0;
        }
        for (var i = 0; i < this.m_scenario.getMackerelSchoolMaxAge(); i++) {
            this.m_cargo[FishType.mackerel][i] = 0;
        }
    }
    FishingGear.prototype.updateFishingPercentage = function (p_position, p_map) {
        if (this.m_fishType === FishType.cod) {
            var noOfFishInTile = p_map.getBiomassOfinTile(Cod, p_position);
        }
        else if (this.m_fishType === FishType.mackerel) {
            var noOfFishInTile = p_map.getBiomassOfinTile(Mackerel, p_position);
        }
        var fishingPercentage = this.m_scenario.getFishingPercentage();
        if (this.m_cargoCapacity - this.getCargoSize() < noOfFishInTile * fishingPercentage) {
            //If the ship is not able to fish the full percentage
            fishingPercentage = (this.m_cargoCapacity - this.getCargoSize()) / noOfFishInTile;
        }
        return fishingPercentage;
    };
    FishingGear.prototype.fish = function (p_position, p_map) {
        var totalFish = 0;
        var fishingPercentage = this.updateFishingPercentage(p_position, p_map);
        var thisPlaceHolder = this;
        var t = p_map.getSchoolsInTile(p_position);
        p_map.getSchoolsInTile(p_position).forEach(function (school) {
            var type = school instanceof Cod ? FishType.cod : FishType.mackerel;
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
                    totalFish += noOfFish;
                }
            }
        });
        return totalFish;
    };
    FishingGear.prototype.getCargoSize = function () {
        var size = 0;
        for (var i = 0; i < this.m_cargo[FishType.cod].length; i++) {
            size += this.m_cargo[FishType.cod][i];
        }
        for (var i = 0; i < this.m_cargo[FishType.mackerel].length; i++) {
            size += this.m_cargo[FishType.mackerel][i];
        }
        return size;
    };
    FishingGear.prototype.getCargo = function () {
        return this.m_cargo;
    };
    FishingGear.prototype.getFishType = function () {
        return this.m_fishType;
    };
    return FishingGear;
}());
//# sourceMappingURL=FishingGear.js.map