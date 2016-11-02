class TestMap {
    private scenario: Scenario;
    public constructor() {

        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var gov: Government = new Government(new Restrictions());
        var map: Map = new Map(gov.getRestrictions());
        var testMap: TestMap = this;
        QUnit.test("Map: add ship", function (assert) {
            var ship: Ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"));
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
        });

        QUnit.test("Map: remove ship", function (assert) {
            var ship: Ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"));
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
            map.removeShip(ship);
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
        });
        QUnit.test("Map: get number of fish in tile", function (assert) {
            map = new Map(gov.getRestrictions());
            var point: Point2 = new Point2(0, 0);
            assert.deepEqual(map.getNoOfFishInTile(point), 0, "there should be no fish in tile");
            map.addSchool(new Cod(100, new Point2(0, 1)));
            assert.deepEqual(map.getNoOfFishInTile(point), 0, "there should be no fish in tile");
            map.addSchool(new Cod(100, point));
            //Check that fish have been added
            assert.deepEqual(map.getNoOfFishInTile(point), 100, "there should be 100 fish in tile");
            map.addSchool(new Cod(50, point));
            assert.deepEqual(map.getNoOfFishInTile(point), 150, "there should be 150 fish in tile");
        });
        QUnit.test("Map: get number of ships in tile", function (assert) {
            map = new Map(gov.getRestrictions());
            var owner: ShipOwner = new ShipOwner(gov, new Point2(4, 4), "0");
            //Check that no ships are in tile
            assert.deepEqual(map.getNoOfShipsInTile(new Point2(4, 4)), 0, "there should not be any ships in tile");
            map.addShip(owner.buyShip());
            assert.deepEqual(map.getNoOfShipsInTile(new Point2(4, 4)), 1, "there should be 1 ship in tile");
            map.addShip(owner.buyShip());
            map.addShip(owner.buyShip());
            map.addShip(owner.buyShip());
            assert.deepEqual(map.getNoOfShipsInTile(new Point2(4, 4)), 4, "there should be 4 ships in tile");
        });
        
    }
}