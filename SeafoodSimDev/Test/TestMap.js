var TestMap = (function () {
    function TestMap() {
        var _this = this;
        this.runTests = function () {
            var gov = new Government(new Restrictions());
            var map = new Map(gov.getRestrictions());
            var testMap = _this;
            QUnit.test("Map: add ship", function (assert) {
                var ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.cod, new Point2(0, 0));
                assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
                map.addShip(ship);
                assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
            });
            QUnit.test("Map: remove ship", function (assert) {
                var ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.cod, new Point2(0, 0));
                map.addShip(ship);
                assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
                map.removeShip(ship);
                assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
            });
            QUnit.test("Map: get number of ships in tile", function (assert) {
                map = new Map(gov.getRestrictions());
                var shipPoint = new Point2(4, 4);
                var owner = new ShipOwner(gov, new Point2(4, 4), "0");
                //Check that no ships are in tile
                assert.deepEqual(map.getNoOfShipsInTile(shipPoint), 0, "there should not be any ships in tile");
                map.addShip(owner.buyShip(FishType.cod, shipPoint));
                assert.deepEqual(map.getNoOfShipsInTile(shipPoint), 1, "there should be 1 ship in tile");
                map.addShip(owner.buyShip(FishType.cod, shipPoint));
                map.addShip(owner.buyShip(FishType.cod, shipPoint));
                map.addShip(owner.buyShip(FishType.cod, shipPoint));
                assert.deepEqual(map.getNoOfShipsInTile(shipPoint), 4, "there should be 4 ships in tile");
            });
            QUnit.test("Map: get biomass in tile", function (assert) {
                map.emptyGrid(1000);
                var fishPoint = new Point2(0, 0);
                assert.deepEqual(map.getBiomassOfinTile(Cod, fishPoint), 0, "There should be no fish");
                assert.deepEqual(map.getBiomassOfinTile(Mackerel, fishPoint), 0, "There should be no fish");
                map.addSchool(new Cod(80, fishPoint));
                assert.deepEqual(map.getBiomassOfinTile(Cod, fishPoint), 80, "Biomass of cod should be 80");
                map.addSchool(new Mackerel(100, fishPoint));
                assert.deepEqual(map.getBiomassOfinTile(Cod, fishPoint), 80, "Biomass of cod should not change");
                assert.deepEqual(map.getBiomassOfinTile(Mackerel, fishPoint), 100, "Biomass of mackerel should be 100");
            });
            QUnit.test("Map: get biomass fraction", function (assert) {
                map.emptyGrid(1000);
                var fishPoint = new Point2(0, 0);
                map.addSchool(new Cod(80, fishPoint));
                assert.deepEqual(map.getBiosmassFractionOf(Cod, fishPoint), 1, "Fraction of cod should be 1");
                map.addSchool(new Mackerel(20, fishPoint));
                assert.deepEqual(map.getBiosmassFractionOf(Cod, fishPoint), 0.8, "Fraction of cod should be 0.8");
                assert.deepEqual(map.getBiosmassFractionOf(Mackerel, fishPoint), 0.2, "Fraction of cod should be 0.8");
            });
            QUnit.test("Map: get pathfinding map", function (assert) {
                map.emptyGrid(1000);
                map.getGrid()[0][0] = new Land();
                map.getGrid()[2][1] = new Land();
                map.getGrid()[2][2] = new Land();
                var pathFindingMap = map.getPathFindingMap();
                for (var i = 0; i < map.getMapHeight(); i++) {
                    for (var j = 0; j < map.getMapWidth(); j++) {
                        if (i == 0 && j == 0 || i == 2 && j == 1 || i == 2 && j == 2) {
                            assert.deepEqual(pathFindingMap[i][j], 1, "Should be land");
                        }
                        else {
                            assert.deepEqual(pathFindingMap[i][j], 0, "should be ocean");
                        }
                    }
                }
            });
        };
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    return TestMap;
}());
//# sourceMappingURL=TestMap.js.map