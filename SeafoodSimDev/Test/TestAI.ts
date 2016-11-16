class TestAI {
    private scenario: Scenario;
    public constructor() {

        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var testAi: TestAI = this;
        var ai: AI = new AI();
        var gov: Government = new Government(new Restrictions());
        var map: Map = new Map(gov.getRestrictions());
        var richShipOwner: ShipOwner = new ShipOwner(gov, new Point2(0, 0), "0", 10000000000000000000);
        var poorShipOwner: ShipOwner = new ShipOwner(gov, new Point2(0, 0), "1", - 10000000000000000000);
        var sceanario: Scenario = this.scenario;
        QUnit.test("AI: pathToNearestLandingSite", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[2][2] = new LandingSite(1, 10, 1, {}, "0", new Point2(2, 2));
            var path: Point2[] = ai.pathToNearestLandingSite(new Point2(2, 2), map);
            assert.deepEqual(path[path.length - 1], new Point2(2, 2), "Should find nearest landing site at 2,2");
            path = ai.pathToNearestLandingSite(new Point2(0, 0), map);
            assert.deepEqual(path[path.length - 1], new Point2(2, 2), "Should find nearest landing site at 2,2");
            path = ai.pathToNearestLandingSite(new Point2(4, 4), map);
            assert.deepEqual(path[path.length - 1], new Point2(2, 2), "Should find nearest landing site at 2,2");
            path = ai.pathToNearestLandingSite(new Point2(1, 3), map);
            assert.deepEqual(path[path.length - 1], new Point2(2, 2), "Should find nearest landing site at 2,2");
        });

        QUnit.test("AI: pathToNearestLandingSite with multiple sites", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
            map.getGrid()[3][0] = new LandingSite(1, 10, 1, {}, "1", new Point2(3, 0));
            var path: Point2[] = ai.pathToNearestLandingSite(new Point2(0, 0), map);
            assert.deepEqual(path[path.length - 1], new Point2(3, 0), "Nearest from 0,0 should be 3,0");
            path = ai.pathToNearestLandingSite(new Point2(4, 0), map);
            assert.deepEqual(path[path.length - 1], new Point2(3, 0), "Nearest from 4,0 should be 3,0");
            path = ai.pathToNearestLandingSite(new Point2(0, 2), map);
            assert.deepEqual(path[path.length - 1], new Point2(0, 4), "Nearest from 0,2 should be 0,4");
            path = ai.pathToNearestLandingSite(new Point2(2, 3), map);
            assert.deepEqual(path[path.length - 1], new Point2(0, 4), "Nearest from 2,3 should be 0,4");
            path = ai.pathToNearestLandingSite(new Point2(4, 4), map);
            assert.deepEqual(path[path.length - 1], new Point2(0, 4), "Nearest from 4,4 should be 0,4");
        });

        QUnit.test("AI: find nearest fuel site with multiple sites", function (assert) {
            var map: Map = new Map(gov.getRestrictions());
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
            map.getGrid()[5][8] = new FuelSite(1, 10, 101, 10, "1", new Point2(5, 8));
            var path: Point2[] = ai.pathToNearestFuelSite(new Point2(0, 8), map);
            assert.deepEqual(path[path.length - 1], new Point2(5, 8), "nearest fuel site from 0,8 should be 5,8");

        });

        /*QUnit.test("AI: buy ship", function (assert) {
            map.emptyGrid();
            assert.deepEqual(richShipOwner.getShips(), [], "rich ship owner should not have any ships");
            assert.deepEqual(poorShipOwner.getShips(), [], "poor ship owner should not have any ships");
            ai.run(richShipOwner, map);
            //Check if owner has bought ship
            assert.deepEqual(richShipOwner.getShips().length, 1, "rich ship owner should have one ship");

            ai.run(poorShipOwner, map);
            //Poor ship owner should not buy a new ship
            assert.deepEqual(poorShipOwner.getShips().length, 0, "poor ship owner should still have 0 ships");
        });

        QUnit.test("AI: sell ship", function (assert) {
            map.emptyGrid();
            poorShipOwner.buyShip();
            assert.deepEqual(poorShipOwner.getShips().length, 1, "poor ship owner should have 1 ship");
             ai.run(poorShipOwner, map);
            //Poor ship owner should sell his ship
             assert.deepEqual(poorShipOwner.getShips().length, 0, "poor ship owner should have 0 ships");

             richShipOwner.buyShip();
             var noOfShips: number = richShipOwner.getShips().length;

             ai.run(richShipOwner, map);
             assert.ok(richShipOwner.getShips().length >= noOfShips, "rich ship owner should not sell any of his ships");
        });
        */
        QUnit.test("AI: pathfinding straight line", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            var expectedPath: Point2[] = [new Point2(0, 0), new Point2(0, 1), new Point2(0, 2)];
            var path: Point2[] = ai.pathFinding(map, new Point2(0, 0), new Point2(0, 2));
            assert.deepEqual(path, expectedPath, "should find a straight line path");
        });

        QUnit.test("AI: pathfinding with land", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[3][0] = new Land();
            map.getGrid()[3][1] = new Land();
            map.getGrid()[3][2] = new Land();
            var expectedPath: Point2[] = [new Point2(2, 0), new Point2(2, 1), new Point2(2, 2), new Point2(2, 3),
                new Point2(3, 3), new Point2(4, 3), new Point2(4, 2), new Point2(4, 1), new Point2(4, 0)];
            var path: Point2[] = ai.pathFinding(map, new Point2(2, 0), new Point2(4, 0));
            assert.deepEqual(path, expectedPath, "should find a path around the land");
        });

        QUnit.test("AI: go fish", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
            map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
            var schoolPos: Point2 = new Point2(0, 0);
            map.addSchool(new Cod(10, schoolPos));
            var shipOwner: ShipOwner = new ShipOwner(gov, new Point2(3, 3), "shipOwner1");
            var ship: Ship = shipOwner.buyShip(FishType.Cod);
            assert.deepEqual(ship.getState(), shipState.waiting, "Ship should be in a waiting state");
            ai.run(shipOwner, map);
            assert.deepEqual(ship.getState(), shipState.goingToFish, "Ship should be going to fish");
            assert.deepEqual(ship.getPath()[ship.getPath().length-1], schoolPos, "Ship should heading to school.");
        });

        QUnit.test("AI: fuel running low while fishing", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
            map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
            var schoolPos: Point2 = new Point2(0, 0);
            map.addSchool(new Cod(1, schoolPos));
            var shipOwner: ShipOwner = new ShipOwner(gov, new Point2(3, 3), "shipOwner1");
            var ship: Ship = shipOwner.buyShip(FishType.Cod);
            ai.run(shipOwner, map);
            while (!ship.hasReachedGoal()) {
                ai.run(shipOwner, map);
            }
            ai.run(shipOwner, map);
            assert.deepEqual(ship.getState(), shipState.fishing, "Ship should be fishing");
            var fuelPathLength = ai.pathToNearestFuelSite(schoolPos, map).length;
            while (ship.getFuel() > fuelPathLength * testAi.scenario.getShipFuelPerMove()) {
                ship.useFuel(1);
            }
            ai.run(shipOwner, map);
            assert.deepEqual(ship.getState(), shipState.goingToRefuel, "Ship should go to refuel");
        });

        QUnit.test("AI: claiming and releasing ocean tiles", function (assert) {
            map.emptyGrid(sceanario.getOceanShipCapacity());
            map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
            map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
            var schoolPos: Point2 = new Point2(0, 0);
            var tile: Ocean = <Ocean> map.getTile(schoolPos);
            map.addSchool(new Cod(1000, schoolPos));
            var shipOwner: ShipOwner = new ShipOwner(gov, new Point2(2, 2), "shipOwner1");
            var ship1: Ship = shipOwner.buyShip(FishType.Cod);
            assert.deepEqual(tile.getShipsInTile(), 0, "No ship should have claimed the tile");
            ai.run(shipOwner, map);
            assert.deepEqual(ship1.getState(), shipState.goingToFish, "ship should be going to fish");
            assert.deepEqual(tile.getShipsInTile(), 1, "One ship should have claimed the tile");
            var ship2: Ship = shipOwner.buyShip(FishType.Cod);
            ai.run(shipOwner, map);
            assert.deepEqual(ship2.getState(), shipState.goingToFish, "ship should be going to fish");
            assert.deepEqual(tile.getShipsInTile(), 2, "Two ships should have claimed the tile");
            var ship3: Ship = shipOwner.buyShip(FishType.Cod);
            ai.run(shipOwner, map);
            assert.notDeepEqual(ship3.getState(), shipState.goingToFish, "Ship should not be able to go fish");
            shipOwner.sellShip(ship3);
            var fuelPathLength = ai.pathToNearestFuelSite(schoolPos, map).length;
            while (!ship1.hasReachedGoal()) {
                ai.run(shipOwner, map);//Let ship go to fishing tile
            }
            ai.run(shipOwner, map);//Let ship start fishing
            while (ship1.getFuel() > fuelPathLength * testAi.scenario.getShipFuelPerMove()) {
                //Let ship1 use all fuel
                ship1.useFuel(1);
            }
            //Ship should now leave tile and go to refuel
           ai.run(shipOwner, map);
           assert.deepEqual(tile.getShipsInTile(), 1, "One ship should have released the tile");
        });
    }
             

}