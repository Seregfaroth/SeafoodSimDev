// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
/// <reference path="StartScreen.ts"/>

class MainView {
    private m_mapView: MapView;
    private m_mapMenu: MapMenu;
    private m_noGraphicSimulation = false;
    private m_noDateUpdate = false;
    private m_noScoreUpdate = false;
    private m_intervalStats: IntervalStats;

    constructor(p_map: Map, p_ShipOwners: ShipOwner[], p_taxingRate: number, p_scenario: Scenario) {
        $("#mainDiv canvas").remove();
        $("#menuDiv").remove();//Might not be necessary to remove mapMenu, but it needs to be updated
        this.m_mapView = new MapView(p_map);
        this.m_mapMenu = new MapMenu(p_ShipOwners, p_map.getLandingSites(), p_taxingRate, p_scenario);
        //this.m_intervalStats = new IntervalStats();
        var t = p_scenario.getNoGraphicsMapUpdate();
        if (p_scenario.getNoGraphicsMapUpdate() != null)
            this.m_noGraphicSimulation = p_scenario.getNoGraphicsMapUpdate();
        if (p_scenario.getNoMenuDateUpdate() != null)
            this.m_noDateUpdate = p_scenario.getNoMenuDateUpdate();
        if (p_scenario.getNoMenuScoreUpdate() != null)
            this.m_noScoreUpdate = p_scenario.getNoMenuScoreUpdate();
    
    
    }
    public reset(p_model: Model, p_scenario:Scenario): void {
        this.m_mapView.reset(p_model.getMap());
        this.m_mapMenu.reset(p_model.getShipOwners(), p_model.getMap().getLandingSites(), p_model.getGovernment().getStartingTaxingRate(),p_scenario);
        //this.updateMainView(p_mo
    }
    public getMapMenu(): MapMenu {
        return this.m_mapMenu;
    }
    public getIntervalStats(): IntervalStats {
        return this.m_intervalStats;
    }
    updateMainView(p_model: Model) {
        //console.log("updating mainView");
        if (!this.m_noScoreUpdate)
            this.m_mapMenu.updateScore(p_model.getGovernment());
        if (!this.m_noDateUpdate)
            this.m_mapMenu.updateDate(p_model);
        if(!this.m_noGraphicSimulation)
            this.m_mapView.updateMapView(p_model.getMap());
    }
    public changeMap(p_map: Map) {
        $("#mainDiv canvas").remove();
        this.m_mapView = new MapView(p_map);
    }
    public resizeWindow(): void {
        this.m_mapView.setMapSize();
    }
}