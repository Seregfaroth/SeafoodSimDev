class TestMap {
    public constructor() {
        var map: Map = new Map(5, 0, new Restrictions());

        QUnit.test("Map: add ship", function (assert) {
            var ship: Ship = new Ship(new ShipOwner(new Point2(0, 0), "0"));
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
        });

        QUnit.test("Map: remove ship", function (assert) {
            var ship: Ship = new Ship(new ShipOwner(new Point2(0, 0), "1"));
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
            map.removeShip(ship);
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
        });
        QUnit.test("Map: get number of fish in tile", function (assert) {
            map = new Map(5, 0, new Restrictions());
            var point: Point2 = new Point2(0, 0);
            assert.deepEqual(map.getNoOfFishInTile(point), 0, "there should be no fish in tile");
            map.addSchool(new Cod(100, new Point2(0,1)));
            assert.deepEqual(map.getNoOfFishInTile(point), 0, "there should be no fish in tile");
            map.addSchool(new Cod(100, point));
            //Check that fish have been added
            assert.deepEqual(map.getNoOfFishInTile(point), 100, "there should be 100 fish in tile");
            map.addSchool(new Mackerel(50, point));
            assert.deepEqual(map.getNoOfFishInTile(point), 150, "there should be 150 fish in tile");
        });

        QUnit.test("Map: fish", function (assert) {
            map = new Map(5, 0, new Restrictions());
            var fishingPoint: Point2 = new Point2(0, 0);
            var noOfFish: number = 1000;
            var codScool: Cod = new Cod(noOfFish, fishingPoint)
            map.addSchool(codScool);

            var fish: Fish[] = map.fish(fishingPoint, 100);
            assert.deepEqual(fish.length, noOfFish * map.getFishingPercentage(), "number of fish should correspond to fishing percent");
            assert.deepEqual(map.getNoOfFishInTile(fishingPoint), noOfFish - fish.length, "the fished fish should be removed from map");
            assert.deepEqual(codScool.getSize(), noOfFish - fish.length, "the fished fish should be removed from cod school");
        });

        QUnit.test("Map: fish with full capacity", function (assert) {
            map = new Map(5, 0, new Restrictions());
            var fishingPoint: Point2 = new Point2(0, 0);
            var noOfFish: number = 100000;
            var codScool: Cod = new Cod(noOfFish, fishingPoint)
            map.addSchool(codScool);
            var capacity: number = noOfFish * map.getFishingPercentage() / 2;
            var fish: Fish[] = map.fish(fishingPoint, capacity);
            assert.deepEqual(fish.length, capacity, "number of fish should be equal to capacity");
            assert.deepEqual(map.getNoOfFishInTile(fishingPoint), noOfFish - fish.length, "the fished fish should be removed from map");
            assert.deepEqual(codScool.getSize(), noOfFish - fish.length, "the fished fish should be removed from cod school");
        });

        QUnit.test("Map: get number of ships in tile", function (assert) {
            map = new Map(5, 0, new Restrictions());
            var owner: ShipOwner = new ShipOwner(new Point2(4, 4), "0");
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