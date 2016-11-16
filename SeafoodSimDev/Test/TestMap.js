var TestMap = (function () {
    function TestMap() {
        var _this = this;
        this.runTests = function () {
            var gov = new Government(new Restrictions());
            var map = new Map(gov.getRestrictions());
            var testMap = _this;
            QUnit.test("Map: add ship", function (assert) {
                var ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.cod);
                assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
                map.addShip(ship);
                assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
            });
            QUnit.test("Map: remove ship", function (assert) {
                var ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.cod);
                map.addShip(ship);
                assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
                map.removeShip(ship);
                assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
            });
            QUnit.test("Map: get number of fish in tile", function (assert) {
                map = new Map(gov.getRestrictions());
                var point = new Point2(0, 0);
                assert.deepEqual(map.getNoOfCodInTile(point), 0, "there should be no fish in tile");
                map.addSchool(new Cod(100, new Point2(0, 1)));
                assert.deepEqual(map.getNoOfCodInTile(point), 0, "there should be no fish in tile");
                map.addSchool(new Cod(100, point));
                //Check that fish have been added
                assert.deepEqual(map.getNoOfCodInTile(point), 100, "there should be 100 fish in tile");
                map.addSchool(new Cod(50, point));
                assert.deepEqual(map.getNoOfCodInTile(point), 150, "there should be 150 fish in tile");
            });
            QUnit.test("Map: get number of ships in tile", function (assert) {
                map = new Map(gov.getRestrictions());
                var owner = new ShipOwner(gov, new Point2(4, 4), "0");
                //Check that no ships are in tile
                assert.deepEqual(map.getNoOfShipsInTile(new Point2(4, 4)), 0, "there should not be any ships in tile");
                map.addShip(owner.buyShip(FishType.cod));
                assert.deepEqual(map.getNoOfShipsInTile(new Point2(4, 4)), 1, "there should be 1 ship in tile");
                map.addShip(owner.buyShip(FishType.cod));
                map.addShip(owner.buyShip(FishType.cod));
                map.addShip(owner.buyShip(FishType.cod));
                assert.deepEqual(map.getNoOfShipsInTile(new Point2(4, 4)), 4, "there should be 4 ships in tile");
            });
        };
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    return TestMap;
}());
//# sourceMappingURL=TestMap.js.map