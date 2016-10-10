/// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
/// <reference path = "../../TSSeafoodSimDevXTest/ts/declarations/qunit.d.ts"/>
/// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
var TestSchool = (function () {
    function TestSchool() {
        var startPosition = new Point2(0, 0);
        var singleCod = new Cod(1, startPosition);
        var singleMackerel = new Mackerel(1, startPosition);
        var map = new Map(5, 5, new Restrictions());
        map.getGrid()[0][0] = new Ocean(100, 1);
        QUnit.test("Cod: constructor", function (assert) {
            var testCod;
            //Check that testCod is undefined
            assert.equal(testCod, undefined);
            //Create cod and check members
            testCod = new Cod(1, startPosition);
            assert.ok(testCod);
            assert.deepEqual(testCod.getSize(), 1);
            assert.deepEqual(testCod.getPosition(), startPosition);
        });
        QUnit.test("Cod: age function", function (assert) {
            var age = singleCod.getFish()[0].getAge();
            if (age < singleCod.getMaxAge()) {
                singleCod.live(map);
                var newAge = singleCod.getFish()[0].getAge();
                assert.equal(newAge, age + 1);
            }
        });
        QUnit.test("Cod: natural death", function (assert) {
            var testingFish = singleCod.getFish()[0];
            var age = testingFish.getAge();
            //Make cod grow old
            for (var i = age; i < singleCod.getMaxAge(); i++) {
                singleCod.live(map);
            }
            //Check that fish is old
            assert.deepEqual(testingFish.getAge(), singleCod.getMaxAge());
            singleCod.live(map);
            //Check that fish is removed from school
            assert.deepEqual(singleCod.getFish().indexOf(testingFish), -1);
        });
        QUnit.test("Mackerel: constructor", function (assert) {
            var testMackerel;
            //Check that testMackerel is undefined
            assert.equal(testMackerel, undefined);
            //Create mackerel and check members
            testMackerel = new Mackerel(1, startPosition);
            assert.ok(testMackerel);
            assert.deepEqual(testMackerel.getSize(), 1);
            assert.deepEqual(testMackerel.getPosition(), startPosition);
        });
        QUnit.test("Mackerel: age function", function (assert) {
            var age = singleMackerel.getFish()[0].getAge();
            if (age < singleMackerel.getMaxAge()) {
                singleMackerel.live(map);
                var newAge = singleMackerel.getFish()[0].getAge();
                assert.equal(newAge, age + 1);
            }
        });
        QUnit.test("Mackerel: natural death", function (assert) {
            var testingFish = singleMackerel.getFish()[0];
            var age = testingFish.getAge();
            //Make cod grow old
            for (var i = age; i < singleMackerel.getMaxAge(); i++) {
                singleMackerel.live(map);
            }
            //Check that fish is old
            assert.deepEqual(testingFish.getAge(), singleMackerel.getMaxAge());
            singleMackerel.live(map);
            //Check that fish is removed from school
            assert.deepEqual(singleMackerel.getFish().indexOf(testingFish), -1);
        });
    }
    return TestSchool;
}());
//# sourceMappingURL=TestSchool.js.map