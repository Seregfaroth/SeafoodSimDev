// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class AI {
    private m_scenario: Scenario;
    private m_pathFinder: TKN_PathFinding = new TKN_PathFinding();
     private m_balanceToBuyShip: number;
     private m_balanceToSellShip: number;
     private m_noHistory: boolean;
     private m_catchedSoFar: number[];
     constructor() {
         this.m_scenario = Scenario.getInstance();
         this.m_noHistory = this.m_scenario.getNoHistory();
         this.m_balanceToBuyShip = this.m_scenario.getAiBuyShipBalance();
         this.m_balanceToSellShip = this.m_scenario.getAiSellShipBalance();
         this.m_catchedSoFar = [0, 0];
     }
     public startNewInterval(): void {
         this.m_catchedSoFar = [0,0];
     }
     public getCatchedSoFar(): number[] {
         return this.m_catchedSoFar;
     }
    public run(p_shipOwner: ShipOwner, p_map: Map): void {
        //console.log("AI money: "+ p_shipOwner.getBalance());
       // this.buyOrSellShip(p_shipOwner, p_map);
        this.runShips(p_shipOwner, p_map);
    }

   /* private buyOrSellShip(p_shipOwner: ShipOwner, p_map: Map): void {
        var possibleToBuyShip: boolean = p_map.getNoOfShips() < p_map.getRestrictions().getMaxShips();
        if (possibleToBuyShip && p_shipOwner.getBalance() > this.m_balanceToBuyShip) {
            p_map.addShip(p_shipOwner.buyShip());
            this.m_balanceToSellShip += this.m_balanceToBuyShip * 0.01;
        }
        else if (p_shipOwner.getShips().length > 0 && p_shipOwner.getBalance() < this.m_balanceToSellShip) {
            this.sellShip(p_shipOwner, p_map);
        }
        
    }
    private sellShip(p_shipOwner: ShipOwner, p_map: Map) {
        var ship: Ship = p_shipOwner.getShips()[0];
        p_shipOwner.sellShip(ship);
        this.m_balanceToSellShip -= 0.01 * this.m_balanceToBuyShip;
        p_map.removeShip(ship);
    }*/
    private runShips(p_shipOwner: ShipOwner, p_map: Map): void {
        var ai: AI = this;
        var n = 0;
        p_shipOwner.getAllShips().forEach(function (ship) {
            //console.log("ship " + n);
            //console.log("state: " + shipState[ship.getState()] + " cargo: " + ship.getCargoSize() + " fuel: " + ship.getFuel() + " position: " + ship.getPosition().row + ", " + ship.getPosition().col);
            //ship.useFuel(0.25);
            if (!this.m_noHistory)
                ship.history[2].push(ship.getState());
            n++;
            if (ship.getState() === shipState.fishing) {
                ship.history[3].push("fishing");
                //If ship is currently fishing, fish until cargo is at least 98% full or until ship is running out of fuel
                if (ship.getCargoSize() >= ship.getCargoCapacity() * 0.98 || !ai.canReach(ship, p_map, [ship.getPosition()])) {
                    (<Ocean>p_map.getTile(ship.getPosition())).releaseTile();
                    ai.findNewPath(ship, p_map);
                }
                else if (ai.m_catchedSoFar[ship.getType()] < p_map.getRestrictions().getTAC()[ship.getType()]) {
                    //If all tac is not fished yet
                    ai.m_catchedSoFar[ship.getType()] += ship.fish(p_map);
                } else if (ai.m_catchedSoFar[ship.getType()] >= p_map.getRestrictions().getTAC()[ship.getType()]) {
                    //If all tac is fished
                    ship.setState(shipState.waiting); //Set state to waiting
                    ship.emptyPath(); //Empty path
                }
            }

            else if (ship.hasReachedGoal()) {
                ship.history[3].push("at goal");
                //If ship has reached a previous sat goal
                ai.actOnGoal(ship, p_map, p_shipOwner);
            } 
            else {
                try {
                    ship.history[3].push("follow path");
                    ship.followPath(p_map)
                }
                catch (e) {
                    ship.history[3].push("find new path");
                    ai.findNewPath(ship, p_map);
                }
            }
        });
    }

    private actOnGoal(p_ship: Ship, p_map: Map, p_shipOwner: ShipOwner): void {
        var tile: Tile = p_map.getTile(p_ship.getPosition());
        if (p_ship.getState() === shipState.goingToLand) {
            //If ship has reached a landing site
            p_ship.land(<LandingSite>tile);
            /*if (p_map.getRestrictions().getMaxShips() < p_map.getShips().length) {
                this.sellShip(p_shipOwner, p_map);
            }
            else*/ {
                this.findNewPath(p_ship, p_map);
            }
        }
        else if (p_ship.getState() === shipState.goingToRefuel) {
            //If ship has reached fuel site
            p_ship.refuel(<FuelSite>tile);
            this.findNewPath(p_ship, p_map);
        }
        else if(p_ship.getState() === shipState.goingToFish){
            //If ship has reached a fishing site
            p_ship.history[3].push("************************* " + p_map.getNoOfShipsInTile(p_ship.getPosition()));
            var t = p_map.getNoOfShipsInTile(p_ship.getPosition());
            var t2 = (<Ocean>p_map.getTile(p_ship.getPosition())).getShipCapacity();
            if (p_map.getNoOfShipsInTile(p_ship.getPosition()) <= (<Ocean>tile).getShipCapacity()) {
                p_ship.setState(shipState.fishing);
            }
            else {
                //If tile is full
                this.findNewPath(p_ship, p_map);
            }

        }
    }
    public pathFinding(p_map: Map, p_start: Point2, p_goal: Point2): Point2[] {
        this.m_pathFinder.navTable = p_map.getPathFindingMap();
        return this.m_pathFinder.findPath(p_start, p_goal);
    }
    public pathToNearestLandingSite(p_start: Point2, p_map: Map): Point2[] {
        var bestPath: Point2[];
        var bestDist: number = Infinity;
        for (var ls of p_map.getLandingSites()) {
            var t = ls.getPosition(); 
            var path: Point2[] = this.pathFinding(p_map, p_start, ls.getPosition());
            if (path.length < bestDist) {
                bestDist = path.length;
                bestPath = path;
            }
        }
        //for (var r = 0; r < p_map.getMapHeight(); r++) {
        //    for (var c = 0; c < p_map.getMapWidth(); c++) {
        //        var path: Point2[] = this.pathFinding(p_map, p_start, new Point2(r, c));
        //        if (p_map.getTile(new Point2(r, c)) instanceof LandingSite
        //            && path.length < bestDist) {
        //            bestDist = path.length;
        //            bestPath = path;
        //        }
        //    }
        //}
        return bestPath;
    }

    public pathToNearestFuelSite(p_start: Point2, p_map: Map): Point2[] {
        var bestPath: Point2[];
        var bestDist: number = Infinity;
        for (var ls of p_map.getFuelSites()) {
            var t = ls.getPosition(); 
            var path: Point2[] = this.pathFinding(p_map, p_start, ls.getPosition());
            if (path.length < bestDist) {
                bestDist = path.length;
                bestPath = path;
            }
        }
        //for (var r = 0; r < p_map.getMapHeight(); r++) {
        //    for (var c = 0; c < p_map.getMapWidth(); c++) {
        //        var path: Point2[] = this.pathFinding(p_map, p_start, new Point2(r, c));
        //        if (p_map.getTile(new Point2(r, c)) instanceof FuelSite
        //            && path.length < bestDist) {
        //            bestDist = path.length;
        //            bestPath = path;
        //        }
        //    }
        //}
        return bestPath;
    }
    /*public pathToBestFishingArea(p_start: Point2, p_map: Map): Point2[] {
        var bestPath: Point2[];
        var bestValue: number = Infinity;
        var schoolSizeWeight: number = this.m_scenario.getSchoolSizeWeight();
        for (var school of p_map.getSchools()) {
            var path: Point2[] = this.pathFinding(p_map, p_start, school.getVisualPos());
            if (p_map.getRestrictions().getRestrictedAreas().indexOf(p_map.getTile(school.getVisualPos())) === -1
                && (<Ocean>p_map.getTile(school.getVisualPos())).getShipCapacity() > p_map.getNoOfShipsInTile(school.getVisualPos())
                && path.length + school.getSize() * schoolSizeWeight < bestValue) {
                bestValue = path.length + school.getSize()*schoolSizeWeight;
                bestPath = path;
            }
        }
        
        return bestPath;
    }*/
    /*public pathToFish(p_start: Point2, p_map: Map): Point2[] {
        if (p_map.getSchools().length !== 0) {
            var randomNumber: number = Math.floor(Math.random() * (p_map.getSchools().length));
            var firstRandomNumber: number = randomNumber;
            var fishingTiles: Point2[] = p_map.getFishingPoints(p_map.getSchools()[randomNumber].getOrigin());
            var tileNo: number = Math.floor(Math.random() * (fishingTiles.length));
            var firstTileNo: number = tileNo;
            do {
                var point: Point2 = fishingTiles[tileNo]

                tileNo = (tileNo + 1) % fishingTiles.length;
                if (tileNo == firstTileNo) {//Done looking through tiles
                    randomNumber = (randomNumber + 1) % p_map.getSchools().length;
                    if (randomNumber === firstRandomNumber) return undefined; //If there was no tile with room for the ship
                    fishingTiles = p_map.getFishingPoints(p_map.getSchools()[randomNumber].getOrigin());
                    tileNo = Math.floor(Math.random() * (fishingTiles.length));
                    firstTileNo = tileNo;
                }
                if (point != undefined)
                    var tile: Ocean = <Ocean>p_map.getTile(point);
                else
                    return undefined;
            }
            while (!(tile.roomForAnotherShip() && p_map.getRestrictions().getRestrictedAreas().indexOf(tile) < 0))
            return this.pathFinding(p_map, p_start, point);
        }
        else
            return undefined;
    }*/
    public pathToFish(p_start: Point2, p_map: Map): Point2[] {
        if (p_map.getSchools().length !== 0) {
            var randomNumber: number = Math.floor(Math.random() * (p_map.getSchools().length));
            var firstRandomNumber: number = randomNumber;
            var tileNo: number = 0;
            var fishingTiles: Point2[] = p_map.getFishingPoints(p_map.getSchools()[randomNumber].getPosition());
            do {
                var point: Point2 = fishingTiles[tileNo]

                if (tileNo == fishingTiles.length) {//Done looking through tiles
                    randomNumber = (randomNumber + 1) % p_map.getSchools().length;
                    if (randomNumber === firstRandomNumber) return undefined; //If there was no tile with room for the ship
                    fishingTiles = p_map.getFishingPoints(p_map.getSchools()[randomNumber].getPosition());
                    tileNo = 0;
                }
                var tile: Ocean = <Ocean>p_map.getTile(point);
                tileNo++;
            }
            while (!(tile.roomForAnotherShip() && p_map.getRestrictions().getRestrictedAreas().indexOf(tile) < 0))
            return this.pathFinding(p_map, p_start, point);
        }
        else
            return undefined;
    }
    private goFish(p_ship: Ship, p_map: Map, p_path:Point2[]): void {

        (<Ocean>p_map.getTile(p_path[p_path.length - 1])).claimTile();
        p_ship.setPath(p_path);
        p_ship.setState(shipState.goingToFish);
        if (!this.m_noHistory)
        p_ship.history[0].push("going to fish");
    }
    private goLand(p_ship: Ship, p_map: Map, p_path?: Point2[]): void {
        if (!p_path) {
            p_path = this.pathToNearestLandingSite(p_ship.getPosition(), p_map)
        }
        p_ship.setPath(p_path);
        p_ship.setState(shipState.goingToLand);
        if (!this.m_noHistory)
        p_ship.history[0].push("going to land");
    }
    private goRefuel(p_ship: Ship, p_map: Map, p_path?: Point2[]): void {
        if (!p_path) {
            p_path = this.pathToNearestFuelSite(p_ship.getPosition(), p_map)
        }
        p_ship.setPath(p_path);
        p_ship.setState(shipState.goingToRefuel);
        if (!this.m_noHistory)
        p_ship.history[0].push("going to refuel");
    }

    private canReach(p_ship: Ship, p_map: Map, p_previousPath: Point2[]): boolean {
        var fuelPath: Point2[] = this.pathToNearestFuelSite(p_previousPath[p_previousPath.length - 1], p_map);
        var sailingDist: number = p_previousPath.length - 1 + fuelPath.length;
        if (!this.m_noHistory)
            p_ship.history[0].push("checking if ship can sail " + sailingDist + " with " + p_ship.getFuel() + " fuel :" + (p_ship.getFuel() > sailingDist * p_ship.getFuelPerMove()));
        if (!this.m_noHistory)
        p_ship.history.push(fuelPath);
        return (p_ship.getFuel() > sailingDist * p_ship.getFuelPerMove());
    }

    private findNewPath(p_ship: Ship, p_map: Map): void {
        if (p_map.getFuelSites().length > 0 && p_map.getLandingSites().length > 0) {
            var fuelPath: Point2[] = this.pathToNearestFuelSite(p_ship.getPosition(), p_map);
            var t = this.m_catchedSoFar[p_ship.getType()];
            var t2 = p_map.getRestrictions().getTAC()[p_ship.getType()];
            if (p_ship.getFuel() <= fuelPath.length * p_ship.getFuelPerMove() + 1) {
                //Ship must refuel if fuel is too low
                this.goRefuel(p_ship, p_map, fuelPath);
            }
            else if (p_ship.getCargoSize() >= p_ship.getCargoCapacity() * 0.98 ) {
                //If ship is  full, ship must land
                var landingPath: Point2[] = this.pathToNearestLandingSite(p_ship.getPosition(), p_map);
                if (this.canReach(p_ship, p_map, landingPath)) {
                    this.goLand(p_ship, p_map, landingPath);
                }
                else {
                    this.goRefuel(p_ship, p_map, fuelPath);
                }
            }
            else if (this.m_catchedSoFar[p_ship.getType()] < p_map.getRestrictions().getTAC()[p_ship.getType()]) {
                //If ship does not need to land or refuel
                //var fishingPath: Point2[] = this.pathToBestFishingArea(p_ship.getPosition(), p_map);
                var fishingPath: Point2[] = this.pathToFish(p_ship.getPosition(), p_map);
                //p_ship.history[4].push(JSON.stringify(fishingPath[fishingPath.length - 1]));
                if (fishingPath == undefined) {
                    //If there is no school where the ship can fish
                    p_ship.randomMove(p_map);
                }
                else {
                    if (this.canReach(p_ship, p_map, fishingPath)) {
                        this.goFish(p_ship, p_map, fishingPath);
                    }
                    else {
                        this.goRefuel(p_ship, p_map, fuelPath);
                    }
                }
            }
            else if ((this.m_catchedSoFar[p_ship.getType()] >= p_map.getRestrictions().getTAC()[p_ship.getType()])) {
                //If all tac is fished
                p_ship.setState(shipState.waiting);
                
            }
        }
    }
}