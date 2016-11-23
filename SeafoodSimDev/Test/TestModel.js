var TestModel = (function () {
    function TestModel() {
        this.runTests = function () {
            var model = new Model();
            var restrictions = model.getGovernment().getRestrictions();
            var map = model.getMap();
            var owner = new ShipOwner(new Government(restrictions), new Point2(0, 0), "owner1");
            QUnit.test("Model: update number of ships", function (assert) {
                map.emptyGrid(1000);
                assert.deepEqual(map.getShips().length, 0, "there should not be any ships");
                restrictions.setNoCodShips(3);
                model.startNewInterval();
                assert.deepEqual(map.getShips().length, 3, "there should be 3 ships");
                restrictions.setNoCodShips(0);
                model.startNewInterval();
                assert.deepEqual(map.getShips().length, 0, "there should not be any ships");
            });
            QUnit.test("Model: get random ocean for ship with no ocean", function (assert) {
                map.emptyGrid(1000);
                for (var i = 0; i < map.getMapHeight(); i++) {
                    for (var j = 0; j < map.getMapWidth(); j++) {
                        map.getGrid()[i][j] = new Land();
                    }
                }
                assert.throws(function () {
                    model.getRandomOceanPos();
                }, Error, "should throw an error");
            });
            QUnit.test("Model: get random ocean for ship", function (assert) {
                map.emptyGrid(1);
                var randPoint = model.getRandomOceanPos();
                assert.ok(randPoint, "should be able to find a tile for a ship");
                model.getMap().addShip(new Ship(owner, FishType.cod, randPoint));
                assert.ok(model.getRandomOceanPos(), "Should be able to find another tile");
            });
        };
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    return TestModel;
}());
//# sourceMappingURL=TestModel.js.map