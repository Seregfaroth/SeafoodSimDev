// <reference path = "../../TSSeafoodSimDevXTest/ts/declarations/qunit.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
var TestShip = (function () {
    function TestShip() {
        var _this = this;
        this.runTests = function () {
            var gov = new Government(new Restrictions());
            var owner = new ShipOwner(gov, new Point2(0, 0), "0");
            var codShip = new Ship(owner, FishType.Cod);
            var mackerelShip = new Ship(owner, FishType.Mackerel);
            var map = new Map(gov.getRestrictions());
            var thisPlaceholder = _this;
            map.emptyGrid(100);
            QUnit.test("Ship: Constructor", function (assert) {
                var testShip;
                //Check that ship is undefined
                assert.equal(testShip, undefined, "ship should be undefined");
                //Create  cod ship and check members
                testShip = new Ship(owner, FishType.Cod);
                assert.ok(testShip, "Ship should have been created");
                var noOfFish = 0;
                for (var i = 0; i < testShip.getCargo()[FishType.Cod].length; i++) {
                    noOfFish += testShip.getCargo()[FishType.Cod][i];
                }
                for (var i = 0; i < testShip.getCargo()[FishType.Mackerel].length; i++) {
                    noOfFish += testShip.getCargo()[FishType.Mackerel][i];
                }
                assert.deepEqual(noOfFish, 0, "Cargo should be empty");
                assert.deepEqual(testShip.getFuel(), testShip.getFuelCapacity(), "Fuel should be full");
                assert.deepEqual(testShip.getType(), FishType.Cod, "Ship should be a cod ship");
            });
            QUnit.test("Ship: Follow path", function (assert) {
                map.emptyGrid(100);
                var point = new Point2(codShip.getPosition().row, codShip.getPosition().col + 1);
                var path = [codShip.getPosition(), point, point];
                var fuel = codShip.getFuel();
                codShip.setPath(path);
                assert.notDeepEqual(codShip.getPosition(), point, "Ship should not have moved");
                codShip.followPath(map);
                //Check that the ship has moved to the next point in the path
                assert.deepEqual(codShip.getPosition(), point);
                //Check that the ship has used fuel
                assert.deepEqual(codShip.getFuel(), fuel - codShip.getFuelPerMove());
            });
            QUnit.test("Ship: follow path exception", function (assert) {
                var path = [codShip.getPosition(), new Point2(0, 0)];
                codShip.setPath(path);
                codShip.followPath(map);
                //Check that the function throws an error
                assert.throws(function () {
                    codShip.followPath(map);
                }, Error, "should throw an error");
            });
            QUnit.test("Ship: follow path not possible", function (assert) {
                map.emptyGrid(100);
                map.getGrid()[0][0] = new LandingSite(1, 10, 101, {}, "0", new Point2(0, 0));
                map.addShip(new Ship(new ShipOwner(gov, new Point2(0, 0), "0"), FishType.Cod));
                var path = [codShip.getPosition(), new Point2(0, 0), new Point2(0, 1)];
                var oldPosition = codShip.getPosition();
                codShip.setPath(path);
                codShip.followPath(map);
                //Check that ship has not moved
                assert.deepEqual(oldPosition, codShip.getPosition(), "ship should not have moved");
                assert.deepEqual(path.length, 3, "path should not be modified");
                map.getGrid()[0][0] = new LandingSite(1, 0, 0, {}, "0", new Point2(0, 0));
                codShip.setPath(path);
                codShip.followPath(map);
                //Check that ship has not moved
                assert.deepEqual(oldPosition, codShip.getPosition(), "ship should not have moved");
                assert.deepEqual(path.length, 3, "path should not be modified");
            });
            QUnit.test("Ship: has reached goal", function (assert) {
                var goal = new Point2(codShip.getPosition().row, codShip.getPosition().col + 1);
                var path = [codShip.getPosition(), goal];
                codShip.setPath(path);
                assert.ok(!codShip.hasReachedGoal());
                codShip.followPath(map);
                //Check that the ship has reached the goal
                assert.ok(codShip.hasReachedGoal());
            });
            QUnit.test("Ship: fish cod", function (assert) {
                var map = new Map(gov.getRestrictions());
                map.emptyGrid(100);
                var point = new Point2(2, 2);
                var noOfFishInSchool = 100;
                var school = new Cod(noOfFishInSchool, point);
                map.addSchool(school);
                var path = [codShip.getPosition(), point];
                codShip.setPath(path);
                codShip.followPath(map);
                //Check that ship is ready to fish
                assert.deepEqual(codShip.getPosition(), point, "ship should be at fishing position");
                assert.deepEqual(codShip.getCargoSize(), 0, "ship cargo should be empyt");
                codShip.fish(map);
                //Check if ship has fished
                assert.ok(codShip.getCargoSize() > 0, "ship should have fished");
            });
            QUnit.test("Ship: fish mackerel", function (assert) {
                var map = new Map(gov.getRestrictions());
                map.emptyGrid(100);
                var point = new Point2(2, 2);
                var noOfFishInSchool = 100;
                var school = new Mackerel(noOfFishInSchool, point);
                map.addSchool(school);
                var path = [mackerelShip.getPosition(), point];
                mackerelShip.setPath(path);
                mackerelShip.followPath(map);
                //Check that ship is ready to fish
                assert.deepEqual(mackerelShip.getPosition(), point, "ship should be at fishing position");
                assert.deepEqual(mackerelShip.getCargoSize(), 0, "ship cargo should be empyt");
                mackerelShip.fish(map);
                //Check if ship has fished
                assert.ok(mackerelShip.getCargoSize() > 0, "ship should have fished");
            });
            QUnit.test("Ship: land", function (assert) {
                var map = new Map(gov.getRestrictions());
                map.emptyGrid(100);
                var prices = {};
                prices[0] = 10;
                prices[1] = 8;
                var site = new LandingSite(1, 100, 1, prices, "0", new Point2(2, 2));
                map.getGrid()[2][2] = site;
                var point = new Point2(2, 2);
                var noOfFishInSchool = 100;
                var school = new Cod(noOfFishInSchool, point);
                map.addSchool(school);
                var path = [codShip.getPosition(), point];
                codShip.setPath(path);
                codShip.followPath(map);
                codShip.fish(map);
                //Check that ship has some cargo
                assert.ok(codShip.getCargoSize() > 0, "ship should have fished");
                var balance = owner.getBalance();
                codShip.land(site);
                assert.deepEqual(codShip.getCargoSize(), 0, "ship should have landed");
                assert.ok(owner.getBalance() > balance, "owner should be paid"); //TODO check correct price when implemented
            });
            QUnit.test("Ship: refuel", function (assert) {
                map.emptyGrid(100);
                var fuelSite = new FuelSite(1, 100, 1, 1, "0", new Point2(0, 0));
                var balance = codShip.getOwner().getBalance();
                codShip.setPath([codShip.getPosition(), new Point2(0, 1)]);
                codShip.followPath(map);
                var fuel = codShip.getFuel();
                //Check that the ship has used fuel
                assert.notDeepEqual(codShip.getFuel(), codShip.getFuelCapacity(), "ships fuel tank should not be full");
                codShip.refuel(fuelSite);
                //Check that the ship has refueled
                assert.deepEqual(codShip.getFuel(), codShip.getFuelCapacity(), "ship should have been refueled");
                //Check that the ship owner has been charged
                assert.deepEqual(codShip.getOwner().getBalance(), balance - fuelSite.getPrice() * (codShip.getFuel() - fuel), "owner should have been charged");
            });
        };
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    return TestShip;
}());
//# sourceMappingURL=TestShip.js.map