class FishingGear {
    private m_fishType: FishType;
    private m_cargo: number[][];
    private m_cargoCapacity: number;
    private m_scenario: Scenario;

    constructor(p_fishType: FishType) {
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
    private updateFishingPercentage(p_position: Point2, p_map: Map): number {
        if (this.m_fishType === FishType.cod) {
            if (p_map.getRestrictions().areAreasRestricted()) {
                var noOfFishInTile: number = p_map.getBiomassOfinTile(Cod, p_position, true);
            } else {
                var noOfFishInTile: number = p_map.getBiomassOfinTile(Cod, p_position);
            }
        }
        else if (this.m_fishType === FishType.mackerel) {
            if (p_map.getRestrictions().areAreasRestricted()) {
                var noOfFishInTile: number = p_map.getBiomassOfinTile(Mackerel, p_position, true);
            } else {
                var noOfFishInTile: number = p_map.getBiomassOfinTile(Mackerel, p_position);
            }
        }
        var fishingPercentage: number = this.m_scenario.getFishingPercentage();
        if (this.m_cargoCapacity - this.getCargoSize() < noOfFishInTile * fishingPercentage) {
            //If the ship is not able to fish the full percentage
            fishingPercentage = (this.m_cargoCapacity - this.getCargoSize()) / noOfFishInTile;
        }
        return fishingPercentage;
    }
    public fish(p_position: Point2, p_map: Map): number {
        var totalFish: number = 0; 
        var fishingPercentage: number = this.updateFishingPercentage(p_position, p_map);
        var thisPlaceHolder: FishingGear = this;
        var fishPos: Point2 = p_map.getAdjecentSchoolPoint(p_position);
        p_map.getSchoolsInTile(fishPos).forEach(function (school) {
            var type: FishType = school instanceof Cod ? FishType.cod : FishType.mackerel;
            if (type === thisPlaceHolder.m_fishType) {
                var startAge: number = 0;
                if (p_map.getRestrictions().areAreasRestricted()) {
                    startAge = Math.ceil(0.3 * school.getMaxAge());
                }
                for (var i = startAge; i < school.getMaxAge(); i++) {
                    //The number of fish the ship is fishing
                    var noOfFish: number = Math.ceil(fishingPercentage * school.getAges()[i]);
                    //Add to cargo
                    thisPlaceHolder.m_cargo[type][i] += noOfFish;
                    //Remove from school
                    school.getAges()[i] -= noOfFish;
                    //var t1 = p_map.getYield();
                    p_map.setYield(p_map.getYield() + noOfFish);
                    totalFish += noOfFish;
                    //var t2 = p_map.getYield();
                }
            }
        });
        return totalFish;

    }
    public getCargoSize(): number {
        var size: number = 0;
        for (var i = 0; i < this.m_cargo[FishType.cod].length; i++) {
            size += this.m_cargo[FishType.cod][i];
        }
        for (var i = 0; i < this.m_cargo[FishType.mackerel].length; i++) {
            size += this.m_cargo[FishType.mackerel][i];
        }
        return size;
    }
    public getCargo(): number[][] {
        return this.m_cargo;
    }
    public getFishType(): FishType {
        return this.m_fishType;
    }
}