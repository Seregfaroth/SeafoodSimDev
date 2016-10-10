class TestFuelSite {
    constructor() {
        var fuelSite: FuelSite = new FuelSite(1, 100, 10, 1, "0");

        QUnit.test("FuelSite: constructor", function (assert) {
            var testFuelSite: FuelSite;
            assert.equal(testFuelSite, undefined, "fuel site should be undefined");
            testFuelSite = new FuelSite(1, 1, 1, 1,  "0");
            //Test that the site has been created with the correct members
            assert.ok(testFuelSite, "fuel site should not be undefined");
            assert.deepEqual(testFuelSite.getPrice(), 1, "price should be 1");
            assert.deepEqual(testFuelSite.getProcessPerDay(), 1, "process per day should be 1");
            assert.deepEqual(testFuelSite.getResourceAtSite(), 1, "resource at site should be 1");
            assert.deepEqual(testFuelSite.getResourceCapacity(), 1, "resource capacity should be 1");
            assert.deepEqual(testFuelSite.getShipCapacity(), 1, "ship capacity should be 1");
        });
        QUnit.test("FuelSite: restock", function (assert) {
            //First provide all fuel
            fuelSite.provideFuel(fuelSite.getResourceAtSite());
            //Check that no fuel is at site
            assert.deepEqual(fuelSite.getResourceAtSite(), 0, "resource at site should be 0");

            fuelSite.restock();
            //Check that the site has been restocked with the correct amount
            assert.deepEqual(fuelSite.getResourceAtSite(), fuelSite.getProcessPerDay(), "should be restocked");

            //Restock until full
            while (fuelSite.getResourceAtSite() < fuelSite.getResourceCapacity()) {
                fuelSite.restock();
            }
            var fuelAtsite: number = fuelSite.getResourceAtSite();
            fuelSite.restock()
            //Check that resource at site is unchanged
            assert.deepEqual(fuelSite.getResourceAtSite(), fuelAtsite, "resource at site should be unchanged");

        });

        QUnit.test("FuelSite: provide fuel", function (assert) {
            //First restock
            while (fuelSite.getResourceAtSite() < fuelSite.getResourceCapacity()) {
                fuelSite.restock();
            }
            var amountProvided: number = fuelSite.provideFuel(50);
            //Check that the correct amount was provided
            assert.deepEqual(amountProvided, 50, "50 should be provided");
            assert.deepEqual(fuelSite.getResourceAtSite(), fuelSite.getResourceCapacity()-50, "resource at site should be reduced by 50");
            
            amountProvided = fuelSite.provideFuel(80);
            //Check that the correct amount was provided
            assert.deepEqual(amountProvided, 50, "50 should be provided");
            assert.deepEqual(fuelSite.getResourceAtSite(), 0, "resource at site should be 0");
        });
        
    }
}