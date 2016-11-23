class TestShipOwner {
    private scenario: Scenario;
    public constructor() {
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var gov = new Government(new Restrictions());
        var owner: ShipOwner = new ShipOwner(gov, new Point2(0, 0), "0");
        var thisPlaceholder: TestShipOwner = this;

        QUnit.test("ShipOwner: constructor", function (assert) {
            var testOwner: ShipOwner;
            var point: Point2 = new Point2(0, 0);
            assert.equal(testOwner, undefined, "Ship owner should not have been created");
            testOwner = new ShipOwner(gov, point, "1");
            //Check that the ship owner has been created with the correct memebers
            assert.ok(testOwner, "should be created");
            assert.deepEqual(testOwner.getShipStartPosition(), point, "should have the correct start position");
            assert.ok(testOwner.hasLicense(), "should have a license");
            assert.deepEqual(testOwner.getCodShips(), [], "should not have ships");
            assert.deepEqual(testOwner.getMackerelShips(), [], "should not have ships");
        });

        QUnit.test("ShipOwner: financial transaction", function (assert) {
            var balance: number = owner.getBalance();
            owner.financialTransaction(100);
            //Check that the owners balance has changed
            assert.deepEqual(owner.getBalance(), balance + 100 - 100 * thisPlaceholder.scenario.getTaxingRate(), "balance should change");
        });

        QUnit.test("ShipOwner: buy ship", function (assert) {
            var balance: number = owner.getBalance();
            var ships: Ship[] = owner.getCodShips().slice();
            var ship: Ship = owner.buyShip(FishType.cod);
            ships.push(ship);
            //Check that a ship has been added
            assert.deepEqual(owner.getCodShips(), ships, "one more ship should be added");
            assert.deepEqual(owner.getBalance(), balance - owner.getShipPrice(), "owner should be charged");
        });

        QUnit.test("ShipOwner: sell ship", function (assert) {
            var ships: Ship[] = owner.getCodShips().slice();
            var ship: Ship = owner.buyShip(FishType.cod);
            var balance: number = owner.getBalance();
            owner.sellShip(ship);
            //check that ship has been removed
            assert.deepEqual(owner.getCodShips().indexOf(ship), -1, "ship should be removed");
            assert.deepEqual(owner.getBalance(), balance + owner.getShipPrice() - owner.getShipPrice() * thisPlaceholder.scenario.getTaxingRate(), "owner should be paid");
            
        });

        QUnit.test("ShipOwner: sell ship exception", function (assert) {
            var ship: Ship = new Ship(new ShipOwner(gov, new Point2(1, 1), "1"), FishType.cod);
            assert.throws(function () {
                owner.sellShip(ship);
            }, Error, "should throw an error");

        });
    }
}