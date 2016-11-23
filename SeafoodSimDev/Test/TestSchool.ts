
// <reference path = "../../TSSeafoodSimDev/externals/wrappers.d.ts"/>
// <reference path = "../../TSSeafoodSimDevXTest/ts/declarations/qunit.d.ts"/>
// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>

class TestSchool {
    private scenario: Scenario;
    constructor() {
        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var startPosition: Point2 = new Point2(0, 0);
        var singleCod: Cod = new Cod(1, startPosition);
        var singleMackerel: Mackerel = new Mackerel(1, startPosition);
        var gov: Government = new Government(new Restrictions());
        var map: Map = new Map(gov.getRestrictions());
        var thisPlaceholder: TestSchool = this;
        map.getGrid()[0][0] = new Ocean(new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [100000]), 1);

        QUnit.test("Cod: constructor", function (assert) {
            var testCod: Cod;
            //Check that testCod is undefined
            assert.equal(testCod, undefined);

            //Create cod and check members
            testCod = new Cod(1, startPosition);
            assert.ok(testCod, "Cod should be defined");
            assert.deepEqual(testCod.getSize(), 1, "size should be 1");
            assert.deepEqual(testCod.getPosition(), startPosition, "position should be start position");
        });
        QUnit.test("Cod: age function", function (assert) {
            var singleCod: Cod;
            do {
                singleCod = new Cod(1, startPosition);
            } while (singleCod.getAges()[thisPlaceholder.scenario.getCodSchoolMaxAge() - 1] == 1); //This is to ensure that cod is not old
            map.addSchool(singleCod);
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
            var singleCod: Cod = new Cod(1, startPosition);
            var map: Map = new Map(gov.getRestrictions());
            map.getGrid()[0][0] = new Ocean(new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [1]), 1);
            map.addSchool(singleCod);
            //Make cod grow old
            while (singleCod.getAges()[singleCod.getMaxAge()-1] == 0) {
                singleCod.ageAndRecruit(map);
            }
            //Check that fish is old
            for (var i = 0; i < singleCod.getMaxAge() - 1; i++) {
                assert.deepEqual(singleCod.getAges()[i], 0, "No cod should be young");
            }
            assert.deepEqual(singleCod.getAges()[singleCod.getMaxAge() - 1], 1, "One cod should be old");

            singleCod.ageAndRecruit(map);

            //Check that fish is removed from school
            assert.deepEqual(singleCod.getSize(), 0, "No cod should be left");
        });
        QUnit.test("NatDeath", function (assert) {
            assert.equal(singleCod.getNatDeathTotal(), 0)
        });

        QUnit.test("Mackerel: constructor", function (assert) {
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
            var singeMackerel: Mackerel;
            do {
                singeMackerel = new Mackerel(1, startPosition);
            } while (singeMackerel.getAges()[singleMackerel.getMaxAge()  - 1] == 1); //This is to ensure that cod is not old
            map.addSchool(singeMackerel);
            var age: number;
            for (var i = 0; i < singleMackerel.getMaxAge(); i++) {
                if (singeMackerel.getAges()[i] == 1) {
                    age = i;
                }
            }
            if (age < singeMackerel.getMaxAge()) {
                singeMackerel.ageAndRecruit(map);
                var newAge: number;
                for (var i = 0; i < singleMackerel.getMaxAge() ; i++) {
                    if (singeMackerel.getAges()[i] == 1) {
                        newAge = i;
                    }
                }
                assert.equal(newAge, age + 1, "Mackerel should have aged");
            }
        });

        QUnit.test("Mackerel: natural death", function (assert) {
            var singleMackerel: Mackerel = new Mackerel(1, startPosition);
            var map: Map = new Map(gov.getRestrictions());
            map.getGrid()[0][0] = new Ocean(new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [1]), 1);
            map.addSchool(singleMackerel);
            //Make cod grow old
            while (singleMackerel.getAges()[singleMackerel.getMaxAge()  - 1] == 0) {
                singleMackerel.ageAndRecruit(map);
            }
            //Check that fish is old
            for (var i = 0; i < singleMackerel.getMaxAge() - 1; i++) {
                assert.deepEqual(singleMackerel.getAges()[i], 0, "No mackerel should be young");
            }
            assert.deepEqual(singleMackerel.getAges()[singleMackerel.getMaxAge() - 1], 1, "One mackerel should be old");

            singleMackerel.ageAndRecruit(map);

            //Check that fish is removed from school
            assert.deepEqual(singleMackerel.getSize(), 0, "No mackerel should be left");
        });
    }
}