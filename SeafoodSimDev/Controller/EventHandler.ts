class EventHandler {
    private m_controller: Controller;
    public constructor(p_controller: Controller) {
        this.m_controller = p_controller;

        $("#startButton").on("click", this.start);
        $("#pauseButton").on("click", this.pause);
        $("#fastForwardButton").on("click", this.fastForward);
        $("#restart").on("click", this.restart);
        $("#startSim").on("click", this.startSim);
        this.bindFunctions();
    }

    public bindFunctions(p_all?: boolean): void {
        var handler: EventHandler = this;
        $(window).resize(this.m_controller.resizeWindow);

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
        $("#noCodShipsSlider").off("slide");
        $("#noCodShipsSlider").on("slide", function (event, ui) { handler.updateNoCodShipsValue(ui.value); });
        //$("#noCodShipsSlider").on("slidechange", function (event, ui) { handler.setNoCodShips(ui.value); });

        $("#noMackerelShipsSlider").off("slide");
        $("#noMackerelShipsSlider").on("slide", function (event, ui) { handler.updateNoMackerelShipsValue(ui.value); });
        //$("#noMackerelShipsSlider").on("slidechange", function (event, ui) { handler.setNoMackerelShips(ui.value); });

        $("#tacCodSlider").off("slide");
        $("#tacCodSlider").on("slide", function (event, ui) { handler.updateTacCodValue(ui.value); });
       // $("#tacCodSlider").on("slidechange", function (event, ui) { handler.setTacCod(ui.value); });

        $("#tacMackerelSlider").off("slide");
        $("#tacMackerelSlider").on("slide", function (event, ui) { handler.updateTacMackerelValue(ui.value); });
        //$("#tacMackerelSlider").on("slidechange", function (event, ui) { handler.setTacMackerel(ui.value); });
        if (p_all) {
            $("#startButton").on("click", this.start);
            $("#pauseButton").on("click", this.pause);
            $("#fastForwardButton").on("click", this.fastForward);
        }
        $("#restrictAreas").removeAttr("disabled");
        $("#restrictAreas").change(function (event) { handler.restrictSpawningAreas(this.checked) });
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
        $("#noCodShipsSlider").off("slide");
        $("#noCodShipsSlider").on("slide", function (event, ui) { return false; });
        $("#noMackerelShipsSlider").off("slide");
        $("#noMackerelShipsSlider").on("slide", function (event, ui) { return false; });
        $("#tacCodSlider").off("slide");
        $("#tacCodSlider").on("slide", function (event, ui) { return false; });
        $("#tacMackerelSlider").off("slide");
        $("#tacMackerelSlider").on("slide", function (event, ui) { return false; });
        if (p_all) {
            $("#startButton").off("click");
            $("#pauseButton").off("click");
            $("#fastForwardButton").off("click");
        }
        $("#restrictAreas").attr("disabled", "disabled");
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

    public startSim = (): void => {
        $("#startSim").css("display", "none");
        $(".fa").css("display", "initial");
        this.unBindFunctions();
        this.setNoCodShips($('#noCodShipsSlider').slider("option", "value"));
        this.setNoMackerelShips($('#noMackerelShipsSlider').slider("option", "value"));
        this.setTacCod($('#tacCodSlider').slider("option", "value"));
        this.setTacMackerel($('#tacMackerelSlider').slider("option", "value"));
        this.m_controller.getModel().startNewInterval();
        this.start();
    }
    public restrictSpawningAreas = (checked: boolean): void => {
        if (checked) {
            for (let s of this.m_controller.getModel().getMap().getSchools()) {
                this.m_controller.getModel().getGovernment().getRestrictions().restrictArea(this.m_controller.getModel().getMap().getTile(s.getOrigin()));
            }
        }
        else {
            for (let s of this.m_controller.getModel().getMap().getSchools()) {
                this.m_controller.getModel().getGovernment().getRestrictions().unRestrictArea(this.m_controller.getModel().getMap().getTile(s.getOrigin()));
            }
        }
            this.m_controller.getMainView().updateMap(this.m_controller.getModel().getMap());
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
    public setNoCodShips = (p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setNoCodShips(p_n);
        this.updateNoCodShipsValue(p_n);
    } 
    public updateNoCodShipsValue(p_n: number): void {
        $("#noCodShips").text(p_n);
    } 
    public setNoMackerelShips = (p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setNoMackerelShips(p_n);
        this.updateNoMackerelShipsValue(p_n);
    }
    public updateNoMackerelShipsValue(p_n: number): void {
        $("#noMackerelShips").text(p_n);
    } 
    public setTacCod = (p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setTacCod(p_n);
        this.updateTacCodValue(p_n);
    }
    public updateTacCodValue(p_n: number): void {
        $("#tacCod").text(p_n);
    } 
    public setTacMackerel = (p_n: number): void => {
        this.m_controller.getModel().getGovernment().getRestrictions().setTacMackerel(p_n);
        this.updateTacMackerelValue(p_n);
    }
    public updateTacMackerelValue(p_n: number): void {
        $("#tacMackerel").text(p_n);
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
        //this.bindFunctions();
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