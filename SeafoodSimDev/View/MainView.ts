// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
/// <reference path="StartScreen.ts"/>

class MainView {
    private m_mapView: MapView;
    private m_mapMenu: MapMenu;
    private m_noGraphicSimulation = true;
    private m_noDateUpdate = false;
    private m_noScoreUpdate = true;

    constructor(p_map: Map, p_ShipOwners: ShipOwner[], p_taxingRate: number) {
        $("#mainDiv canvas").remove();
        this.m_mapView = new MapView(p_map);
        this.m_mapMenu = new MapMenu(p_ShipOwners, p_map.getLandingSites(), p_taxingRate);
        //new StartScreen();
        
    }
    public reset(p_model: Model): void {
        this.m_mapView.reset(p_model.getMap());
        this.m_mapMenu.reset(p_model.getShipOwners(), p_model.getMap().getLandingSites(), p_model.getGovernment().getStartingTaxingRate());
        //this.updateMainView(p_mo
    }
    public getMapMenu(): MapMenu {
        return this.m_mapMenu;
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

}