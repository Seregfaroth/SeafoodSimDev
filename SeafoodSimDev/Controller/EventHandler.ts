class EventHandler {
    private m_controller: Controller;
    public constructor(p_controller: Controller) {
        this.m_controller = p_controller;

        $("#startButton").on("click", this.start);
        $("#pauseButton").on("click", this.pause);
        $("#fastForwardButton").on("click", this.fastForward);
        $("#restart").on("click", this.restart);
        this.bindFunctions();
    }

    public bindFunctions(p_all?: boolean): void {
        var handler: EventHandler = this;
        $(window).resize(this.m_controller.resizeWindow);
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
        if (p_all) {
            $("#startButton").on("click", this.start);
            $("#pauseButton").on("click", this.pause);
            $("#fastForwardButton").on("click", this.fastForward);
        }
    }

    public unBindFunctions(p_all?:boolean): void {
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
        if (p_all) {
            $("#startButton").off("click");
            $("#pauseButton").off("click");
            $("#fastForwardButton").off("click");
        }
    }
    public restart = (): void => {
        var t = this.m_controller.getModel().getTime();
        var t2 = Scenario.getInstance().getDefaultNoDays()
        if (this.m_controller.getModel().getTime() < Scenario.getInstance().getDefaultNoDays()) {
            if (confirm("Are you sure you want to restart the simulation?")) {
                this.m_controller.restart();
            }
        }
        else {
            this.m_controller.restart();
        }
    }
    public setTax = (p_n: number): void => {
        this.updateTaxValue(p_n);
        this.m_controller.getModel().getGovernment().setTaxingRate(p_n / 100);
    }
    public updateTaxValue = (p_n: number): void => {
        $("#taxValue").text(p_n + "%");
    }
    public setQuote = (owner: string, p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setQuote(owner, p_n);
        this.updateQuoteValue(owner, p_n);
    }
    public updateQuoteValue = (owner: string, p_n: number): void => {
        $("#quoteValue" + owner).text(p_n);
    }

    public setEffortLimit = (owner: string, p_n: number): void =>{
        this.m_controller.getModel().getGovernment().getRestrictions().setEffortLimit(owner, p_n);
        this.updateEffortLimitValue(owner, p_n);
    }
    public updateEffortLimitValue = (owner: string, p_n: number): void => {
        $("#effortValue" + owner).text(p_n);
    }
    public setLandingDistrubution = (p_site: string, p_n: number): void =>{
        this.m_controller.getModel().getGovernment().getRestrictions().setLandingDistrubution(p_site, p_n);
        this.updateLandingValue(p_site, p_n);
    }
    public updateLandingValue = (site: string, p_n: number): void => {
        $("#landingValue" + site).text(p_n);
    }
    public setMaxNoShips = (p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setMaxShips(p_n);
        this.updateMaxNoShipsValue(p_n);
    } 
    public updateMaxNoShipsValue(p_n: number): void {
        $("#maxNoShips").text(p_n);
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