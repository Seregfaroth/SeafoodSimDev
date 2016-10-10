class Test {
    private m_scenario: Scenario;
    constructor() {
        
        this.m_scenario = new Scenario();
        new TestAI(this.m_scenario);
        new TestSchool();
        new TestShip(this.m_scenario);
        new TestShipOwner(this.m_scenario);
        new TestFuelSite();
        new TestLandingSite();
        new TestMap(this.m_scenario);
        
    }
}