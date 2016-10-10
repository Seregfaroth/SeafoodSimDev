
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDevXTest/ts/declarations/qunit.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>

class TestSchool {
    private scenario: Scenario;
    constructor(p_scenario) {
        this.scenario = p_scenario;
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var startPosition: Point2 = new Point2(0, 0);
        var singleCod: Cod = new Cod(1, 1, startPosition, this.scenario);
        var singleMackerel: Mackerel = new Mackerel(1, 1, startPosition, this.scenario);
        var gov: Government = new Government(new Restrictions(this.scenario), this.scenario);
        var map: Map = new Map(gov.getRestrictions(), this.scenario);
        var thisPlaceholder: TestSchool = this;
        map.getGrid()[0][0] = new Ocean(100, 1);

        QUnit.test("Cod: constructor", function (assert) {
            var testCod: Cod;
            //Check that testCod is undefined
            assert.equal(testCod, undefined);

            //Create cod and check members
            testCod = new Cod(1, 1, startPosition, thisPlaceholder.scenario);
            assert.ok(testCod);
            assert.deepEqual(testCod.getSize(), 1);
            assert.deepEqual(testCod.getPosition(), startPosition);
        });
        QUnit.test("Cod: age function", function (assert) {
            var singleCod: Cod = new Cod(1, 1, startPosition, thisPlaceholder.scenario);
            var age: number;
            for (var i = 0; i < thisPlaceholder.scenario.getCodSchoolMaxAge(); i++) {
                if (singleCod.getAges()[i] == 1) {
                    age = i;
                }
            }
            if (age < singleCod.getMaxAge()) {
                singleCod.ageAndRecruit(map);
                var newAge: number;
                for (var i = 0; i < thisPlaceholder.scenario.getCodSchoolMaxAge(); i++) {
                    if (singleCod.getAges()[i] == 1) {
                        newAge = i;
                    }
                }
                assert.equal(newAge, age + 1, "Cod should have aged");
            }
        });

        QUnit.test("Cod: natural death", function (assert) {
            var singleCod: Cod = new Cod(1, 1, startPosition, thisPlaceholder.scenario);
            //Make cod grow old
            while(singleCod.getAges()[thisPlaceholder.scenario.getCodSchoolMaxAge()-1] == 0) {
                singleCod.ageAndRecruit(map);
            }
            //Check that fish is old
            for (var i = 0; i < thisPlaceholder.scenario.getCodSchoolMaxAge() - 1; i++) {
                assert.deepEqual(singleCod.getAges()[i], 0, "No cod should be young");
            }
            assert.deepEqual(singleCod.getAges()[thisPlaceholder.scenario.getCodSchoolMaxAge() - 1], 1, "One cod should be old");

            singleCod.ageAndRecruit(map);

            //Check that fish is removed from school
            assert.deepEqual(singleCod.getSize(), 0, "No cod should be left");
        });

        /*QUnit.test("Mackerel: constructor", function (assert) {
            var testMackerel: Mackerel;
            //Check that testMackerel is undefined
            assert.equal(testMackerel, undefined);

            //Create mackerel and check members
            testMackerel = new Mackerel(1, startPosition);
            assert.ok(testMackerel);
            assert.deepEqual(testMackerel.getSize(), 1);
            assert.deepEqual(testMackerel.getPosition(), startPosition);
        });
        QUnit.test("Mackerel: age function", function (assert) {
            var age: number = singleMackerel.getFish()[0].getAge();
            if (age < singleMackerel.getMaxAge()) {
                singleMackerel.live(map);
                var newAge: number = singleMackerel.getFish()[0].getAge();
                assert.equal(newAge, age + 1);
            }
        });

        QUnit.test("Mackerel: natural death", function (assert) {
            var testingFish: Fish = singleMackerel.getFish()[0];
            var age: number = testingFish.getAge();
            //Make cod grow old
            for (var i = age; i < singleMackerel.getMaxAge(); i++) {
                singleMackerel.live(map);
            }
            //Check that fish is old
            assert.deepEqual(testingFish.getAge(), singleMackerel.getMaxAge());

            singleMackerel.live(map);

            //Check that fish is removed from school
            assert.deepEqual(singleMackerel.getFish().indexOf(testingFish), -1);
        });*/
    }
}