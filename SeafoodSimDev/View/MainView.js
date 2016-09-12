// <reference path = "../../TSSeafoodSimDev/externals/model.d.ts"/>
/// <reference path="StartScreen.ts"/>
var MainView = (function () {
    function MainView(p_map, p_ShipOwners, p_taxingRate) {
        this.m_mapView = new MapView(p_map);
        this.m_mapMenu = new MapMenu(p_ShipOwners, p_map.getLandingSites(), p_taxingRate);
        new StartScreen();
    }
    MainView.prototype.reset = function (p_model) {
        this.m_mapView.reset(p_model.getMap());
        this.m_mapMenu.reset(p_model.getShipOwners(), p_model.getMap().getLandingSites(), p_model.getGovernment().getStartingTaxingRate());
    };
    MainView.prototype.getMapMenu = function () {
        return this.m_mapMenu;
    };
    MainView.prototype.updateMainView = function (p_model) {
        //console.log("updating mainView");
        this.m_mapMenu.updateScore(p_model.getGovernment());
        this.m_mapMenu.updateDate(p_model);
        this.m_mapView.updateMapView(p_model.getMap());
    };
    return MainView;
}());
//# sourceMappingURL=MainView.js.map