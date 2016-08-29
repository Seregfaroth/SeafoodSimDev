class EventHandler {
    private m_controller: Controller;
    public constructor(p_controller: Controller) {
        this.m_controller = p_controller;
        $("#startButton").on("click", this.start);
        $("#pauseButton").on("click", this.pause);
        $("#fastForwardButton").on("click", this.fastForward);
        this.bindFunctions();
    }

    public bindFunctions(): void {
        var handler: EventHandler = this;
        $("#taxSlider").off("slide");
        $("#taxSlider").on("slide", function (event, ui) { handler.updateTaxValue(ui.value); });
        $("#taxSlider").on("slidechange", function (event, ui) { handler.setTax(ui.value); });

        this.m_controller.getModel().getShipOwners().forEach(function (so) {
            $("#quoteSlider" + so.getID()).off("slide");
            $("#quoteSlider" + so.getID()).on("slide", function (event, ui) {
                handler.updateQuoteValue(so.getID(), ui.value);
            });
            $("#quoteSlider" + so.getID()).on("slidechange", function (event, ui) {
                handler.setQuote(so.getID(), ui.value);
            });
            $("#effortSlider" + so.getID()).off("slide");
            $("#effortSlider" + so.getID()).on("slide", function (event, ui) {
                handler.updateEffortLimitValue(so.getID(), ui.value);
            });
            $("#effortSlider" + so.getID()).on("slidechange", function (event, ui) {
                handler.setEffortLimit(so.getID(), ui.value);
            });
        });
        this.m_controller.getModel().getMap().getLandingSites().forEach(function (ls) {
            $("#landingSlider" + ls.getID()).off("slide");
            $("#landingSlider" + ls.getID()).on("slide", function (event, ui) {
                handler.updateLandingValue(ls.getID(), ui.value);
            });
            $("#landingSlider" + ls.getID()).on("slidechange", function (event, ui) {
                handler.setLandingDistrubution(ls.getID(), ui.value);
            });
        });
        $("#noOfShipsSlider").off("slide");
        $("#noOfShipsSlider").on("slide", function (event, ui) { handler.updateMaxNoShipsValue(ui.value); });
        $("#noOfShipsSlider").on("slidechange", function (event, ui) { handler.setMaxNoShips(ui.value); });
        
    }

    public unBindFunctions(): void {
        var handler: EventHandler = this;
        $("#taxSlider").off("slide");
        $("#taxSlider").on("slide", function (event, ui) { return false; });

        this.m_controller.getModel().getShipOwners().forEach(function (so) {
            $("#quoteSlider" + so.getID()).off("slide");
            $("#quoteSlider" + so.getID()).on("slide", function (event, ui) { return false; });
            $("#effortSlider" + so.getID()).off("slide");
            $("#effortSlider" + so.getID()).on("slide", function (event, ui) { return false; });
        });
        this.m_controller.getModel().getMap().getLandingSites().forEach(function (ls) {
            $("#landingSlider" + ls.getID()).off("slide");
            $("#landingSlider" + ls.getID()).on("slide", function(event, ui) {return false; });
        });
        $("#noOfShipsSlider").off("slide");
        $("#noOfShipsSlider").on("slide", function (event, ui) { return false; });
    }

    public setTax = (p_n: number): void => {
        this.updateTaxValue(p_n);
        this.m_controller.getModel().getGovernment().setTaxingRate(p_n / 100);
    }
    public updateTaxValue = (p_n: number): void => {
        $("#taxValue").text($("#taxSlider").slider("option", "value")+ "%");
    }
    public setQuote = (owner: string, p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setQuote(owner, p_n);
        this.updateQuoteValue(owner, p_n);
    }
    public updateQuoteValue = (owner: string, p_n: number): void => {
        $("#quoteValue" + owner).text($("#quoteSlider" + owner).slider("option", "value"));
    }

    public setEffortLimit = (owner: string, p_n: number): void =>{
        this.m_controller.getModel().getGovernment().getRestrictions().setEffortLimit(owner, p_n);
        this.updateEffortLimitValue(owner, p_n);
    }
    public updateEffortLimitValue = (owner: string, p_n: number): void => {
        $("#effortValue" + owner).text($("#effortSlider" + owner).slider("option", "value"));
    }
    public setLandingDistrubution = (p_site: string, p_n: number): void =>{
        this.m_controller.getModel().getGovernment().getRestrictions().setLandingDistrubution(p_site, p_n);
        this.updateLandingValue(p_site, p_n);
    }
    public updateLandingValue = (site: string, p_n: number): void => {
        $("#landingValue" + site).text($("#landingSlider" + site).slider("option", "value"));
    }
    public setMaxNoShips = (p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setMaxShips(p_n);
        this.updateMaxNoShipsValue(p_n);
    } 
    public updateMaxNoShipsValue(p_n: number): void {
        $("#maxNoShips").text($("#noOfShipsSlider").slider("option", "value"));
    } 
    public start = (): void => {
        $("#fastForwardButton").removeClass("marked");
        $("#pauseButton").removeClass("marked");
        $("#startButton").addClass("marked");
        this.unBindFunctions();
        this.m_controller.runSimulation();
    }

    public pause = (): void => {
        $("#startButton").removeClass("marked");
        $("#fastForwardButton").removeClass("marked");
        $("#pauseButton").addClass("marked");
        this.bindFunctions();
        this.m_controller.pause();
        
    }

    public fastForward = (): void => {
        $("#pauseButton").removeClass("marked");
        $("#startButton").removeClass("marked");
        $("#fastForwardButton").addClass("marked");
        this.unBindFunctions();
        this.m_controller.fastForward();
    }
    public restrictArea=(p_tile: Tile)=> {
        if (this.m_controller.getModel().getGovernment().getRestrictions().isRestricted(p_tile)) {
            this.m_controller.getModel().getGovernment().getRestrictions().unRestrictArea(p_tile);
        }
        else {
            this.m_controller.getModel().getGovernment().getRestrictions().restrictArea(p_tile);
        }
    }
}