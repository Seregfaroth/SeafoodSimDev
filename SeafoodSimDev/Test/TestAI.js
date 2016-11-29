var TestAI = (function () {
    function TestAI() {
        var _this = this;
        this.runTests = function () {
            var testAi = _this;
            var ai = new AI();
            var gov = new Government(new Restrictions());
            var map = new Map(gov.getRestrictions());
            var richShipOwner = new ShipOwner(gov, new Point2(0, 0), "0", 10000000000000000000);
            var poorShipOwner = new ShipOwner(gov, new Point2(0, 0), "1", -10000000000000000000);
            var sceanario = _this.scenario;
            gov.getRestrictions().setTacCod(1000);
            gov.getRestrictions().setTacMackerel(10000);
            QUnit.test("AI: pathToNearestLandingSite", function (assert) {
                map.emptyGrid(sceanario.getOceanShipCapacity());
                map.getGrid()[2][2] = new LandingSite(1, 10, 1, {}, "0", new Point2(2, 2));
                var path = ai.pathToNearestLandingSite(new Point2(2, 2), map);
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
                var path = ai.pathToNearestLandingSite(new Point2(0, 0), map);
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
                var map = new Map(gov.getRestrictions());
                map.emptyGrid(sceanario.getOceanShipCapacity());
                map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
                map.getGrid()[5][8] = new FuelSite(1, 10, 101, 10, "1", new Point2(5, 8));
                var path = ai.pathToNearestFuelSite(new Point2(0, 8), map);
                assert.deepEqual(path[path.length - 1], new Point2(5, 8), "nearest fuel site from 0,8 should be 5,8");
            });
            QUnit.test("AI: pathfinding straight line", function (assert) {
                map.emptyGrid(sceanario.getOceanShipCapacity());
                var expectedPath = [new Point2(0, 0), new Point2(0, 1), new Point2(0, 2)];
                var path = ai.pathFinding(map, new Point2(0, 0), new Point2(0, 2));
                assert.deepEqual(path, expectedPath, "should find a straight line path");
            });
            QUnit.test("AI: pathfinding with land", function (assert) {
                map.emptyGrid(sceanario.getOceanShipCapacity());
                map.getGrid()[3][0] = new Land();
                map.getGrid()[3][1] = new Land();
                map.getGrid()[3][2] = new Land();
                var expectedPath = [new Point2(2, 0), new Point2(2, 1), new Point2(2, 2), new Point2(2, 3),
                    new Point2(3, 3), new Point2(4, 3), new Point2(4, 2), new Point2(4, 1), new Point2(4, 0)];
                var path = ai.pathFinding(map, new Point2(2, 0), new Point2(4, 0));
                assert.deepEqual(path, expectedPath, "should find a path around the land");
            });
            QUnit.test("AI: go fish", function (assert) {
                map.emptyGrid(sceanario.getOceanShipCapacity());
                map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
                map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
                var schoolPos = new Point2(0, 0);
                map.addSchool(new Cod(10, schoolPos));
                var shipOwner = new ShipOwner(gov, new Point2(3, 3), "shipOwner1");
                var ship = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                assert.deepEqual(ship.getState(), shipState.waiting, "Ship should be in a waiting state");
                ai.run(shipOwner, map);
                assert.deepEqual(ship.getState(), shipState.goingToFish, "Ship should be going to fish");
                var t1 = map.getFishingPoints(schoolPos);
                var t2 = ship.getPath()[ship.getPath().length - 1];
                var t3 = map.getFishingPoints(schoolPos).indexOf(ship.getPath()[ship.getPath().length - 1]);
                assert.deepEqual(map.getFishingPoints(schoolPos).filter(function (p) { return p.compare(ship.getPath()[ship.getPath().length - 1]); }).length, 1, "Ship should heading to school.");
            });
            QUnit.test("AI: fuel running low while fishing", function (assert) {
                map.emptyGrid(sceanario.getOceanShipCapacity());
                map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
                map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
                var schoolPos = new Point2(0, 0);
                map.addSchool(new Cod(1, schoolPos));
                var shipOwner = new ShipOwner(gov, new Point2(3, 3), "shipOwner1");
                var ship = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                ai.run(shipOwner, map);
                while (!ship.hasReachedGoal()) {
                    ai.run(shipOwner, map);
                }
                ai.run(shipOwner, map);
                assert.deepEqual(ship.getState(), shipState.fishing, "Ship should be fishing");
                var fuelPathLength = ai.pathToNearestFuelSite(ship.getPosition(), map).length;
                while (ship.getFuel() > fuelPathLength * testAi.scenario.getShipFuelPerMove()) {
                    ship.useFuel(1);
                }
                ai.run(shipOwner, map);
                assert.deepEqual(ship.getState(), shipState.goingToRefuel, "Ship should go to refuel");
            });
            QUnit.test("AI: claiming and releasing ocean tiles", function (assert) {
                map.emptyGrid(1);
                map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
                map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
                var schoolPos = new Point2(0, 0);
                var tile = map.getTile(schoolPos);
                var schoolPoints = map.getFishingPoints(schoolPos);
                map.addSchool(new Cod(1000, schoolPos));
                var shipOwner = new ShipOwner(gov, new Point2(2, 2), "shipOwner1");
                var ship1 = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                var claimedTiles = 0;
                for (var _i = 0, schoolPoints_1 = schoolPoints; _i < schoolPoints_1.length; _i++) {
                    var point = schoolPoints_1[_i];
                    claimedTiles += map.getTile(point).getShipsInTile();
                }
                assert.deepEqual(claimedTiles, 0, "No ship should have claimed the tiles");
                ai.run(shipOwner, map);
                assert.deepEqual(ship1.getState(), shipState.goingToFish, "ship should be going to fish");
                var claimedTiles = 0;
                for (var _a = 0, schoolPoints_2 = schoolPoints; _a < schoolPoints_2.length; _a++) {
                    var point = schoolPoints_2[_a];
                    claimedTiles += map.getTile(point).getShipsInTile();
                }
                assert.deepEqual(claimedTiles, 1, "One ship should have claimed the tile");
                var ship2 = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                ai.run(shipOwner, map);
                assert.deepEqual(ship2.getState(), shipState.goingToFish, "ship should be going to fish");
                var claimedTiles = 0;
                for (var _b = 0, schoolPoints_3 = schoolPoints; _b < schoolPoints_3.length; _b++) {
                    var point = schoolPoints_3[_b];
                    claimedTiles += map.getTile(point).getShipsInTile();
                }
                assert.deepEqual(claimedTiles, 2, "Two ships should have claimed the tiles");
                var ship3 = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                ai.run(shipOwner, map);
                assert.deepEqual(ship3.getState(), shipState.goingToFish, "ship should be going to fish");
                var claimedTiles = 0;
                for (var _c = 0, schoolPoints_4 = schoolPoints; _c < schoolPoints_4.length; _c++) {
                    var point = schoolPoints_4[_c];
                    claimedTiles += map.getTile(point).getShipsInTile();
                }
                assert.deepEqual(claimedTiles, 3, "Three ships should have claimed the tiles");
                var ship4 = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                ai.run(shipOwner, map);
                assert.notDeepEqual(ship4.getState(), shipState.goingToFish, "Ship should not be able to go fish");
                shipOwner.sellShip(ship4);
                while (!ship1.hasReachedGoal()) {
                    ai.run(shipOwner, map); //Let ship go to fishing tile
                }
                var fuelPathLength = ai.pathToNearestFuelSite(ship1.getPosition(), map).length;
                ai.run(shipOwner, map); //Let ship start fishing
                while (ship1.getFuel() > fuelPathLength * testAi.scenario.getShipFuelPerMove()) {
                    //Let ship1 use all fuel
                    ship1.useFuel(1);
                }
                //Ship should now leave tile and go to refuel
                ai.run(shipOwner, map);
                var claimedTiles = 0;
                for (var _d = 0, schoolPoints_5 = schoolPoints; _d < schoolPoints_5.length; _d++) {
                    var point = schoolPoints_5[_d];
                    claimedTiles += map.getTile(point).getShipsInTile();
                }
                assert.deepEqual(claimedTiles, 2, "One ship should have released the tile");
            });
            QUnit.test("AI: start new interval", function (assert) {
                map.emptyGrid(100);
                map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
                map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
                var schoolPos = new Point2(0, 0);
                map.addSchool(new Cod(1000, schoolPos));
                var shipOwner = new ShipOwner(gov, new Point2(2, 2), "shipOwner1");
                var codShip = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                var mackerelShip = shipOwner.buyShip(FishType.mackerel, new Point2(1, 1));
                while (!(codShip.hasReachedGoal() || mackerelShip.hasReachedGoal())) {
                    ai.run(shipOwner, map);
                }
                ai.run(shipOwner, map);
                ai.run(shipOwner, map);
                assert.notDeepEqual(ai.getCatchedSoFar(), [0, 0], "some fish should have been catched");
                ai.startNewInterval();
                assert.deepEqual(ai.getCatchedSoFar(), [0, 0], "catched so far should be reset");
            });
            QUnit.test("AI: total allowable catch", function (assert) {
                map.emptyGrid(100);
                map.getGrid()[0][4] = new LandingSite(1, 10, 1, {}, "0", new Point2(0, 4));
                map.getGrid()[5][3] = new FuelSite(1, 10, 10, 10, "0", new Point2(5, 3));
                var schoolPos = new Point2(0, 0);
                map.addSchool(new Cod(1000, schoolPos));
                map.addSchool(new Mackerel(1000, schoolPos));
                var shipOwner = new ShipOwner(gov, new Point2(2, 2), "shipOwner1");
                var codShip = shipOwner.buyShip(FishType.cod, new Point2(1, 1));
                var codShipOrigin = codShip.getPosition();
                var mackerelShip = shipOwner.buyShip(FishType.mackerel, new Point2(1, 1));
                var mackerelShipOrigin = mackerelShip.getPosition();
                //Set tac to 0
                map.getRestrictions().setTacCod(0);
                map.getRestrictions().setTacMackerel(0);
                for (var i = 0; i < 10; i++) {
                    ai.run(shipOwner, map);
                }
                assert.deepEqual(codShip.getPosition(), codShipOrigin, "Ship should not have moved");
                assert.deepEqual(mackerelShip.getPosition(), mackerelShipOrigin, "Ship should not have moved");
                //Set tac
                map.getRestrictions().setTacCod(10);
                map.getRestrictions().setTacMackerel(20);
                ai.run(shipOwner, map);
                assert.deepEqual(codShip.getState(), shipState.goingToFish, "Ship should be going to fish");
                assert.deepEqual(mackerelShip.getState(), shipState.goingToFish, "Ship should be going to fish");
                while (codShip.getCargoSize() < map.getRestrictions().getTAC()[FishType.cod] ||
                    mackerelShip.getCargoSize() < map.getRestrictions().getTAC()[FishType.mackerel]) {
                    ai.run(shipOwner, map);
                }
                codShipOrigin = codShip.getPosition();
                mackerelShipOrigin = mackerelShip.getPosition();
                ai.run(shipOwner, map);
                assert.deepEqual(codShip.getPosition(), codShipOrigin, "Ship should not have moved");
                assert.deepEqual(mackerelShip.getPosition(), mackerelShipOrigin, "Ship should not have moved");
                //Reset catch
                ai.startNewInterval();
                ai.run(shipOwner, map);
                assert.deepEqual(codShip.getState(), shipState.goingToFish, "Ship should be going to fish");
                assert.deepEqual(mackerelShip.getState(), shipState.goingToFish, "Ship should be going to fish");
            });
        };
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    return TestAI;
}());
//# sourceMappingURL=TestAI.js.map