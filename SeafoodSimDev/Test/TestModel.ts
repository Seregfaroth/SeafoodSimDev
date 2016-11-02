class TestModel {
    private scenario: Scenario;
    public constructor() {

        this.scenario = Scenario.getInstance();
        this.scenario.loadScenario('Controller/scenarios/scnTest.json', this.runTests);
    }
    public runTests = (): void => {
        var model: Model = new Model();
        var restrictions: Restrictions = model.getGovernment().getRestrictions();
        var map: Map = model.getMap();

        QUnit.test("Model: update number of ships", function (assert) {
            assert.deepEqual(map.getShips().length, 0, "there should not be any ships");
            restrictions.setNoShips(3);
            model.updateNoShips();
            assert.deepEqual(map.getShips().length, 3, "there should be 3 ships");
            restrictions.setNoShips(0);
            model.updateNoShips();
            assert.deepEqual(map.getShips().length, 0, "there should not be any ships");
        });
    }
}