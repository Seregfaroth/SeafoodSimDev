// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
class AI {
    private m_pathFinder: TKN_PathFinding = new TKN_PathFinding();
     private m_balanceToBuyShip: number = 1000000;
     private m_balanceToSellShip: number = 0;
     private m_fishingPath: Point2[] = [new Point2(2, 0),new Point2(1, 0), new Point2(1, 1), new Point2(1, 2), new Point2(1, 3), new Point2(1, 4), new Point2(2, 4),
        new Point2(3, 4), new Point2(3, 3), new Point2(3, 2), new Point2(3, 1), new Point2(3, 0), new Point2(2, 0)];

    public run(p_shipOwner: ShipOwner, p_map: Map): void {
        //console.log("runnig AI");
        this.buyOrSellShip(p_shipOwner, p_map);
        this.runShips(p_shipOwner, p_map);
    }

    private buyOrSellShip(p_shipOwner: ShipOwner, p_map: Map): void {
        var possibleToBuyShip: boolean = p_map.getNoOfShips() < p_map.getRestrictions().getMaxShips();
        if (possibleToBuyShip && p_shipOwner.getBalance() > this.m_balanceToBuyShip) {
            p_map.addShip(p_shipOwner.buyShip());
        }
        else if (p_shipOwner.getShips().length > 0 && p_shipOwner.getBalance() < this.m_balanceToSellShip) {
            var ship: Ship = p_shipOwner.getShips()[0];
            p_shipOwner.sellShip(ship);
            p_map.removeShip(ship);
        }
    }

    private runShips(p_shipOwner: ShipOwner, p_map: Map): void {
        var ai: AI = this;
        p_shipOwner.getShips().forEach(function (ship) {
            //console.log("state: " + ship.getState().toString());
            //console.log("cargo: " + ship.getCargoSize());
            //console.log("fuel: " + ship.getFuel());
            //console.log("position: " + ship.getPosition().row + ", " + ship.getPosition().col);
            if (ship.getFuel() === 0) {
                debugger;
            }
            if (ship.getState() === shipState.fishing) {
                //If ship is currently fishing, fish until cargo is at least 98% full
                
                if (ship.getCargoSize() >= ship.getCargoCapacity() * 0.98) {
                    ai.findNewPath(ship, p_map);
                }
                else {
                    //OBS this could result in an infinite loop if there is no fish left in area
                    ship.fish(p_map);
                }
            }

           else  if (ship.hasReachedGoal()) {
                //If ship has reached a previous sat goal
                ai.actOnGoal(ship, p_map);
            } 
            else {
                try {
                    ship.followPath(p_map)
                }
                catch (e) {
                    ai.findNewPath(ship, p_map);
                }
            }
        });
    }

