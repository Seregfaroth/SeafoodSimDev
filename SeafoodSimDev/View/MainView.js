// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
/// <reference path="StartScreen.ts"/>
var MainView = (function () {
    function MainView(p_map, p_ShipOwners, p_taxingRate) {
        this.m_noGraphicSimulation = true;
        this.m_noDateUpdate = false;
        this.m_noScoreUpdate = false;
        $("#mainDiv canvas").remove();
        this.m_mapView = new MapView(p_map);
        this.m_mapMenu = new MapMenu(p_ShipOwners, p_map.getLandingSites(), p_taxingRate);
        //new StartScreen();
    }
    MainView.prototype.reset = function (p_model) {
        this.m_mapView.reset(p_model.getMap());
        this.m_mapMenu.reset(p_model.getShipOwners(), p_model.getMap().getLandingSites(), p_model.getGovernment().getStartingTaxingRate());
        //this.updateMainView(p_mo
    };
    MainView.prototype.getMapMenu = function () {
        return this.m_mapMenu;
    };
    MainView.prototype.updateMainView = function (p_model) {
        //console.log("updating mainView");
        if (!this.m_noScoreUpdate)
            this.m_mapMenu.updateScore(p_model.getGovernment());
        if (!this.m_noDateUpdate)
            this.m_mapMenu.updateDate(p_model);
        if (!this.m_noGraphicSimulation)
            this.m_mapView.updateMapView(p_model.getMap());
    };
    MainView.prototype.changeMap = function (p_map) {
        $("#mainDiv canvas").remove();
        this.m_mapView = new MapView(p_map);
    };
    return MainView;
}());
//# sourceMappingURL=MainView.js.map