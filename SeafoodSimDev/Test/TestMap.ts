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
            var ship: Ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.cod, new Point2(0,0));
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
        });

        QUnit.test("Map: remove ship", function (assert) {
            var ship: Ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.cod,new Point2(0, 0));
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
            map.removeShip(ship);
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
        });
        QUnit.test("Map: get number of ships in tile", function (assert) {
            map = new Map(gov.getRestrictions());
            var shipPoint: Point2 = new Point2(4, 4);
            var owner: ShipOwner = new ShipOwner(gov, new Point2(4, 4), "0");
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
            var fishPoint: Point2 = new Point2(0, 0);
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
            var fishPoint: Point2 = new Point2(0, 0);
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
            var pathFindingMap: number[][] = map.getPathFindingMap();
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
        QUnit.test("Map: get fishing points no land", function (assert) {
            map.emptyGrid(0);
            var row: number = 1;
            var col: number = 1;
            var expected: Point2[] = [new Point2(row - 1, col), new Point2(row, col - 1), new Point2(row, col), new Point2(row, col + 1), new Point2(row + 1, col)];
            var points: Point2[] = map.getFishingPoints(new Point2(1, 1));
            assert.deepEqual(points.length, expected.length, "Should be 5 points");
            for (var i = 0; i < points.length; i++) {
                assert.ok(expected[i].compare(points[i]), "Points should be equal");
            }
        });

        QUnit.test("Map: get fishing points with land", function (assert) {
            map.emptyGrid(0);
            var row: number = 1;
            var col: number = 1;
            map.getGrid()[row][col+1] = new Land();
            map.getGrid()[row - 1][col] = new Land();
            var expected: Point2[] = [new Point2(row, col - 1), new Point2(row, col), new Point2(row + 1, col)];
            var points: Point2[] = map.getFishingPoints(new Point2(1, 1));
            assert.deepEqual(points.length, expected.length, "Should be 3 points");
            for (var i = 0; i < points.length; i++) {
                assert.ok(expected[i].compare(points[i]), "Points should be equal");
            }
        });

        QUnit.test("Map: getAdjecentSchoolPoint", function (assert) {
            map.emptyGrid(0);
            var codPos: Point2 = new Point2(1, 1);
            map.addSchool(new Cod(1, codPos));
            assert.deepEqual(codPos, map.getAdjecentSchoolPoint(new Point2(1, 1)), "should find the school point");
            assert.deepEqual(codPos, map.getAdjecentSchoolPoint(new Point2(0, 1)), "should find the school point");
            assert.deepEqual(codPos, map.getAdjecentSchoolPoint(new Point2(2, 1)), "should find the school point");
            assert.deepEqual(codPos, map.getAdjecentSchoolPoint(new Point2(1, 2)), "should find the school point");
        });
    }
}