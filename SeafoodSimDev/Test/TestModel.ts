class TestModel {
    private scenario: Scenario;
    public constructor() {

        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var model: Model = new Model();
        var restrictions: Restrictions = model.getGovernment().getRestrictions();
        var map: Map = model.getMap();
        var owner: ShipOwner = new ShipOwner(new Government(restrictions), new Point2(0, 0), "owner1");

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
                model.getRandomOcean();
            }, Error, "should throw an error");
        });
        
        QUnit.test("Model: get random ocean for ship", function (assert) {
            map.emptyGrid(1);
            var randPoint: Point2 = model.getRandomOcean();
            assert.ok(randPoint, "should be able to find a tile for a ship");
            model.getMap().addShip(new Ship(owner, FishType.cod, randPoint));
            assert.ok(model.getRandomOcean(), "Should be able to find another tile");

        });

    }
}