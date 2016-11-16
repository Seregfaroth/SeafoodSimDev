// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
enum shipState { fishing, goingToFish, goingToRefuel, goingToLand, waiting }

enum FishType {
    Cod = 0,
    Mackerel = 1
}
class Ship {
    private m_fishedFor: number = 0;
    private m_scenario: Scenario;
    private m_fuel: number;
    private m_fuelCapacity;
    private m_cargoCapacity;
    private m_yield: number[][];
    private m_taxPayed: number;
    private m_position: Point2;
    private m_path: Point2[] = [];
    private m_fuelPerMove: number;
    private m_fuelPerFishingTick: number;
    private m_owner: ShipOwner;
    private m_state: shipState;
    private m_fishingGear: FishingGear;
    public history: any[][] = [[], [], [], [], []];//For debugging  purpose
    private m_noHistory: boolean;

    public constructor(p_owner: ShipOwner, p_fishType: FishType) {
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
    public getFishedFor(): number {
        return this.m_fishedFor;
    }
    public resetFishedFor(): void {
        this.m_fishedFor = 0;
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
        return this.m_fishingGear.getCargo();
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
        if (!this.m_noHistory) {
            this.history[0].push("current + " + this.m_position.row + " , " + this.m_position.col);
            this.history[0].push("path 0: " + p_path[0].row + ", " + p_path[0].col);
            this.history[0].push(p_path.slice());
            this.history[0].push("length:" + p_path.length);
        }
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
        return this.m_fishingGear.getCargoSize();
    }
    public getType(): FishType {
        return this.m_fishingGear.getFishType();
    }
    //Throws an exception if path is empty, moves to last point in array otherwise
    public followPath(p_map: Map): void {
        if (this.m_path.length < 2) {
            throw new Error("Path is empty");
        }
        else if (this.moveTo(this.m_path[1], p_map)) {
            //Only take point out of path if ship can move to point
            this.m_path.shift()
            if (!this.m_noHistory) {
                this.history[0].push(this.m_position);
                this.history[0].push(this.m_fuel);
            }
        }
    }
    public hasReachedGoal(): boolean {
        //var t = this.m_path.length;
        //var t2 = this.m_path[0];
        //var t3 = this.m_position;
        //this.history[3].push(this.m_path.length === 1 && this.m_path[0] === this.m_position);
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
        this.m_fuel -= this.m_fuelPerFishingTick;
        this.m_fishingGear.fish(this.m_position,p_map);
    }

    public land(p_landingSite: LandingSite): void {
        
        this.m_owner.financialTransaction(p_landingSite.receiveFish(this.getCargo()));
    }

    public refuel(p_fuelSite: FuelSite): void {
        var fuelAmount: number = p_fuelSite.provideFuel(this.m_fuelCapacity - this.m_fuel);
        this.m_owner.financialTransaction(-fuelAmount * p_fuelSite.getPrice());
        this.m_fuel += fuelAmount;
    }

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
    public useFuel(p_fuel: number) {
        this.m_fuel -= p_fuel;
    }


}