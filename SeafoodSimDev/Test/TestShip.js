// <reference path = "../../TSSeafoodSimDevXTest/ts/declarations/qunit.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
var TestShip = (function () {
    function TestShip() {
        var scenario = new Scenario();
        var gov = new Government(new Restrictions(scenario), scenario);
        var owner = new ShipOwner(gov, new Point2(0, 0), "0", scenario);
        var ship = new Ship(owner, scenario);
        var map = new Map(gov.getRestrictions(), scenario);
        map.emptyGrid();
        QUnit.test("Ship: Constructor", function (assert) {
            var testShip;
            //Check that ship is undefined
            assert.equal(testShip, undefined);
            //Create ship and check members
            testShip = new Ship(owner, scenario);
            assert.ok(testShip);
            assert.deepEqual(testShip.getCargo(), []);
            assert.deepEqual(testShip.getFuel(), testShip.getFuelCapacity());
        });
        QUnit.test("Ship: Follow path", function (assert) {
            map.emptyGrid();
            var point = new Point2(ship.getPosition().row, ship.getPosition().col + 1);
            var path = [ship.getPosition(), point, point];
            var fuel = ship.getFuel();
            ship.setPath(path);
            assert.notDeepEqual(ship.getPosition(), point);
            ship.followPath(map);
            //Check that the ship has moved to the next point in the path
            assert.deepEqual(ship.getPosition(), point);
            //Check that the ship has used fuel
            assert.deepEqual(ship.getFuel(), fuel - ship.getFuelPerMove());
        });
        QUnit.test("Ship: follow path exception", function (assert) {
            var path = [new Point2(0, 0), new Point2(1, 0)];
            ship.setPath(path);
            ship.followPath(map);
            //Check that the function throws an error
            assert.throws(function () {
                ship.followPath(map);
            }, Error, "should throw an error");
        });
        QUnit.test("Ship: follow path not possible", function (assert) {
            map.emptyGrid();
            map.getGrid()[0][0] = new LandingSite(1, 10, 101, {}, "0", new Point2(0, 0));
            map.addShip(new Ship(new ShipOwner(gov, new Point2(0, 0), "0", scenario), scenario));
            var path = [ship.getPosition(), new Point2(0, 0), new Point2(0, 1)];
            var oldPosition = ship.getPosition();
            ship.setPath(path);
            ship.followPath(map);
            //Check that ship has not moved
            assert.deepEqual(oldPosition, ship.getPosition(), "ship should not have moved");
            assert.deepEqual(path.length, 3, "path should not be modified");
            map.getGrid()[0][0] = new LandingSite(1, 0, 0, {}, "0", new Point2(0, 0));
            ship.setPath(path);
            ship.followPath(map);
            //Check that ship has not moved
            assert.deepEqual(oldPosition, ship.getPosition(), "ship should not have moved");
            assert.deepEqual(path.length, 3, "path should not be modified");
        });
        QUnit.test("Ship: has reached goal", function (assert) {
            var goal = new Point2(ship.getPosition().row, ship.getPosition().col + 1);
            var path = [ship.getPosition(), goal];
            ship.setPath(path);
            assert.ok(!ship.hasReachedGoal());
            ship.followPath(map);
            //Check that the ship has reached the goal
            assert.ok(ship.hasReachedGoal());
        });
        QUnit.test("Ship: fish", function (assert) {
            var map = new Map(gov.getRestrictions(), scenario);
            map.emptyGrid();
            var point = new Point2(2, 2);
            var noOfFishInSchool = 100;
            var school = new Cod(noOfFishInSchool, 10, point, scenario);
            map.addSchool(school);
            var path = [ship.getPosition(), point];
            ship.setPath(path);
            ship.followPath(map);
            //Check that ship is ready to fish
            assert.deepEqual(ship.getPosition(), point, "ship should be at fishing position");
            assert.deepEqual(ship.getCargo(), [], "ship cargo should be empyt");
            ship.fish(map);
            //Check if ship has fished
            assert.deepEqual(ship.getCargo().length, Math.floor(noOfFishInSchool * scenario.getFishingPercentage()), "ship should have fished");
        });
        QUnit.test("Ship: land", function (assert) {
            var map = new Map(gov.getRestrictions(), scenario);
            map.emptyGrid();
            var prices = {};
            prices[0] = 10;
            prices[1] = 8;
            var site = new LandingSite(1, 10, 1, prices, "0", new Point2(2, 2));
            map.getGrid()[2][2] = site;
            var point = new Point2(2, 2);
            var noOfFishInSchool = 100;
            var school = new Cod(noOfFishInSchool, 10, point, scenario);
            map.addSchool(school);
            var path = [ship.getPosition(), point];
            ship.setPath(path);
            ship.followPath(map);
            ship.fish(map);
            //Check that ship has some cargo
            assert.ok(ship.getCargo().length > 0, "ship should have fished");
            var balance = owner.getBalance();
            var price = 0;
            ship.getCargo().forEach(function (f) {
                price += prices[0];
            });
            ship.land(site);
            assert.deepEqual(ship.getCargo().length, 0, "ship should have fished");
            assert.deepEqual(owner.getBalance(), balance + price, "owner should be paid");
        });
        QUnit.test("Ship: refuel", function (assert) {
            map.emptyGrid();
            var fuelSite = new FuelSite(1, 100, 1, 1, "0", new Point2(0, 0));
            var balance = ship.getOwner().getBalance();
            ship.setPath([new Point2(0, 0), new Point2(0, 1)]);
            ship.followPath(map);
            var fuel = ship.getFuel();
            //Check that the ship has used fuel
            assert.notDeepEqual(ship.getFuel(), ship.getFuelCapacity(), "ships fuel tank should not be full");
            ship.refuel(fuelSite);
            //Check that the ship has refueled
            assert.deepEqual(ship.getFuel(), ship.getFuelCapacity(), "ship should have been refueled");
            //Check that the ship owner has been charged
            assert.deepEqual(ship.getOwner().getBalance(), balance - fuelSite.getPrice() * (ship.getFuel() - fuel), "owner should have been charged");
        });
    }
    return TestShip;
}());
//# sourceMappingURL=TestShip.js.map