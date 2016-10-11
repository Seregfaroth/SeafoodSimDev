var TestLandingSite = (function () {
    function TestLandingSite() {
        var prices = {};
        prices[0] = 10;
        prices[1] = 8;
        var landingSite = new LandingSite(1, 50, 1, prices, "0", new Point2(0, 0));
        QUnit.test("LandingSite: Constructor", function (assert) {
            var testingSite;
            assert.equal(testingSite, undefined, "site should be undefined");
            testingSite = new LandingSite(1, 1, 1, prices, "0", new Point2(0, 0));
            //Check that the landing site has been created with the correct members
            assert.ok(testingSite, "fuel site should not be undefined");
            assert.deepEqual(testingSite.getPrices(), prices, "price should be correct");
            assert.deepEqual(testingSite.getProcessPerDay(), 1, "process per day should be 1");
            assert.deepEqual(testingSite.getResourceAtSite(), 0, "resource at site should be 0");
            assert.deepEqual(testingSite.getResourceCapacity(), 1, "resource capacity should be 1");
            assert.deepEqual(testingSite.getShipCapacity(), 1, "ship capacity should be 1");
        });
        QUnit.test("LandingSite: process fish", function (assert) {
            var fish = [[20], [5]];
            var noOfFish = 0;
            for (var i = 0; i < fish[FishType.Cod].length; i++) {
                noOfFish += fish[FishType.Cod][i];
            }
            for (var i = 0; i < fish[FishType.Mackerel].length; i++) {
                noOfFish += fish[FishType.Mackerel][i];
            }
            //First receive fish
            landingSite.receiveFish(fish);
            assert.deepEqual(landingSite.getResourceAtSite(), noOfFish, "resource at site should be equal to number of fish");
            landingSite.processFish();
            //Check that some of the fish has been processed
            assert.deepEqual(landingSite.getResourceAtSite(), Math.max(noOfFish - landingSite.getProcessPerDay(), 0), "some of the fish should be processed");
            //Process until empty
            while (landingSite.getResourceAtSite() > 0) {
                landingSite.processFish();
            }
            assert.deepEqual(landingSite.getResourceAtSite(), 0, "resource at site shoud be 0");
            landingSite.processFish();
            //Check that resource at site is still 0
            assert.deepEqual(landingSite.getResourceAtSite(), 0, "resource at site shoud be 0");
        });
        QUnit.test("LandingSite: receive fish", function (assert) {
            var fish = [[10], [2]];
            var noOfFish = 0;
            for (var i = 0; i < fish[FishType.Cod].length; i++) {
                noOfFish += fish[FishType.Cod][i];
            }
            for (var i = 0; i < fish[FishType.Mackerel].length; i++) {
                noOfFish += fish[FishType.Mackerel][i];
            }
            //First process all fish
            while (landingSite.getResourceAtSite() > 0) {
                landingSite.processFish();
            }
            var price = landingSite.receiveFish(fish);
            //Check that all fish have been landed
            assert.deepEqual(fish, [[0], [0]], "there should not be any fish left");
            assert.deepEqual(landingSite.getResourceAtSite(), noOfFish, "all fish should be at landing site");
            //TODO check price when implemenet correctly with age
            var fish = [[30], [40]];
            var noOfFish = 0;
            for (var i = 0; i < fish[FishType.Cod].length; i++) {
                noOfFish += fish[FishType.Cod][i];
            }
            for (var i = 0; i < fish[FishType.Mackerel].length; i++) {
                noOfFish += fish[FishType.Mackerel][i];
            }
            var resourceAtSite = landingSite.getResourceAtSite();
            price = landingSite.receiveFish(fish);
            var noOfFishLeft = 0;
            for (var i = 0; i < fish[FishType.Cod].length; i++) {
                noOfFishLeft += fish[FishType.Cod][i];
            }
            for (var i = 0; i < fish[FishType.Mackerel].length; i++) {
                noOfFishLeft += fish[FishType.Mackerel][i];
            }
            //Check that the correct amount of fish have been landed
            assert.deepEqual(noOfFishLeft, noOfFish - (landingSite.getResourceCapacity() - resourceAtSite), "there should be some fish left");
            assert.deepEqual(landingSite.getResourceAtSite(), landingSite.getResourceCapacity(), "landing site should be full");
        });
    }
    return TestLandingSite;
}());
//# sourceMappingURL=TestLandingSite.js.map