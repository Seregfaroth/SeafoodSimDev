var TestMap = (function () {
    function TestMap() {
        var scenario = new Scenario();
        var gov = new Government(new Restrictions(scenario), scenario);
        var map = new Map(new Restrictions(scenario), scenario);
        QUnit.test("Map: add ship", function (assert) {
            var ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0", scenario), scenario);
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
        });
        QUnit.test("Map: remove ship", function (assert) {
            var ship = new Ship(new ShipOwner(gov, new Point2(0, 0), "0", scenario), scenario);
            map.addShip(ship);
            assert.ok(map.getShips().indexOf(ship) > -1, "ship should be in map");
            map.removeShip(ship);
            assert.deepEqual(map.getShips().indexOf(ship), -1, "ship should not be in map");
        });
        QUnit.test("Map: get number of fish in tile", function (assert) {
            map = new Map(gov.getRestrictions(), scenario);
            var point = new Point2(0, 0);
            assert.deepEqual(map.getNoOfFishInTile(point), 0, "there should be no fish in tile");
            map.addSchool(new Cod(100, 80, new Point2(0, 1), scenario));
            assert.deepEqual(map.getNoOfFishInTile(point), 0, "there should be no fish in tile");
            map.addSchool(new Cod(100, 80, new Point2(0, 1), scenario));
            //Check that fish have been added
            assert.deepEqual(map.getNoOfFishInTile(point), 100, "there should be 100 fish in tile");
            map.addSchool(new Cod(100, 80, new Point2(0, 1), scenario));
            assert.deepEqual(map.getNoOfFishInTile(point), 150, "there should be 150 fish in tile");
        });
        QUnit.test("Map: fish", function (assert) {
            map = new Map(gov.getRestrictions(), scenario);
            var fishingPoint = new Point2(0, 0);
            var noOfFish = 1000;
            var codScool = new Cod(noOfFish, 80, fishingPoint, scenario);
            map.addSchool(codScool);
            ////var fish: Fish[] = map.fish(fishingPoint, 100);
            //assert.deepEqual(fish.length, noOfFish * scenario.getFishingPercentage(), "number of fish should correspond to fishing percent");
            //assert.deepEqual(map.getNoOfFishInTile(fishingPoint), noOfFish - fish.length, "the fished fish should be removed from map");
            //assert.deepEqual(codScool.getSize(), noOfFish - fish.length, "the fished fish should be removed from cod school");
        });
        QUnit.test("Map: fish with full capacity", function (assert) {
            map = new Map(gov.getRestrictions(), scenario);
            var fishingPoint = new Point2(0, 0);
            var noOfFish = 100000;
            var codScool = new Cod(noOfFish, 80, fishingPoint, scenario);
            map.addSchool(codScool);
            var capacity = noOfFish * scenario.getFishingPercentage() / 2;
            //var fish: Fish[] = map.fish(fishingPoint, capacity);
            //assert.deepEqual(fish.length, capacity, "number of fish should be equal to capacity");
            //assert.deepEqual(map.getNoOfFishInTile(fishingPoint), noOfFish - fish.length, "the fished fish should be removed from map");
            //assert.deepEqual(codScool.getSize(), noOfFish - fish.length, "the fished fish should be removed from cod school");
        });
        QUnit.test("Map: get number of ships in tile", function (assert) {
            map = new Map(gov.getRestrictions(), scenario);
            var owner = new ShipOwner(gov, new Point2(4, 4), "0", scenario);
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
    return TestMap;
}());
//# sourceMappingURL=TestMap.js.map