    private actOnGoal(p_ship: Ship, p_map: Map): void {
        var tile: Tile = p_map.getTile(p_ship.getPosition());
        if (p_ship.getState() === shipState.goingToLand) {
            //If ship has reached a landing site
            p_ship.land(<LandingSite>tile);
            this.findNewPath(p_ship, p_map);
        }
        else if (p_ship.getState() === shipState.goingToRefuel) {
            //If ship has reached fuel site
            p_ship.refuel(<FuelSite>tile);
            this.findNewPath(p_ship, p_map);
        }
        else if(p_ship.getState() === shipState.goingToFish){
            //If ship has reached a fishing site
            if (p_map.getNoOfShipsInTile(p_ship.getPosition()) <= (<Ocean>p_map.getTile(p_ship.getPosition())).getShipCapacity()) {
                p_ship.fish(p_map);
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
        for (var r = 0; r < p_map.getMapHeight(); r++) {
            for (var c = 0; c < p_map.getMapWidth(); c++) {
                var path: Point2[] = this.pathFinding(p_map, p_start, new Point2(r, c));
                if (p_map.getTile(new Point2(r, c)) instanceof LandingSite
                    && path.length < bestDist) {
                    bestDist = path.length;
                    bestPath = path;
                }
            }
        }
        return bestPath;
    }

    public pathToNearestFuelSite(p_start: Point2, p_map: Map): Point2[] {
        var bestPath: Point2[];
        var bestDist: number = Infinity;
        for (var r = 0; r < p_map.getMapHeight(); r++) {
            for (var c = 0; c < p_map.getMapWidth(); c++) {
                var path: Point2[] = this.pathFinding(p_map, p_start, new Point2(r, c));
                if (p_map.getTile(new Point2(r, c)) instanceof FuelSite
                    && path.length < bestDist) {
                    bestDist = path.length;
                    bestPath = path;
                }
            }
        }
        return bestPath;
    }
    public pathToNearestFishingArea(p_start: Point2, p_map: Map): Point2[] {
        var bestPath: Point2[];
        var bestDist: number = Infinity;
        for (var school of p_map.getSchools()) {
            var path: Point2[] = this.pathFinding(p_map, p_start, school.getPosition());
            if (p_map.getRestrictions().getRestrictedAreas().indexOf(p_map.getTile(school.getPosition())) === -1
                && (<Ocean>p_map.getTile(school.getPosition())).getShipCapacity() > p_map.getNoOfShipsInTile(school.getPosition())
                && path.length < bestDist) {
                bestDist = path.length;
                bestPath = path;
            }
        }
        return bestPath;
    }
    public pathToFish(p_start: Point2, p_map: Map): Point2[] {
        var randomNumber: number = Math.floor(Math.random() * p_map.getSchools().length);
        return this.pathFinding(p_map, p_start, p_map.getSchools()[randomNumber].getPosition());
    }
    private goFish(p_ship: Ship, p_map: Map, p_path:Point2[]): void {
        
        //var path: Point2[] = this.pathToNearestFishingArea(p_ship.getPosition(), p_map);
        p_ship.setPath(p_path);
        p_ship.setState(shipState.goingToFish);
        p_ship.history.push("going to fish");
    }
    private goLand(p_ship: Ship, p_map: Map, p_path?: Point2[]): void {
        if (!p_path) {
            p_path = this.pathToNearestLandingSite(p_ship.getPosition(), p_map)
        }
        p_ship.setPath(p_path);
        p_ship.setState(shipState.goingToLand);
        p_ship.history.push("going to land");
    }
    private goRefuel(p_ship: Ship, p_map: Map, p_path?: Point2[]): void {
        if (!p_path) {
            p_path = this.pathToNearestFuelSite(p_ship.getPosition(), p_map)
        }
        p_ship.setPath(p_path);
        p_ship.setState(shipState.goingToRefuel);
        p_ship.history.push("going to refuel");
    }

    private canReach(p_ship: Ship, p_map: Map, p_previousPath: Point2[]): boolean {
        var fuelPath: Point2[] = this.pathToNearestFuelSite(p_previousPath[p_previousPath.length - 1], p_map);
        var sailingDist: number = p_previousPath.length - 1 + fuelPath.length;
        p_ship.history.push("checking if ship can sail " + sailingDist + " with " + p_ship.getFuel() + " fuel :" + (p_ship.getFuel() > sailingDist * p_ship.getFuelPerMove()));
        p_ship.history.push(fuelPath);
        return (p_ship.getFuel() > sailingDist * p_ship.getFuelPerMove());
    }

    private findNewPath(p_ship: Ship, p_map: Map): void {
        if (p_map.getFuelSites().length > 0 && p_map.getLandingSites().length > 0) {
            var fuelPath: Point2[] = this.pathToNearestFuelSite(p_ship.getPosition(), p_map);
            if (p_ship.getFuel() <= fuelPath.length * p_ship.getFuelPerMove() + 1) {
                //Ship must refuel if fuel is too low
                this.goRefuel(p_ship, p_map, fuelPath);
            }
            else if (p_ship.getCargoSize() >= p_ship.getCargoCapacity()* 0.98) {
                //If ship is  full, ship must land
                var landingPath: Point2[] = this.pathToNearestLandingSite(p_ship.getPosition(), p_map);
                if (this.canReach(p_ship, p_map, landingPath)) {
                    this.goLand(p_ship, p_map, landingPath);
                }
                else {
                    this.goRefuel(p_ship, p_map);
                }
            }
            else {
                //If ship does not need to land or refuel
                var fishingPath: Point2[] = this.pathToFish(p_ship.getPosition(), p_map);
                if (this.canReach(p_ship, p_map, fishingPath)) {
                    this.goFish(p_ship, p_map, fishingPath);
                }
                else {
                    this.goRefuel(p_ship, p_map);
                }
            }
        }
    }
}