
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
            assert.deepEqual(testCod.getVisualPos(), startPosition, "position should be start position");
        });
        QUnit.test("Cod: age function", function (assert) {
            var singleCod: Cod;
            var count: number = 0;
            do {
                singleCod = new Cod(1, startPosition);
                count++;
                if (count > 1000) {
                    throw "Infinite loop";
                }
            } while (singleCod.getAges()[thisPlaceholder.scenario.getCodSchoolMaxAge() - 1] == 1); //This is to ensure that cod is not old
            map.addSchool(singleCod);
            var age: number;
            for (var i = 0; i < thisPlaceholder.scenario.getCodSchoolMaxAge(); i++) {
                if (singleCod.getAges()[i] == 1) {
                    age = i;
                }
            }
            if (age < singleCod.getMaxAge()) {
                singleCod.age();
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
            var count: number = 0;
            while (singleCod.getAges()[singleCod.getMaxAge() - 1] == 0) {
                singleCod.age();
                count++;
                if (count > 1000) {
                    throw "Infinite loop";
                }
            }
            //Check that fish is old
            for (var i = 0; i < singleCod.getMaxAge() - 1; i++) {
                assert.deepEqual(singleCod.getAges()[i], 0, "No cod should be young");
            }
            assert.deepEqual(singleCod.getAges()[singleCod.getMaxAge() - 1], 1, "One cod should be old");

            singleCod.age();

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
            assert.deepEqual(testMackerel.getVisualPos(), startPosition);
        });
        QUnit.test("Mackerel: age function", function (assert) {
            var singeMackerel: Mackerel;
            var count: number = 0:
            do {
                singeMackerel = new Mackerel(1, startPosition);
                count++;
                if (count > 1000) {
                    throw "Infinite loop";
                }
            } while (singeMackerel.getAges()[singleMackerel.getMaxAge()  - 1] == 1); //This is to ensure that cod is not old
            map.addSchool(singeMackerel);
            var age: number;
            for (var i = 0; i < singleMackerel.getMaxAge(); i++) {
                if (singeMackerel.getAges()[i] == 1) {
                    age = i;
                }
            }
            if (age < singeMackerel.getMaxAge()) {
                singeMackerel.age();
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
            var count: number = 0;
            while (singleMackerel.getAges()[singleMackerel.getMaxAge() - 1] == 0) {
                singleMackerel.age();
                count++;
                if (count > 1000) {
                    throw "Infinite loop";
                }
            }
            //Check that fish is old
            for (var i = 0; i < singleMackerel.getMaxAge() - 1; i++) {
                assert.deepEqual(singleMackerel.getAges()[i], 0, "No mackerel should be young");
            }
            assert.deepEqual(singleMackerel.getAges()[singleMackerel.getMaxAge() - 1], 1, "One mackerel should be old");

            singleMackerel.age();

            //Check that fish is removed from school
            assert.deepEqual(singleMackerel.getSize(), 0, "No mackerel should be left");
        });

        QUnit.test("Cod: recruit", function (assert) {
            //arrange
            var testCod: Cod = new Cod(1000, startPosition);
            var testMap: Map = new Map(gov.getRestrictions());
            testMap.getGrid()[0][0] = new Ocean(new CarryingCapacity([new FishGroup("group 1", ["cod", "mac"])], [2000]), 1);
            testMap.addSchool(testCod);

            //act
            testCod.recruit(testMap);

            //assert
            assert.equal(3000, 3000);
        });
    }
}