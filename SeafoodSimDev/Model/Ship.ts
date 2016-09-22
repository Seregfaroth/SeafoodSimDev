// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
enum shipState { fishing, goingToFish, goingToRefuel, goingToLand, waiting }

enum FishType {
    Cod = 0,
    Mackerel = 1
}
class Ship {
    private m_scenario: Scenario;
    private m_fuel: number;
    private m_cargo: number[][];
    private m_fuelCapacity: number = 150;
    private m_cargoCapacity: number = 800;
    private m_yield: number[][];
    private m_taxPayed: number;
    private m_position: Point2;
    private m_path: Point2[] = [];
    private m_fuelPerMove: number = 1;
    private m_owner: ShipOwner;
    private m_state: shipState;
    public history: any[][] = [[],[]];//For debugging  purpose

    public constructor(p_owner: ShipOwner, p_scenario: Scenario) {
        this.m_scenario = p_scenario;
        this.m_position = p_owner.getShipStartPosition();
        this.m_cargo = [[], []];
        this.m_yield = [[], []];
        this.m_fuel = this.m_fuelCapacity;
        this.m_owner = p_owner;
        this.m_state = shipState.waiting;
        for (var i = 0; i < 8; i++) {//8 is the max age of cod. TODO max age should be stored somewhere where it is accesible from ship
            this.m_cargo[FishType.Cod][i] = 0;
        }
        for (var i = 0; i < 18; i++) {//18 is the max age of mackerel. TODO max age should be stored somewhere where it is accesible from ship
            this.m_cargo[FishType.Mackerel][i] = 0;
        }
    }
    public getState(): shipState {
        return this.m_state;
    }
    public setState(state: shipState): void {
        this.m_state = state;
        }
    public getFuel(): number {
        return this.m_fuel;
    }

    public getCargo(): number[][] {
        return this.m_cargo;
    }

    public getFuelCapacity(): number {
        return this.m_fuelCapacity;
    }

    public getCargoCapacity(): number {
        return this.m_cargoCapacity;
    }

    public getPath(): Point2[] {
        return this.m_path;
    }

    public setPath(p_path: Point2[]) {
        if (!this.m_position.compare(p_path[0])) {
            throw new Error("path is not starting at ship position");
        }
        this.m_path = p_path;
        this.history[0].push("current + " + this.m_position.row + " , " + this.m_position.col);
        this.history[0].push("path 0: " + p_path[0].row + ", " + p_path[0].col);
        this.history[0].push(p_path.slice());
        this.history[0].push("length:" + p_path.length);
    }

    public getPosition(): Point2 {
        return this.m_position;
    }
    public getFuelPerMove(): number {
        return this.m_fuelPerMove;
    }
    public getOwner(): ShipOwner {
        return this.m_owner;
    }
    public getCargoSize(): number {
        var size: number = 0;
        for (var i = 0; i < this.m_cargo[FishType.Cod].length; i++) {
            size += this.m_cargo[FishType.Cod][i];
        }
        for (var i = 0; i < this.m_cargo[FishType.Mackerel].length; i++) {
            size += this.m_cargo[FishType.Mackerel][i];
        }
        return size;
    }
    //Throws an exception if path is empty, moves to last point in array otherwise
    public followPath(p_map: Map): void {
        if (this.m_path.length < 2) {
            throw new Error("Path is empty");
        }
        else if (this.moveTo(this.m_path[1], p_map)) {
            //Only take point out of path if ship can move to point
            this.m_path.shift()
            this.history[0].push(this.m_position);
            this.history[0].push(this.m_fuel);
            
        }
    }
    public hasReachedGoal(): boolean {
        return this.m_path.length === 1 && this.m_path[0] === this.m_position;
    }

    private moveTo(p_position: Point2, p_map: Map): boolean {
        var tile: Tile = p_map.getTile(p_position);
        var noOfShipsInTile: number = p_map.getNoOfShipsInTile(p_position);
        if (this.m_fuel >= this.m_fuelPerMove &&
            ((tile instanceof Ocean /*&& (<Ocean>tile).getShipCapacity() > noOfShipsInTile*/) ||
                (tile instanceof Site && (<Site>tile).getShipCapacity() > noOfShipsInTile))) {
            this.m_position = p_position;
            this.m_fuel -= this.m_fuelPerMove;
            return true;
        }
        else {
            return false;
        }
    }
    public emptyPath(): void {
        this.m_path = [];
    }
    public fish(p_map: Map): void {
        var ship: Ship = this;

        var percentage: number = p_map.getFishingPercentage();
        var noOfFishInTile: number = p_map.getNoOfFishInTile(this.m_position);
        var fish: Fish[] = [];
        if (this.m_cargoCapacity - this.getCargoSize() < noOfFishInTile * percentage) {
            //If the ship is not able to fish the full percentage
            percentage = (this.m_cargoCapacity - this.getCargoSize()) / noOfFishInTile;
        }

        p_map.getSchoolsInTile(this.m_position).forEach(function (school) {
            var type: FishType = school instanceof Cod ? FishType.Cod : FishType.Mackerel;
            for (var i = 0; i < school.getMaxAge(); i++) {
                //The number of fish the ship is fishing
                //var noOfFish: number = Math.floor(percentage * school.getAges()[i]);
                var noOfFish: number = Math.ceil(percentage * school.getAges()[i]);
                //Add to cargo
                ship.m_cargo[type][i] += noOfFish;
                //Remove from school
                school.getAges()[i] -= noOfFish;
                var t1 = p_map.getYield();
                p_map.setYield(p_map.getYield() + noOfFish);
                var t2 = p_map.getYield();
                ship.history[1].push(noOfFish);              
            }
        });
        
    }

    public land(p_landingSite: LandingSite): void {
        
        this.m_owner.financialTransaction(p_landingSite.receiveFish(this.m_cargo));
    }

    public refuel(p_fuelSite: FuelSite): void {
        var fuelAmount: number = p_fuelSite.provideFuel(this.m_fuelCapacity - this.m_fuel);
        this.m_owner.financialTransaction(-fuelAmount * p_fuelSite.getPrice());
        this.m_fuel += fuelAmount;
    }

    /*private shuffleFish(): void {
        var i: number;
        var j: number;
        var fishPlaceholder: Fish;
        for (i = this.m_cargo.length; i; i--) {
            j = Math.floor(Math.random() * i);
            fishPlaceholder = this.m_cargo[i - 1];
            this.m_cargo[i - 1] = this.m_cargo[j];
            this.m_cargo[j] = fishPlaceholder;
        }
    }*/
    public randomMove(p_map: Map): void {
        //console.log("Original position: " + JSON.stringify(this.m_position));

        
        var newPoint: Point2;
        //While loop runs until an ocean tile has been found
        do {
            var direction: number = Math.floor((Math.random() * 4));
            switch (direction) {
                case 0:
                    if (this.m_position.row !== p_map.getGrid().length - 1) {
                        newPoint = new Point2(this.m_position.row + 1, this.m_position.col)
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
        this.moveTo(newPoint,p_map);
    //console.log("new postion: " + JSON.stringify(this.m_position));
    }


}