var TestShipOwner = (function () {
    function TestShipOwner() {
        var owner = new ShipOwner(new Point2(0, 0), "0");
        QUnit.test("ShipOwner: constructor", function (assert) {
            var testOwner;
            var point = new Point2(0, 0);
            assert.equal(testOwner, undefined);
            testOwner = new ShipOwner(point, "1");
            //Check that the ship owner has been created with the correct memebers
            assert.ok(testOwner, "should be created");
            assert.deepEqual(testOwner.getShipStartPosition(), point, "should have the correct start position");
            assert.ok(testOwner.hasLicense(), "should have a license");
            assert.deepEqual(testOwner.getShips(), [], "should not have ships");
        });
        QUnit.test("ShipOwner: financial transaction", function (assert) {
            var balance = owner.getBalance();
            owner.financialTransaction(100);
            //Check that the owners balance has changed
            assert.deepEqual(owner.getBalance(), balance + 100, "balance should change");
        });
        QUnit.test("ShipOwner: buy ship", function (assert) {
            var balance = owner.getBalance();
            var ships = owner.getShips().slice();
            var ship = owner.buyShip();
            ships.push(ship);
            //Check that a ship has been added
            assert.deepEqual(owner.getShips(), ships, "one more ship should be added");
            assert.deepEqual(owner.getBalance(), balance - owner.getShipPrice(), "owner should be charged");
        });
        QUnit.test("ShipOwner: sell ship", function (assert) {
            var ships = owner.getShips().slice();
            var ship = owner.buyShip();
            var balance = owner.getBalance();
            owner.sellShip(ship);
            //check that ship has been removed
            assert.deepEqual(owner.getShips().indexOf(ship), -1, "ship should be removed");
            assert.deepEqual(owner.getBalance(), balance + owner.getShipPrice(), "owner should be paid");
        });
        QUnit.test("ShipOwner: sell ship exception", function (assert) {
            var ship = new Ship(new ShipOwner(new Point2(1, 1), "1"));
            assert.throws(function () {
                owner.sellShip(ship);
            }, Error, "should throw an error");
        });
    }
    return TestShipOwner;
}());
//# sourceMappingURL=TestShipOwner.js.map