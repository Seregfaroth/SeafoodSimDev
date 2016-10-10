var Test = (function () {
    function Test() {
        this.m_scenario = new Scenario();
        new TestAI(this.m_scenario);
        new TestSchool();
        new TestShip();
        new TestShipOwner();
        new TestFuelSite();
        new TestLandingSite();
        new TestMap();
    }
    return Test;
}());
//# sourceMappingURL=Test.js.map