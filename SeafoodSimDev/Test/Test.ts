class Test {
    private m_scenario: Scenario;
    constructor() {
        this.m_scenario = new Scenario();
        new TestAI(this.m_scenario);
        new TestSchool();
        new TestShip();
        new TestShipOwner();
        new TestFuelSite();
        new TestLandingSite();
        new TestMap();
        
    }
}