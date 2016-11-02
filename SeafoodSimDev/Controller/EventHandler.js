var EventHandler = (function () {
    function EventHandler(p_controller) {
        var _this = this;
        this.restart = function () {
            var t = _this.m_controller.getModel().getTime();
            var t2 = Scenario.getInstance().getDefaultNoDays();
            if (_this.m_controller.getModel().getTime() < Scenario.getInstance().getDefaultNoDays()) {
                if (confirm("Are you sure you want to restart the simulation?")) {
                    _this.m_controller.restart();
                }
            }
            else {
                _this.m_controller.restart();
            }
        };
        this.startSim = function () {
            $("#startSim").css("display", "none");
            $(".fa").css("display", "initial");
            _this.unBindFunctions();
            _this.setNoCodShips($('#noCodShipsSlider').slider("option", "value"));
            _this.setNoMackerelShips($('#noMackerelShipsSlider').slider("option", "value"));
            _this.setTacCod($('#tacCodSlider').slider("option", "value"));
            _this.setTacMackerel($('#tacMackerelSlider').slider("option", "value"));
            _this.m_controller.getModel().updateNoShips();
            _this.start();
        };
        this.setTax = function (p_n) {
            _this.updateTaxValue(p_n);
            _this.m_controller.getModel().getGovernment().setTaxingRate(p_n / 100);
        };
        this.updateTaxValue = function (p_n) {
            $("#taxValue").text(p_n + "%");
        };
        this.setQuote = function (owner, p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setQuote(owner, p_n);
            _this.updateQuoteValue(owner, p_n);
        };
        this.updateQuoteValue = function (owner, p_n) {
            $("#quoteValue" + owner).text(p_n);
        };
        this.setEffortLimit = function (owner, p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setEffortLimit(owner, p_n);
            _this.updateEffortLimitValue(owner, p_n);
        };
        this.updateEffortLimitValue = function (owner, p_n) {
            $("#effortValue" + owner).text(p_n);
        };
        this.setLandingDistrubution = function (p_site, p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setLandingDistrubution(p_site, p_n);
            _this.updateLandingValue(p_site, p_n);
        };
        this.updateLandingValue = function (site, p_n) {
            $("#landingValue" + site).text(p_n);
        };
        this.setNoCodShips = function (p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setNoCodShips(p_n);
            _this.updateNoCodShipsValue(p_n);
        };
        this.setNoMackerelShips = function (p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setNoMackerelShips(p_n);
            _this.updateNoMackerelShipsValue(p_n);
        };
        this.setTacCod = function (p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setTacCod(p_n);
            _this.updateTacCodValue(p_n);
        };
        this.setTacMackerel = function (p_n) {
            _this.m_controller.getModel().getGovernment().getRestrictions().setTacMackerel(p_n);
            _this.updateTacMackerelValue(p_n);
        };
        this.start = function () {
            $("#fastForwardButton").removeClass("marked");
            $("#pauseButton").removeClass("marked");
            $("#startButton").addClass("marked");
            _this.unBindFunctions();
            _this.m_controller.runSimulation();
        };
        this.pause = function () {
            $("#startButton").removeClass("marked");
            $("#fastForwardButton").removeClass("marked");
            $("#pauseButton").addClass("marked");
            //this.bindFunctions();
            _this.m_controller.pause();
        };
        this.fastForward = function () {
            $("#pauseButton").removeClass("marked");
            $("#startButton").removeClass("marked");
            $("#fastForwardButton").addClass("marked");
            _this.unBindFunctions();
            _this.m_controller.fastForward();
        };
        this.restrictArea = function (p_tile) {
            if (_this.m_controller.getModel().getGovernment().getRestrictions().isRestricted(p_tile)) {
                _this.m_controller.getModel().getGovernment().getRestrictions().unRestrictArea(p_tile);
            }
            else {
                _this.m_controller.getModel().getGovernment().getRestrictions().restrictArea(p_tile);
            }
        };
        this.m_controller = p_controller;
        $("#startButton").on("click", this.start);
        $("#pauseButton").on("click", this.pause);
        $("#fastForwardButton").on("click", this.fastForward);
        $("#restart").on("click", this.restart);
        $("#startSim").on("click", this.startSim);
        this.bindFunctions();
    }
    EventHandler.prototype.bindFunctions = function (p_all) {
        var handler = this;
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
    };
    EventHandler.prototype.unBindFunctions = function (p_all) {
        var handler = this;
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
            $("#landingSlider" + ls.getID()).on("slide", function (event, ui) { return false; });
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
    };
    EventHandler.prototype.updateNoCodShipsValue = function (p_n) {
        $("#noCodShips").text(p_n);
    };
    EventHandler.prototype.updateNoMackerelShipsValue = function (p_n) {
        $("#noMackerelShips").text(p_n);
    };
    EventHandler.prototype.updateTacCodValue = function (p_n) {
        $("#tacCod").text(p_n);
    };
    EventHandler.prototype.updateTacMackerelValue = function (p_n) {
        $("#tacMackerel").text(p_n);
    };
    return EventHandler;
}());
//# sourceMappingURL=EventHandler.js.map